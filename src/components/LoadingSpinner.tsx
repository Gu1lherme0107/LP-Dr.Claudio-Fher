import React from 'react';

interface LoadingSpinnerProps {
  isVisible: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-xl flex flex-col items-center gap-4 max-w-sm mx-4">
        <div className="relative w-20 h-20">
          {/* Círculo externo animado */}
          <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          
          {/* Círculo interno pulsante */}
          <div className="absolute inset-4 bg-primary/20 rounded-full animate-pulse"></div>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-dark-text">
            Processando...
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 