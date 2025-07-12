import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  isVisible,
  onClose
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isVisible) {
      setProgress(100);
      
      // Inicia a contagem regressiva do progresso
      const startTime = Date.now();
      const duration = 5000; // 5 segundos
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 * (1 - elapsed / duration));
        
        if (remaining > 0) {
          setProgress(remaining);
          requestAnimationFrame(updateProgress);
        } else {
          onClose();
        }
      };
      
      requestAnimationFrame(updateProgress);

      // Backup timer
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-notification-slide-in">
      <div
        className={`
          relative overflow-hidden
          flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg
          ${type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
          }
        `}
      >
        {/* Barra de progresso */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-white/30"
          style={{ width: `${progress}%`, transition: 'width 100ms linear' }}
        />

        <div className="flex items-center gap-2">
          {type === 'success' ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <XCircle className="w-6 h-6" />
          )}
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Notification; 