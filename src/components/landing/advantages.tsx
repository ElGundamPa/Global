"use client";

import { motion } from "framer-motion";
import { Shield, TrendingUp, Bot, Globe2 } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const advantages = [
  {
    id: 1,
    icon: Shield,
    title: "Inversiones inteligentes y seguras",
    description: "Protegemos tu capital con tecnología de encriptación de nivel bancario y estrategias probadas de gestión de riesgos.",
    features: [
      "Encriptación de grado militar",
      "Auditorías de seguridad constantes",
      "Fondos asegurados",
    ],
    gradient: "from-fortune-green to-fortune-electric",
    glow: "shadow-fortune-green/50",
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Datos de mercado en tiempo real",
    description: "Accede a información actualizada al instante de todos los mercados globales para tomar decisiones informadas.",
    features: [
      "Actualizaciones en milisegundos",
      "Análisis técnico avanzado",
      "Alertas personalizadas",
    ],
    gradient: "from-fortune-electric to-fortune-electric-purple",
    glow: "shadow-fortune-electric/50",
  },
  {
    id: 3,
    icon: Bot,
    title: "Asesoría guiada por IA",
    description: "Nuestra inteligencia artificial analiza miles de variables para recomendarte las mejores oportunidades de inversión.",
    features: [
      "Recomendaciones personalizadas",
      "Predicciones basadas en datos",
      "Optimización automática",
    ],
    gradient: "from-fortune-electric-purple to-fortune-green",
    glow: "shadow-fortune-electric-purple/50",
  },
  {
    id: 4,
    icon: Globe2,
    title: "Retornos globales diversificados",
    description: "Invierte en mercados de todo el mundo: acciones, criptomonedas, divisas y más desde una sola plataforma.",
    features: [
      "Acceso a mercados globales",
      "Diversificación inteligente",
      "Gestión de portafolio",
    ],
    gradient: "from-fortune-green via-fortune-electric to-fortune-electric-purple",
    glow: "shadow-fortune-green/50",
  },
];

export function Advantages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="advantages"
      className="relative py-24 md:py-32 bg-gradient-to-b from-fortune-black via-fortune-blue-darker to-fortune-black overflow-hidden"
    >
      {/* Fondo con partículas */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-fortune-green/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fortune-electric/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
            ¿Por qué elegir Fortune Global?
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Combinamos tecnología de punta, seguridad robusta y experiencia global.
          </p>
        </motion.div>

        {/* Grid de ventajas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <div className="glass-morphism-strong rounded-3xl p-8 h-full hover-lift group relative overflow-hidden">
                {/* Gradiente decorativo de fondo */}
                <div className={`absolute inset-0 bg-gradient-to-br ${advantage.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Contenido */}
                <div className="relative z-10">
                  {/* Icono */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${advantage.gradient} flex items-center justify-center mb-6 ${advantage.glow} group-hover:shadow-xl transition-shadow`}
                  >
                    <advantage.icon className="w-8 h-8 text-fortune-black" />
                  </motion.div>

                  {/* Título */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {advantage.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                    {advantage.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3">
                    {advantage.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.15 + featureIndex * 0.1 + 0.3 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${advantage.gradient} shadow-lg ${advantage.glow}`} />
                        <span className="text-gray-300 text-sm">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${advantage.gradient} opacity-5 rounded-bl-full`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="glass-morphism rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "99.9%", label: "Uptime garantizado" },
                { value: "24/7", label: "Soporte disponible" },
                { value: "150+", label: "Países atendidos" },
                { value: "AAA", label: "Calificación de seguridad" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-gradient-green mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


