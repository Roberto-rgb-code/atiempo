import React, { useEffect, useRef } from 'react';

const AnimatedLogoDisplay = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Crear partículas flotantes
    const createFloatingElements = () => {
      for (let i = 0; i < 8; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
          position: absolute;
          width: ${Math.random() * 6 + 4}px;
          height: ${Math.random() * 6 + 4}px;
          background: #D8F9A0;
          border-radius: 50%;
          animation: float ${Math.random() * 3 + 4}s ease-in-out infinite;
          animation-delay: ${Math.random() * 2}s;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          opacity: 0.7;
        `;
        container.appendChild(element);
      }
    };

    createFloatingElements();

    return () => {
      const elements = container.querySelectorAll('.floating-element');
      elements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-gradient-brand rounded-3xl overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #D8F9A0 0%, #A99C93 50%, #3C3A36 100%)'
      }}
    >
      {/* Patrón de fondo geométrico */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-8 left-8 w-16 h-16 border-2 border-white rounded-lg rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-12 right-12 w-20 h-20 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-8 w-12 h-12 bg-white rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 left-12 w-8 h-8 bg-white transform rotate-45"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center space-y-8">
        {/* Símbolo principal animado */}
        <div className="flex items-center justify-center space-x-2">
          <div className="symbol-animation text-white text-8xl lg:text-9xl font-bold">
            )
          </div>
          <div className="text-white text-4xl lg:text-5xl font-light opacity-80 animate-pulse">
            •
          </div>
          <div className="symbol-animation text-white text-8xl lg:text-9xl font-bold" style={{animationDelay: '0.5s'}}>
            (
          </div>
        </div>

        {/* Texto descriptivo */}
        <div className="space-y-2">
          <h3 className="text-white text-2xl lg:text-3xl font-bold">
            A Tiempo
          </h3>
          <p className="text-white/90 text-lg font-medium">
            Software Legal
          </p>
        </div>

        {/* Barra de progreso animada */}
        <div className="w-48 mx-auto">
          <div className="bg-white/30 rounded-full h-2 overflow-hidden">
            <div className="bg-white h-full rounded-full progress-animation"></div>
          </div>
          <p className="text-white/80 text-sm mt-2">Optimizando procesos...</p>
        </div>
      </div>

      {/* Ondas animadas */}
      <div className="absolute bottom-0 left-0 right-0 wave-container">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }
        
        .symbol-animation {
          animation: symbolPulse 3s ease-in-out infinite;
          transform-origin: center;
        }
        
        @keyframes symbolPulse {
          0%, 100% { 
            transform: scale(1) rotateY(0deg);
            text-shadow: 0 0 20px rgba(255,255,255,0.5);
          }
          50% { 
            transform: scale(1.1) rotateY(10deg);
            text-shadow: 0 0 30px rgba(255,255,255,0.8);
          }
        }
        
        .progress-animation {
          animation: progress 4s ease-in-out infinite;
          width: 0%;
        }
        
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
        
        .wave-container {
          height: 60px;
          overflow: hidden;
        }
        
        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: wave 8s linear infinite;
        }
        
        .wave1 { animation-delay: 0s; }
        .wave2 { animation-delay: 2s; opacity: 0.7; }
        .wave3 { animation-delay: 4s; opacity: 0.5; }
        
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogoDisplay;