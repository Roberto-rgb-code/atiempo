import React from 'react';
import { Zap, Shield, Users, Clock, FileText, Brain } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Eficiencia',
      description: 'Reducimos procesos complejos a soluciones simples. Porque tu tiempo vale.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Brain,
      title: 'Innovación',
      description: 'Evolucionamos junto al mundo legal, integrando tecnología con propósito.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Shield,
      title: 'Confianza',
      description: 'Cada línea generada por nuestro software representa la seguridad de estar bien respaldado.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Users,
      title: 'Compromiso',
      description: 'Estamos del lado de los profesionales legales, para crecer con ellos y para ellos.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: FileText,
      title: 'Automatización',
      description: 'Genera documentos notariales y contractuales de forma automática e inteligente.',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      icon: Clock,
      title: 'Tiempo Real',
      description: 'Accede a tus documentos y plantillas desde cualquier lugar, en cualquier momento.',
      color: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <section id="caracteristicas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nuestros Valores
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            En un mundo legal que aún se pierde en lo burocrático, creemos que el trabajo 
            jurídico no tiene por qué ser lento ni tedioso.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl border border-gray-100 hover:border-[#D8F9A0] hover:shadow-lg transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-6`}>
                <feature.icon size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-brand rounded-2xl p-12 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Libera el potencial estratégico de tu equipo
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Nuestra misión no es solo tecnológica, es profundamente humana. 
              Cada minuto que ganamos, es un minuto que se puede dedicar a pensar, 
              a prevenir, a construir.
            </p>
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Solicitar Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;