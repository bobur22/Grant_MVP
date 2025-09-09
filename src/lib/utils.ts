import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Telefon raqamni format qilish
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('998')) {
    const withoutCode = cleaned.substring(3);
    if (withoutCode.length === 9) {
      return `+998 (${withoutCode.substring(0, 2)}) ${withoutCode.substring(2, 5)} ${withoutCode.substring(5, 7)} ${withoutCode.substring(7)}`;
    }
  }
  
  return phone;
};

// Telefon raqamni validatsiya qilish
export const validatePhoneNumber = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return /^998[0-9]{9}$/.test(cleaned);
};

// Telefon raqamni tozalash (faqat raqamlar qoldirish)
export const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

// Foydalanuvchi ismini formatlash
export const formatUserName = (firstName?: string, lastName?: string): string => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  if (firstName) {
    return firstName;
  }
  if (lastName) {
    return lastName;
  }
  return 'Foydalanuvchi';
};

// Foydalanuvchi initiallarini olish
export const getUserInitials = (firstName?: string, lastName?: string): string => {
  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }
  if (firstName) {
    return firstName.charAt(0).toUpperCase();
  }
  return 'U';
};

// Sanani formatlash
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

// Status rangini olish
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'tayyorlandi':
    case 'completed':
      return 'bg-green-500';
    case 'jarayonda':
    case 'in-progress':
      return 'bg-orange-500';
    case 'rad etildi':
    case 'rejected':
      return 'bg-red-500';
    case 'kutish':
    case 'pending':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};