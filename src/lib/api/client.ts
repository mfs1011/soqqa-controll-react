import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '../auth-tokens';

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);



// Bir vaqtning o'zida bir nechta so'rov 401 berganda qayta-qayta refresh so'rovini yubormaslik uchun
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response.data,
    async (error: AxiosError) => {
        const originalRequest: any = error.config;
        
        // Token noto'g'ri bo'lsa (403 Forbidden)
        // Backenddan kelayotgan "Token invalid" xabarini ham tekshiramiz
        const errorData: any = error.response?.data;
        
        if (
            error.response?.status === 403 || 
            (errorData?.status === "error" && errorData?.message === "Token invalid")
        ) {
            console.warn("Xavfsizlik xatosi: Token yaroqsiz.");
            clearTokens();
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }

        // Agar xato 401 bo'lsa va bu so'rov hali qayta urinilmagan bo'lsa
        if (error.response?.status === 401 && !originalRequest._retry) {

            if (isRefreshing) {
                // Agar hozirda boshqa bir so'rov refresh so'rovini yuborgan bo'lsa, 
                // qolgan so'rovlarni navbatga (queue) qo'yamiz
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = getRefreshToken();

            if (!refreshToken) {
                clearTokens();
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                // Refresh token orqali yangi tokenlarni so'raymiz
                // Muhim: bu yerda 'api' emas, standart 'axios' ishlatiladi (cheksiz siklga tushib qolmaslik uchun)
                const res = await axios.post(`${BASE_URL}/users/refresh-auth`, {
                    refreshToken: refreshToken
                });

                // API javobiga qarab (data.data yoki data)
                const { accessToken, refreshToken: newRefreshToken } = res.data.data || res.data;

                setTokens(accessToken, newRefreshToken);

                processQueue(null, accessToken);
                isRefreshing = false;

                // Eski so'rovni yangi token bilan qayta yuboramiz
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return apiClient(originalRequest);

            } catch (refreshError) {
                // Agar refresh token ham eskirgan bo'lsa (403 yoki 401)
                processQueue(refreshError, null);
                isRefreshing = false;
                clearTokens();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;