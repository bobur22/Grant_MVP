import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';


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

const showSuccessMessage = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      backgroundColor: '#10b981',
      color: 'white'
    }
  });
};

const showErrorMessage = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      backgroundColor: '#ef4444',
      color: 'white'
    }
  });
};

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
  data?: unknown;
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

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  other_name: string;
  email: string;
  address: string;
  birth_date: string;
  phone_number: string;
  gender: string;
  working_place?: string;
  passport_number: string;
  pinfl: string;
  password: string;
  confirm_password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    first_name: string;
    last_name: string;
    other_name: string;
    email: string;
    address: string;
    birth_date: string | null;
    phone_number: string;
    gender: string;
    working_place: string | null;
    passport_number: string;
    pinfl: string;
    tokens: {
      access: string;
      refresh: string;
    };
  };
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
    } catch (error: unknown) {
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }

  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearTokens(); // Bu funksiya ham mavjud tokenlarni tozalaydi
  }
};

// Foydalanuvchi ma'lumotlarini olish
export const getUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get<User>('/accounts/users/me');
    return response.data;
  } catch (error: unknown) {
    // if (error.response) {
    //   const apiError: ApiError = {
    //     message: error.response.data?.message || 'Foydalanuvchi ma\'lumotlarini olishda xatolik',
    //     status: error.response.status,
    //     data: error.response.data
    //   };
    //   throw apiError;
    // }
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

  // Register funksiyasi
export const registerUser = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await api.post(`/accounts/auth/signup/`, userData);
    
    console.log('Register response:', response.data);
    
    // Tokenlarni saqlash
    const { access, refresh } = response.data.user.tokens;
    if (access) {
      setAccessToken(access);
    }
    if (refresh) {
      setRefreshToken(refresh);
    }
    showSuccessMessage(response.data.message || 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz!');
    
    return response.data;
  } catch (error: unknown) {
    // Error handling
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      // API dan kelgan error messageni ko'rsatish
      showErrorMessage(error.response.data.message);
    } else {
      // Default error message
      showErrorMessage('Ro\'yxatdan o\'tishda xatolik yuz berdi');
    }
    throw error;
  }
};

// Foydalanuvchi tizimga kirganligini tekshirish
export const isAuthenticated = (): boolean => {
  return getAccessToken() !== null && isTokenValid();
};

export default api;
