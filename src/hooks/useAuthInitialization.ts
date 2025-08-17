
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '@/features/auth/authSlice';
import httpClient from '@/lib/http/httpClient';
import type { AppDispatch } from '@/stores';
import type { User } from '@/types/user';

export const useAuthInitialization = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = httpClient.getAuthToken();
      
      if (token) {
        try {
          const response = await httpClient.get<User>('/auth/profile');
          
          if (response.success && response.data) {
            dispatch(loginSuccess({
              user: response.data,
              token: token,
            }));
          } else {
            httpClient.removeAuthToken();
            dispatch(logout());
          }
        } catch (error) {
          console.warn('Token verification failed:', error);
          httpClient.removeAuthToken();
          dispatch(logout());
        }
      }
    };

    initializeAuth();
  }, [dispatch]);
};