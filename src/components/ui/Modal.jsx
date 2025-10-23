import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop más transparente */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Modal con mejor integración visual */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 ${sizes[size]} w-full transform transition-all duration-300 scale-100`}>
          {/* Header con mejor diseño */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
            <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Content con padding mejorado */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;