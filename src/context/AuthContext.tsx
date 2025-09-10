"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  loginUser,
  logoutUser,
  getUserProfile,
  isTokenValid,
  LoginRequest,
  LoginResponse,
  User, getAccessToken,
} from '@/lib/api';
import {useRouter} from "next/navigation";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter()
  
    // isAuthenticated ni dinamik hisoblash o&apos;rniga state sifatida qo&apos;shamiz
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    // Sahifa yuklanganda foydalanuvchi ma'lumotlarini tekshirish
    useEffect(() => {
      const initializeAuth = async () => {
        try {
          console.log('Initializing auth...');
          const tokenValid = isTokenValid();
          console.log('Token valid:', tokenValid);
          
          if (tokenValid) {
            try {
              const userProfile = await getUserProfile();
              setUser(userProfile);
              setIsAuthenticated(true);
              console.log('User profile loaded:', userProfile);
            } catch (profileError) {
              console.error('Failed to load profile:', profileError);
              // Profile olishda xatolik bo&apos;lsa, tokendan foydalanib dummy user yaratamiz
              const token = getAccessToken();
              if (token) {
                setUser({
                  id: 'temp-user',
                  phone_number: 'Unknown',
                  first_name: 'Foydalanuvchi',
                  last_name: ''
                });
                setIsAuthenticated(true);
              }
            }
          } else {
            // Token noto&apos;g'ri bo&apos;lsa tozalash
            console.log('Token invalid, clearing...');
            await logoutUser().then(() => router.push('/'))
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          await logoutUser().then(() => router.push('/'));
          setUser(null);
          setIsAuthenticated(false);
        } finally {
          setIsLoading(false);
          console.log('Auth initialization complete');
        }
      };
  
      initializeAuth();
    }, []);
  
    const login = async (credentials: LoginRequest): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Starting login...');
        const response: LoginResponse = await loginUser(credentials);
        console.log('Login response received:', response);
        
        // User ma'lumotlarini o&apos;rnatish
        if (response.user) {
          setUser(response.user);
        } else {
          setUser({
            id: 'temp-user',
            phone_number: credentials.phone_number,
            first_name: 'Foydalanuvchi',
            last_name: '',
            email: ''
          });
        }
        
        // Authenticated holatini o&apos;rnatish
        setIsAuthenticated(true);
        console.log('Login successful, user authenticated');
        
      } catch (error: any) {
        console.error('Login error:', error);
        let errorMessage = 'Kirish jarayonida xatolik yuz berdi';
        
        if (error.status === 401 || error.status === 400) {
          errorMessage = 'Telefon raqam yoki parol noto\'g\'ri';
        } else if (error.status === 422) {
          errorMessage = 'Ma\'lumotlar to\'g\'ri formatda kiritilmagan';
        } else if (error.status === 0) {
          errorMessage = 'Internetga ulanishda muammo'
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        setError(errorMessage);
        setIsAuthenticated(false);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
  
    const logout = async (): Promise<void> => {
      try {
        setIsLoading(true);
        await logoutUser().then(() => router.push('/'));
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        setUser(null);
        setError(null);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };
  
    const refreshUserProfile = async (): Promise<void> => {
      try {
        if (isTokenValid()) {
          const userProfile = await getUserProfile();
          setUser(userProfile);
        }
      } catch (error) {
        console.error('Failed to refresh user profile:', error);
      }
    };
  
    const clearError = () => {
      setError(null);
    };
  
    const value: AuthContextType = {
      user,
      isLoading,
      isAuthenticated, // Bu endi state dan keladi
      login,
      logout,
      error,
      clearError,
      refreshUserProfile,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };



// "use client";

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { loginUser, logoutUser, getUserProfile, isTokenValid, LoginRequest, LoginResponse } from '@/lib/api';

// interface User {
//   id: string;
//   phone_number: string;
//   email?: string;
//   first_name?: string;
//   last_name?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean;
//   isAuthenticated: boolean;
//   login: (credentials: LoginRequest) => Promise<void>;
//   logout: () => Promise<void>;
//   error: string | null;
//   clearError: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: React.ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const isAuthenticated = !!user && isTokenValid();

//   // Sahifa yuklanganda foydalanuvchi ma'lumotlarini tekshirish
//   useEffect(() => {
//     const initializeAuth = async () => {
//       if (isTokenValid()) {
//         try {
//           const userProfile = await getUserProfile();
//           setUser(userProfile);
//         } catch (error) {
//           console.error('Failed to get user profile:', error);
//           // Token noto&apos;g'ri bo&apos;lsa tozalash
//           await logout();
//         }
//       }
//       setIsLoading(false);
//     };

//     initializeAuth();
//   }, []);

//   const login = async (credentials: LoginRequest): Promise<void> => {
//     try {
//       setIsLoading(true);
//       setError(null);
      
//       const response: LoginResponse = await loginUser(credentials);
//       setUser(response.user);
//     } catch (error: any) {
//       let errorMessage = 'Kirish jarayonida xatolik yuz berdi';
      
//       if (error.response?.status === 401) {
//         errorMessage = 'Telefon raqam yoki parol noto\'g\'ri';
//       } else if (error.response?.status === 400) {
//         errorMessage = 'Ma\'lumotlar to\'liq kiritilmagan';
//       } else if (error.code === 'NETWORK_ERROR') {
//         errorMessage = 'Internetga ulanishda muammo&apos;;
//       }
      
//       setError(errorMessage);
//       throw new Error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = async (): Promise<void> => {
//     try {
//       await logoutUser();
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       setUser(null);
//     }
//   };

//   const clearError = () => {
//     setError(null);
//   };

//   const value: AuthContextType = {
//     user,
//     isLoading,
//     isAuthenticated,
//     login,
//     logout,
//     error,
//     clearError,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };