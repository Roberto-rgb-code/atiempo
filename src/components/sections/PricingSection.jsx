import React from 'react';
import { Check } from 'lucide-react';
import Button from '../ui/Button';

const PricingSection = ({ onShowAuth }) => {
  const plans = [
    {
      name: 'Básico',
      price: '$99',
      period: 'mes',
      description: 'Perfecto para notarías pequeñas',
      features: [
        'Hasta 50 documentos por mes',
        'Plantillas básicas',
        'Soporte por email',
        '1 usuario',
        'Almacenamiento 5GB'
      ],
      popular: false
    },
    {
      name: 'Profesional',
      price: '$199',
      period: 'mes',
      description: 'Ideal para despachos medianos',
      features: [
        'Hasta 200 documentos por mes',
        'Todas las plantillas',
        'Soporte prioritario',
        'Hasta 5 usuarios',
        'Almacenamiento 25GB',
        'Integración con sistemas',
        'Reportes avanzados'
      ],
      popular: true
    },
    {
      name: 'Empresarial',
      price: 'Personalizado',
      period: '',
      description: 'Para grandes organizaciones',
      features: [
        'Documentos ilimitados',
        'Plantillas personalizadas',
        'Soporte 24/7',
        'Usuarios ilimitados',
        'Almacenamiento ilimitado',
        'API personalizada',
        'Capacitación especializada',
        'Gerente de cuenta dedicado'
      ],
      popular: false
    }
  ];

  return (
    <section id="precios" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Planes que se adaptan a ti
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Convertirnos en el software legal de referencia en notarías y despachos 
            jurídicos de toda la República.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-black text-white ring-4 ring-[#D8F9A0]'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#D8F9A0] text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`mb-4 ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                <div className="flex items-end justify-center">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`ml-2 ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                      /{plan.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check
                      size={20}
                      className={`mr-3 mt-0.5 ${
                        plan.popular ? 'text-[#D8F9A0]' : 'text-green-500'
                      }`}
                    />
                    <span className={plan.popular ? 'text-gray-300' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => onShowAuth('register')}
                variant={plan.popular ? 'accent' : 'outline'}
                size="lg"
                className="w-full"
              >
                {plan.name === 'Empresarial' ? 'Contactar Ventas' : 'Comenzar Prueba'}
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Todos los planes incluyen prueba gratuita de 14 días
          </p>
          <p className="text-sm text-gray-500">
            Sin compromisos. Cancela cuando quieras.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;