import { useMutation } from '@tanstack/react-query';
import { setTokens } from '@/lib/auth-tokens';
import { auth } from '@/lib/api/auth';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const navigate = useNavigate()
    // const queryClient = useQueryClient();

    return useMutation({
        mutationFn: auth,
        onSuccess: ({ data }) => {
            // API-dan kelgan tokenlarni saqlaymiz
            setTokens(data.accessToken, data.refreshToken);

            navigate('/');

            // Foydalanuvchi ma'lumotlarini keshda yangilash
            // queryClient.setQueryData(['user'], data.user);

            // Barcha so'rovlarni invalidate qilish (kerak bo'lsa)
            // queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error: any) => {
            console.error("Login xatosi:", error.response?.data?.message);
        }
    });
};