import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success' || !toast.type;
        const isInfo = toast.type === 'info';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-3.5 bg-white border border-[#E9EAE7] rounded-radar-lg shadow-elevated text-sm transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="mt-0.5 flex-shrink-0">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-[#54765A]" />}
              {isInfo && <Info className="w-4 h-4 text-[#416FAD]" />}
              {isWarning && <AlertCircle className="w-4 h-4 text-[#E9A66B]" />}
            </div>
            
            <p className="flex-1 text-[#202B3C] text-xs font-medium leading-relaxed">
              {toast.message}
            </p>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#7C8490] hover:text-[#202B3C] p-0.5 rounded transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

