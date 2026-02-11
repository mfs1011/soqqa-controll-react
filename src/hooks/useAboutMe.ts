import apiClient from '@/lib/api/client';
import { useQuery } from '@tanstack/react-query';


export const useAboutMe = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => apiClient.get('/users/me'),
        retry: false, // Login qilmagan bo'lsa qayta-qayta urinmasin
    });
};