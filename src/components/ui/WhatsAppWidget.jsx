import React, { useState } from 'react';
import { X } from 'lucide-react';

// Componente del ícono de WhatsApp original
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
);

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = '523334087070'; // Número de Ángel Ramírez

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent('Hola, me interesa conocer más sobre A Tiempo Software Legal.');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Widget expandido */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-xl border max-w-sm animate-fade-in">
          <div className="bg-[#25D366] text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <WhatsAppIcon size={20} className="text-[#25D366]" />
                </div>
                <div>
                  <h4 className="font-semibold">A Tiempo</h4>
                  <p className="text-sm opacity-90">Software Legal</p>
                </div>
              </div>
              <button
                onClick={toggleWidget}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-700">
                ¡Hola! Soy <strong>Ángel Ramírez</strong>, CEO de A Tiempo.
              </p>
              <p className="text-sm text-gray-700 mt-2">
                ¿En qué podemos ayudarte a optimizar tu trabajo legal?
              </p>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={openWhatsApp}
                className="w-full bg-[#25D366] text-white py-2 px-4 rounded-lg hover:bg-[#20B954] transition-colors text-sm"
              >
                Iniciar conversación
              </button>
              
              <div className="text-xs text-gray-500 text-center">
                Respuesta típica en pocos minutos
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante con ícono de WhatsApp original */}
      <button
        onClick={isOpen ? openWhatsApp : toggleWidget}
        className="bg-[#25D366] hover:bg-[#20B954] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 group"
      >
        <WhatsAppIcon size={28} className="group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};

export default WhatsAppWidget;