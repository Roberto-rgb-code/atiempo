import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Zap, Shield, Users } from 'lucide-react';

// Componente de Reloj de Arena Animado
const AnimatedHourglass = () => {
  const [rotation, setRotation] = useState(0);
  const [sandLevel, setSandLevel] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setSandLevel(prev => {
        if (prev <= 0) {
          setRotation(r => r + 180);
          return 100;
        }
        return prev - 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Reloj de Arena */}
      <div 
        className="relative transition-transform duration-1000 ease-in-out"
        style={{ 
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <svg
          width="180"
          height="240"
          viewBox="0 0 120 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Marco exterior del reloj */}
          <rect x="10" y="5" width="100" height="10" fill="#D8F9A0" rx="2" />
          <rect x="10" y="145" width="100" height="10" fill="#D8F9A0" rx="2" />
          
          {/* Vidrio superior */}
          <path
            d="M 20 15 L 60 75 L 100 15 Z"
            fill="rgba(216, 249, 160, 0.2)"
            stroke="#D8F9A0"
            strokeWidth="3"
          />
          
          {/* Vidrio inferior */}
          <path
            d="M 20 145 L 60 85 L 100 145 Z"
            fill="rgba(216, 249, 160, 0.2)"
            stroke="#D8F9A0"
            strokeWidth="3"
          />
          
          {/* Arena superior (disminuye) */}
          <path
            d={`M 20 15 L 60 ${75 - (sandLevel * 0.6)} L 100 15 Z`}
            fill="#D8F9A0"
            opacity="0.9"
          />
          
          {/* Arena inferior (aumenta) */}
          <path
            d={`M 20 145 L 60 ${145 - ((100 - sandLevel) * 0.6)} L 100 145 Z`}
            fill="#D8F9A0"
            opacity="0.9"
          />
          
          {/* Flujo de arena (centro) */}
          <circle
            cx="60"
            cy="80"
            r="2"
            fill="#D8F9A0"
            opacity={sandLevel > 0 ? "0.8" : "0"}
          >
            <animate
              attributeName="cy"
              from="75"
              to="85"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#D8F9A0] rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

// Componente de Fondo de Partículas
const ParticlesBackground = ({ particleCount = 40, color = "#D8F9A0", opacity = 0.08 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(particleCount)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            backgroundColor: color,
            opacity: opacity,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `particle-float ${10 + Math.random() * 20}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
      <style>{`
        @keyframes particle-float {
          0% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(-5px, -20px); }
          75% { transform: translate(-15px, -10px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
};

// Componente Button
const Button = ({ children, onClick, variant = "primary", size = "md", className = "" }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300";
  
  const variants = {
    primary: "bg-black text-[#D8F9A0] hover:bg-gray-900",
    outline: "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
  };
  
  const sizes = {
    md: "px-6 py-3 text-base",
    xl: "px-10 py-5 text-xl"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ fontFamily: 'Satoshi, sans-serif' }}
    >
      {children}
    </button>
  );
};

// Componente Principal Hero Section
const HeroSection = ({ onShowAuth = () => {} }) => {
  return (
    <>
      {/* Importar fuentes de Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Satoshi:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen flex items-center">
        {/* Fondo de partículas más sutil */}
        <ParticlesBackground 
          particleCount={40} 
          color="#D8F9A0" 
          opacity={0.08}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-10">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
            
            {/* Contenido principal */}
            <div className="space-y-10 order-2 lg:order-1">
              <div className="space-y-8">
                <div className="flex items-center space-x-3 text-[#3C3A36]">
                  <Clock size={32} className="text-[#D8F9A0]" />
                  <span className="text-xl font-bold uppercase tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Software Legal
                  </span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-[0.95]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Eficiencia y{' '}
                  <span className="relative inline-block">
                    <span className="text-[#D8F9A0] bg-black px-6 py-3 inline-block transform -rotate-1 text-4xl lg:text-6xl xl:text-7xl rounded-lg">
                      simplicidad
                    </span>
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl xl:text-3xl text-gray-600 leading-relaxed max-w-2xl" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}>
                  Simplificando la redacción notarial con un software intuitivo 
                  que ofrece <strong className="text-gray-800" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 500 }}>eficiencia y simplicidad</strong>.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  onClick={() => onShowAuth('register')}
                  variant="primary"
                  size="xl"
                  className="group shadow-lg hover:shadow-xl"
                >
                  Comenzar ahora
                  <ArrowRight size={28} className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
                <Button 
                  variant="outline" 
                  size="xl"
                  onClick={() => window.open('mailto:angelrmz@atiempo.mx?subject=Solicitud de Demo - A Tiempo', '_blank')}
                >
                  Ver demo
                </Button>
              </div>
              
              {/* Features rápidos */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-xl backdrop-blur-sm">
                  <Zap size={24} className="text-[#D8F9A0]" />
                  <span className="font-semibold text-gray-800" style={{ fontFamily: 'Satoshi, sans-serif' }}>Rápido</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-xl backdrop-blur-sm">
                  <Shield size={24} className="text-[#D8F9A0]" />
                  <span className="font-semibold text-gray-800" style={{ fontFamily: 'Satoshi, sans-serif' }}>Seguro</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-xl backdrop-blur-sm">
                  <Users size={24} className="text-[#D8F9A0]" />
                  <span className="font-semibold text-gray-800" style={{ fontFamily: 'Satoshi, sans-serif' }}>Colaborativo</span>
                </div>
              </div>
              
              {/* Estadísticas mejoradas */}
              <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-200">
                <div className="text-center lg:text-left">
                  <div className="text-4xl lg:text-6xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>85%</div>
                  <div className="text-lg text-gray-600 font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>Tiempo ahorrado</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-4xl lg:text-6xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>20+</div>
                  <div className="text-lg text-gray-600 font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>Notarías confían</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-4xl lg:text-6xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>24/7</div>
                  <div className="text-lg text-gray-600 font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>Soporte técnico</div>
                </div>
              </div>
            </div>
            
            {/* Área de animación mejorada con reloj de arena */}
            <div className="relative order-1 lg:order-2">
              <div className="relative h-96 lg:h-[500px] xl:h-[600px] bg-gradient-to-br from-gray-800 to-black rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                <AnimatedHourglass />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;