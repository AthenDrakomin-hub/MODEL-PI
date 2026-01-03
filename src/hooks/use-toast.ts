import { useState, useEffect } from 'react';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant: 'default' | 'destructive';
}

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description, variant = 'default' }: ToastOptions = {}) => {
    const id = `toast-${toastId++}`;
    const newToast = { id, title, description, variant };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  return {
    toast,
    toasts,
    dismiss: (id: string) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    },
  };
}