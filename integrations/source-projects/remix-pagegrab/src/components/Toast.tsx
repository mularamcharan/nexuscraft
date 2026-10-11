import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  notifications: ToastItem[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ notifications, onDismiss }) => {
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        onDismiss(notifications[0].id);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notifications, onDismiss]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-2 max-w-sm w-full px-4">
      {notifications.map((toast, index) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={`${toast.id}-${index}`}
            className={`p-4 rounded-2xl shadow-2xl border flex items-center justify-between gap-3 text-sm font-medium transition-all duration-300 animate-slideUp ${
              isSuccess
                ? 'bg-[#0d1424] border-[#06b6d4] text-white shadow-[#06b6d4]/20'
                : isError
                ? 'bg-red-950 border-red-500 text-red-100'
                : 'bg-[#0a0e1a] border-gray-700 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#06b6d4] flex-shrink-0" />}
              {isError && <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />}
              <span className="leading-snug">{toast.message}</span>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-gray-400 hover:text-white p-1 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
