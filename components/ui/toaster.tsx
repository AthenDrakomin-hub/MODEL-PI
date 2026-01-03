import React from 'react';
import { useToast } from '../../src/hooks/use-toast';

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      {toasts.map(({ id, title, description, variant }) => (
        <div
          key={id}
          className={`p-4 rounded-lg shadow-lg max-w-sm w-full ${
            variant === 'destructive'
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-900 border border-gray-200'
          }`}
        >
          {title && <div className="font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
          <button
            onClick={() => dismiss(id)}
            className="absolute top-1 right-1 text-sm opacity-70 hover:opacity-100"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}