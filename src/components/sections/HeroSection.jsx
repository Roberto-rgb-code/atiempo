import React from 'react';
import { ArrowRight, Clock, Zap, Shield, Users } from 'lucide-react';
import Button from '../ui/Button';
import ParticlesBackground from '../ui/ParticlesBackground';
import AnimatedLogoDisplay from '../ui/AnimatedLogoDisplay';

const HeroSection = ({ onShowAuth }) => {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen flex items-center">
      {/* Fondo de partículas más sutil */}
      <ParticlesBackground 
        particleCount={40} 
        color="#D8F9A0" 
        opacity={0.08}
        className="z-0"
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          
          {/* Contenido principal */}
          <div className="space-y-10 order-2 lg:order-1">
            <div className="space-y-8">
              <div className="flex items-center space-x-3 text-[#3C3A36]">
                <Clock size={32} className="text-[#D8F9A0]" />
                <span className="text-xl font-bold uppercase tracking-wide">
                  Software Legal
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-[0.95]">
                Eficiencia y{' '}
                <span className="relative inline-block">
                  <span className="text-[#D8F9A0] bg-black px-6 py-3 inline-block transform -rotate-1 text-4xl lg:text-6xl xl:text-7xl rounded-lg">
                    simplicidad
                  </span>
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl xl:text-3xl text-gray-600 leading-relaxed max-w-2xl font-light">
                Simplificando la redacción notarial con un software intuitivo 
                que ofrece <strong className="text-gray-800">eficiencia y simplicidad</strong>.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                onClick={() => onShowAuth('register')}
                variant="primary"
                size="xl"
                className="group text-xl px-10 py-5 shadow-lg hover:shadow-xl"
              >
                Comenzar ahora
                <ArrowRight size={28} className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <Button variant="outline" size="xl" className="text-xl px-10 py-5 border-2">
                Ver demo
              </Button>
            </div>
            
            {/* Features rápidos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-xl backdrop-blur-sm">
                <Zap size={24} className="text-[#D8F9A0]" />
                <span className="font-semibold text-gray-800">Rápido</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-xl backdrop-blur-sm">
                <Shield size={24} className="text-[#D8F9A0]" />
                <span className="font-semibold text-gray-800">Seguro</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-xl backdrop-blur-sm">
                <Users size={24} className="text-[#D8F9A0]" />
                <span className="font-semibold text-gray-800">Colaborativo</span>
              </div>
            </div>
            
            {/* Estadísticas mejoradas */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-200">
              <div className="text-center lg:text-left">
                <div className="text-4xl lg:text-6xl font-bold text-gray-900 mb-2">85%</div>
                <div className="text-lg text-gray-600 font-medium">Tiempo ahorrado</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-4xl lg:text-6xl font-bold text-gray-900 mb-2">500+</div>
                <div className="text-lg text-gray-600 font-medium">Notarías confían</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-4xl lg:text-6xl font-bold text-gray-900 mb-2">24/7</div>
                <div className="text-lg text-gray-600 font-medium">Soporte técnico</div>
              </div>
            </div>
          </div>
          
          {/* Área de animación mejorada */}
          <div className="relative order-1 lg:order-2">
            <div className="relative h-96 lg:h-[500px] xl:h-[600px]">
              <AnimatedLogoDisplay />
              
              {/* Elementos flotantes más elegantes */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-gray-700">Sistema activo</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border z-20">
                <div className="text-sm">
                  <div className="font-bold text-gray-900">Documento generado</div>
                  <div className="text-gray-500 flex items-center mt-1">
                    <div className="w-2 h-2 bg-[#D8F9A0] rounded-full mr-2 animate-pulse"></div>
                    Hace 2 minutos
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 -left-8 bg-[#D8F9A0] rounded-2xl p-4 shadow-xl z-20">
                <div className="w-6 h-6 bg-white rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;