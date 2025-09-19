import React from 'react';
import { Check } from 'lucide-react';
import Button from '../ui/Button';

const PricingSection = ({ onShowAuth }) => {
  const plans = [
    {
      name: 'Bamboo - Gratuita',
      price: '$0',
      period: '',
      description: 'Uso de plataforma limitado',
      features: [
        'Acceso básico',
        'Costo por producto',
        'Sin accesorios',
        'Sin soporte',
        'Sin formato de identidad',
        'Exportación en PDF'
      ],
      cta: 'Crear cuenta gratis',
      popular: false
    },
    {
      name: 'Advance Mediana',
      price: '$2,000',
      period: 'mes',
      description: '3 usuarios por notaría',
      features: [
        'Almacenamiento limitado a folios',
        '100 folios / Accesorios instalados',
        'Soporte ilimitado',
        'Formato identidad de notaría',
        'PDF (con opción de escalar a Word)'
      ],
      cta: 'Comenzar',
      popular: true
    },
    {
      name: 'In-Time Grandes',
      price: '$3,500',
      period: 'mes',
      description: '10 usuarios por notaría',
      features: [
        'Almacenamiento ilimitado',
        '250 folios / Accesorios instalados',
        'Soporte ilimitado',
        'Formato identidad de notaría',
        'PDF y Word',
        'Acceso beta a nuevos productos'
      ],
      cta: 'Hablar con ventas',
      popular: false
    }
  ];

  const wordFolioCost = {
    note: 'Costo por folio de Word (mínimo 30 folios)',
    price: '$20.00'
  };

  const productCosts = [
    { name: 'Testimonio', price: 150 },
    { name: 'Copia Certificada', price: 150 },
    { name: 'Transmisión', price: 100 },
    { name: 'Plano', price: 85 },
    { name: 'Portada', price: 70 }
  ];

  const annualPromo = [
    { plan: 'Advance Mediana', price: '$20,000.00' },
    { plan: 'In-Time Grandes', price: '$35,000.00' }
  ];

  return (
    <section id="precios" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Planes y costos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elige el plan que se ajusta a tu notaría y escala a tu ritmo.
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
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#D8F9A0] text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    plan.popular ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mb-4 ${
                    plan.popular ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {plan.description}
                </p>
                <div className="flex items-end justify-center">
                  <span
                    className={`text-4xl font-bold ${
                      plan.popular ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={`ml-2 ${
                        plan.popular ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
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
                    <span
                      className={plan.popular ? 'text-gray-300' : 'text-gray-700'}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() =>
                  onShowAuth(plan.name === 'Bamboo - Gratuita' ? 'register' : 'register')
                }
                variant={plan.popular ? 'accent' : 'outline'}
                size="lg"
                className="w-full"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Word folio cost */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500">
                Adicional
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {wordFolioCost.note}
              </p>
            </div>
            <div className="text-3xl font-bold text-gray-900">{wordFolioCost.price}</div>
          </div>
        </div>

        {/* Product costs */}
        <div className="max-w-4xl mx-auto mt-10 bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Costo por producto</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {productCosts.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3"
              >
                <span className="text-gray-700">{p.name}</span>
                <span className="font-semibold text-gray-900">
                  ${p.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Annual promotion */}
        <div className="max-w-4xl mx-auto mt-10">
          <div className="rounded-2xl bg-[#D8F9A0] p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Promoción de pago anual
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {annualPromo.map((ap) => (
                <div
                  key={ap.plan}
                  className="flex items-center justify-between rounded-xl bg-white px-4 py-3"
                >
                  <span className="font-medium text-gray-800">{ap.plan}</span>
                  <span className="font-semibold text-gray-900">{ap.price}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-700">
              * Precios en MXN. Impuestos no incluidos.
            </p>
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-2">
            Puedes iniciar en el plan gratuito y actualizar cuando lo necesites.
          </p>
          <p className="text-sm text-gray-500">Sin compromisos. Cancela cuando quieras.</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
