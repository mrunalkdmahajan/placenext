"use client";

import { toast as reactToast } from 'react-toastify';

// This is a wrapper function to make it easier to use react-toastify
interface ToastProps {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

export function Toast({ title, description, variant = "default" }: ToastProps) {
  const toastType = variant === 'destructive' ? reactToast.error : reactToast.success;
  toastType(description || title);
  return null;
}

// Export a simple function to use directly
export const toast = {
  success: (message: string) => reactToast.success(message),
  error: (message: string) => reactToast.error(message),
  info: (message: string) => reactToast.info(message),
  warning: (message: string) => reactToast.warning(message)
};

export default Toast;