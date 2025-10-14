"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "¿Cómo funciona Renta Fija 2.0?",
    answer: "Renta Fija 2.0 es un plan de inversión que te permite obtener rendimientos predecibles y estables. Inviertes desde $50 USD y recibes pagos periódicos según el plazo que elijas.",
  },
  {
    id: 2,
    question: "¿Cuál es el monto mínimo para invertir?",
    answer: "Puedes comenzar a invertir desde $50 USD en Renta Fija 2.0 y desde $500 USD en Renta Variable 2.0.",
  },
  {
    id: 3,
    question: "¿Cada cuánto recibiré mis ganancias?",
    answer: "Las ganancias se distribuyen según el tipo de renta. En Renta Fija 2.0 recibes pagos mensuales, mientras que en Renta Variable 2.0 las ganancias se actualizan en tiempo real en tu portafolio.",
  },
  {
    id: 4,
    question: "¿Es seguro invertir en Renta Fija 2.0?",
    answer: "Sí, contamos con protocolos de seguridad de nivel empresarial, encriptación de grado militar y auditorías constantes para proteger tus inversiones.",
  },
  {
    id: 5,
    question: "¿Puedo retirar mi dinero cuando lo necesite?",
    answer: "Sí, puedes retirar tus fondos en cualquier momento. Los retiros se procesan en un plazo de 24-48 horas hábiles.",
  },
  {
    id: 6,
    question: "¿Qué plazos de inversión están disponibles?",
    answer: "Ofrecemos plazos flexibles desde 3 meses hasta 24 meses, dependiendo del tipo de renta que elijas.",
  },
  {
    id: 7,
    question: "¿Cuáles son las ventajas del interés compuesto?",
    answer: "El interés compuesto te permite reinvertir tus ganancias automáticamente, generando rendimientos sobre rendimientos y acelerando el crecimiento de tu capital.",
  },
  {
    id: 8,
    question: "¿La plataforma es fácil de usar?",
    answer: "Absolutamente. Nuestra plataforma está diseñada para ser intuitiva y fácil de usar, tanto para principiantes como para inversores experimentados.",
  },
  {
    id: 9,
    question: "¿Renta Fija 2.0 es adecuado para principiantes?",
    answer: "Sí, Renta Fija 2.0 es ideal para principiantes porque ofrece rendimientos predecibles y estables con menor riesgo.",
  },
  {
    id: 10,
    question: "¿Por qué debo elegir Renta Fija 2.0?",
    answer: "Renta Fija 2.0 ofrece estabilidad, rendimientos predecibles, inversión mínima accesible y la posibilidad de construir un ingreso pasivo constante.",
  },
  {
    id: 11,
    question: "¿Cuál es la ganancia/comisión de Lazza Global en Renta Fija 2.0?",
    answer: "Nuestra comisión es transparente y competitiva. Los detalles específicos están disponibles en tu panel de inversión una vez que te registres.",
  },
];

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      ref={ref}
      id="faq"
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Fondo sutil */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Preguntas que nos hacen nuestros usuarios
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {openId === faq.id ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 text-white" />
                    )}
                  </div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openId === faq.id ? "auto" : 0,
                    opacity: openId === faq.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

