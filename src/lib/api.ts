import axios, { AxiosInstance } from 'axios';
import {useRouter} from "next/navigation";

// Base URL
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Axios instance yaratish
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,

  timeout: 10000, // 10 soniya timeout
});

// Request interceptor - har bir requestga token qo&apos;shadi
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - token yangilash uchun
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const response = await refreshAccessToken(refreshToken);
          const { access_token } = response.data;
          
          setAccessToken(access_token);
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token ham xato bo&apos;lsa, foydalanuvchini login sahifasiga yo&apos;naltirish
        clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Token management functions
export const setAccessToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token);
  }
};

export const setRefreshToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('refresh_token', token);
  }
};

export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

export const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refresh_token');
  }
  return null;
};

export const clearTokens = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

// Token yangilash
const refreshAccessToken = async (refreshToken: string) => {
  return axios.post(`${BASE_URL}/accounts/refresh/`, {
    refresh_token: refreshToken
  });
};

// API Response Types
export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

export interface User {
  id: string;
  phone_number: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  date_joined?: string;
  profile_picture?: string
}

export interface LoginRequest {
  phone_number: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

// Login funksiyasi
export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post('/accounts/signin/', credentials);
      
      console.log('Login response:', response.data);
      
      // APIdan kelgan tokenlar
      const accessToken = response.data.access || response.data.access_token;
      const refreshToken = response.data.refresh || response.data.refresh_token;
      
      // Tokenlarni saqlash
      if (accessToken) {
        setAccessToken(accessToken);
        console.log('Access token saved:', accessToken.substring(0, 20) + '...');
      }
      if (refreshToken) {
        setRefreshToken(refreshToken);
        console.log('Refresh token saved');
      }
      
      // Response formatini moslashtirish
      const loginResponse: LoginResponse = {
        access_token: accessToken || '',
        refresh_token: refreshToken || '',
        user: response.data.user || {
          id: 'temp-user',
          phone_number: credentials.phone_number,
          email: response.data.email || '',
          first_name: response.data.first_name || 'Foydalanuvchi',
          last_name: response.data.last_name || ''
        }
      };
      
      return loginResponse;
    } catch (error: any) {
      // ... error handling unchanged
      throw error;
    }
  };

// Logout funksiyasi
export const logoutUser = async (): Promise<void> => {
  try {
    // const refreshToken = getRefreshToken();
    // if (refreshToken) {
    //   await api.post('/accounts/logout/', {
    //     refresh_token: refreshToken
    //   });
    // }
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearTokens();
  }
};

// Foydalanuvchi ma'lumotlarini olish
export const getUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get<User>('/accounts/users/me');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const apiError: ApiError = {
        message: error.response.data?.message || 'Foydalanuvchi ma\'lumotlarini olishda xatolik',
        status: error.response.status,
        data: error.response.data
      };
      throw apiError;
    }
    throw error;
  }
};

// Token tekshirish
export const isTokenValid = (): boolean => {
    const token = getAccessToken();
    if (!token) return false;
    
    try {
      // JWT tokenni decode qilish (simple check)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      // Debug uchun
      console.log('Token payload:', payload);
      console.log('Current time:', currentTime);
      console.log('Token exp:', payload.exp);
      console.log('Is valid:', payload.exp > currentTime);
      
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

// Foydalanuvchi tizimga kirganligini tekshirish
export const isAuthenticated = (): boolean => {
  return getAccessToken() !== null && isTokenValid();
};

export default api;











// import axios, { AxiosInstance } from 'axios';

// // Base URL
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// // Axios instance yaratish
// const api: AxiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000, // 10 soniya timeout
// });

// // Request interceptor - har bir requestga token qo&apos;shadi
// api.interceptors.request.use(
//   (config) => {
//     const token = getAccessToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor - token yangilash uchun
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = getRefreshToken();
//         if (refreshToken) {
//           const response = await refreshAccessToken(refreshToken);
//           const { access_token } = response.data;
          
//           setAccessToken(access_token);
//           originalRequest.headers.Authorization = `Bearer ${access_token}`;
          
//           return api(originalRequest);
//         }
//       } catch (refreshError) {
//         // Refresh token ham xato bo&apos;lsa, foydalanuvchini login sahifasiga yo&apos;naltirish
//         clearTokens();
//         if (typeof window !== 'undefined') {
//           window.location.href = '/';
//         }
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // Token management functions
// export const setAccessToken = (token: string): void => {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem('access_token', token);
//   }
// };

// export const setRefreshToken = (token: string): void => {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem('refresh_token', token);
//   }
// };

// export const getAccessToken = (): string | null => {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('access_token');
//   }
//   return null;
// };

// export const getRefreshToken = (): string | null => {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('refresh_token');
//   }
//   return null;
// };

// export const clearTokens = (): void => {
//   if (typeof window !== 'undefined') {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
//   }
// };

// // Token yangilash
// const refreshAccessToken = async (refreshToken: string) => {
//   return axios.post(`${BASE_URL}/accounts/refresh/`, {
//     refresh_token: refreshToken
//   });
// };

// // API Response Types
// export interface ApiError {
//   message: string;
//   status?: number;
//   data?: any;
// }

// export interface User {
//   id: string;
//   phone_number: string;
//   email?: string;
//   first_name?: string;
//   last_name?: string;
//   is_active?: boolean;
//   date_joined?: string;
// }

// export interface LoginRequest {
//   phone_number: string;
//   password: string;
// }

// export interface LoginResponse {
//   access_token: string;
//   refresh_token: string;
//   user: User;
// }

// // Login funksiyasi
// export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
//   try {
//     const response = await api.post<LoginResponse>('/accounts/signin/', credentials);
    
//     // Tokenlarni saqlash
//     const { access_token, refresh_token } = response.data;
//     setAccessToken(access_token);
//     setRefreshToken(refresh_token);
    
//     return response.data;
//   } catch (error: any) {
//     // API xatoliklarini handle qilish
//     if (error.response) {
//       const apiError: ApiError = {
//         message: error.response.data?.message || error.response.data?.detail || 'Server xatosi',
//         status: error.response.status,
//         data: error.response.data
//       };
//       throw apiError;
//     } else if (error.request) {
//       throw {
//         message: 'Internetga ulanishda muammo&apos;,
//         status: 0
//       } as ApiError;
//     } else {
//       throw {
//         message: error.message || 'Noma\'lum xatolik',
//         status: 0
//       } as ApiError;
//     }
//   }
// };

// // Logout funksiyasi
// export const logoutUser = async (): Promise<void> => {
//   try {
//     const refreshToken = getRefreshToken();
//     if (refreshToken) {
//       await api.post('/accounts/logout/', {
//         refresh_token: refreshToken
//       });
//     }
//   } catch (error) {
//     console.error('Logout error:', error);
//   } finally {
//     clearTokens();
//   }
// };

// // Foydalanuvchi ma'lumotlarini olish
// export const getUserProfile = async (): Promise<User> => {
//   try {
//     const response = await api.get<User>('/accounts/profile/');
//     return response.data;
//   } catch (error: any) {
//     if (error.response) {
//       const apiError: ApiError = {
//         message: error.response.data?.message || 'Foydalanuvchi ma\'lumotlarini olishda xatolik',
//         status: error.response.status,
//         data: error.response.data
//       };
//       throw apiError;
//     }
//     throw error;
//   }
// };

// // Token tekshirish
// export const isTokenValid = (): boolean => {
//   const token = getAccessToken();
//   if (!token) return false;
  
//   try {
//     // JWT tokenni decode qilish (simple check)
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     const currentTime = Date.now() / 1000;
    
//     return payload.exp > currentTime;
//   } catch (error) {
//     return false;
//   }
// };

// // Foydalanuvchi tizimga kirganligini tekshirish
// export const isAuthenticated = (): boolean => {
//   return getAccessToken() !== null && isTokenValid();
// };

// export default api;