import React from 'react';
import { Zap, Shield, Users, Clock, FileText, Brain, ArrowRight } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Eficiencia',
      description: 'Reducimos procesos complejos a soluciones simples. Porque tu tiempo vale.',
      gradient: 'from-[#D8F9A0] to-[#c9ea8f]'
    },
    {
      icon: Brain,
      title: 'Innovación',
      description: 'Evolucionamos junto al mundo legal, integrando tecnología con propósito.',
      gradient: 'from-gray-800 to-gray-900'
    },
    {
      icon: Shield,
      title: 'Confianza',
      description: 'Cada línea generada por nuestro software representa la seguridad de estar bien respaldado.',
      gradient: 'from-[#A99C93] to-[#8b7f76]'
    },
    {
      icon: Users,
      title: 'Compromiso',
      description: 'Estamos del lado de los profesionales legales, para crecer con ellos y para ellos.',
      gradient: 'from-[#D8F9A0] to-[#c9ea8f]'
    },
    {
      icon: FileText,
      title: 'Automatización',
      description: 'Genera documentos notariales y contractuales de forma automática e inteligente.',
      gradient: 'from-gray-800 to-gray-900'
    },
    {
      icon: Clock,
      title: 'Tiempo Real',
      description: 'Accede a tus documentos y plantillas desde cualquier lugar, en cualquier momento.',
      gradient: 'from-[#A99C93] to-[#8b7f76]'
    }
  ];

  return (
    <>
      {/* Importar fuentes */}
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Satoshi:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <section id="caracteristicas" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D8F9A0] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black opacity-5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Nuestros{' '}
              <span className="relative inline-block">
                <span className="text-[#D8F9A0] bg-black px-4 py-2 inline-block transform -rotate-1 rounded-lg">
                  Valores
                </span>
              </span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}>
              En un mundo legal que aún se pierde en lo burocrático, creemos que el trabajo 
              jurídico no tiene por qué ser lento ni tedioso.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white p-8 rounded-3xl border border-gray-200 hover:border-[#D8F9A0] hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Fondo decorativo con gradiente */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={28} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Mejorado */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-3xl p-12 lg:p-16 text-center shadow-2xl border border-gray-800 overflow-hidden relative">
              {/* Elementos decorativos */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-10 w-20 h-20 bg-[#D8F9A0] rounded-full opacity-10 blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#D8F9A0] rounded-full opacity-10 blur-xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center space-x-2 bg-[#D8F9A0] bg-opacity-20 px-4 py-2 rounded-full mb-6">
                  <Zap size={16} className="text-[#D8F9A0]" />
                  <span className="text-xs font-bold text-[#D8F9A0] uppercase tracking-wide" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Potencia tu equipo
                  </span>
                </div>
                
                <h3 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Libera el potencial{' '}
                  <span className="text-[#D8F9A0]">estratégico</span>{' '}
                  de tu equipo
                </h3>
                
                <p className="text-lg lg:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}>
                  Nuestra misión no es solo tecnológica, es profundamente humana. 
                  Cada minuto que ganamos, es un minuto que se puede dedicar a pensar, 
                  a prevenir, a construir.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    className="group inline-flex items-center bg-[#D8F9A0] text-black px-8 py-4 rounded-xl font-bold hover:bg-[#c9ea8f] transition-all duration-300 shadow-lg hover:shadow-xl"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Solicitar Demo
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </button>
                  
                  <button 
                    className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-black transition-all duration-300"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Conocer más
                  </button>
                </div>

                {/* Stats mini */}
                <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-800">
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-[#D8F9A0] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      85%
                    </div>
                    <div className="text-sm text-gray-400" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      Reducción de tiempo
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-[#D8F9A0] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      500+
                    </div>
                    <div className="text-sm text-gray-400" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      Clientes satisfechos
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-[#D8F9A0] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      99.9%
                    </div>
                    <div className="text-sm text-gray-400" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      Uptime garantizado
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;