import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from 'js-cookie';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setTokens(accessToken: string, refreshToken: string) {
  // Set cookies with secure options
  Cookies.set('accessToken', accessToken, { 
    secure: true,
    sameSite: 'strict',
    expires: 1, // 1 day
    httpsOnly: true
  });
  
  Cookies.set('refreshToken', refreshToken, {
    secure: true,
    sameSite: 'strict',
    expires: 7, // 7 days
    httpsOnly: true
  });
}

export function clearTokens() {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
}