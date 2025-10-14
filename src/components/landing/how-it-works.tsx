"use client";

import { motion } from "framer-motion";
import { UserPlus, Target, TrendingUp } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    id: 1,
    icon: UserPlus,
    title: "Regístrate en minutos",
    description: "Crea tu cuenta de forma rápida y segura. Solo necesitas tu correo y algunos datos básicos para comenzar.",
    color: "fortune-green",
    delay: 0.2,
  },
  {
    id: 2,
    icon: Target,
    title: "Elige tu plan de inversión",
    description: "Selecciona entre múltiples opciones desde $500. Nuestro sistema te ayuda a encontrar la mejor estrategia para ti.",
    color: "fortune-electric",
    delay: 0.4,
  },
  {
    id: 3,
    icon: TrendingUp,
    title: "Observa tu crecimiento",
    description: "Sigue el rendimiento de tu portafolio en tiempo real con nuestra inteligencia financiera avanzada.",
    color: "fortune-electric-purple",
    delay: 0.6,
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-black via-fortune-blue-darker to-black overflow-hidden"
    >
      {/* Efectos de fondo animados mejorados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradiente principal animado verde */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-fortune-green/20 to-fortune-electric/10 rounded-full blur-[100px]"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            x: [-50, 50, -50],
            y: [-30, 30, -30],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Gradiente secundario animado cyan */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-gradient-to-tl from-fortune-electric/20 to-fortune-electric-purple/10 rounded-full blur-[100px]"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.3, 1],
            x: [50, -50, 50],
            y: [30, -30, 30],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Partículas flotantes decorativas */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-fortune-green/30 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Líneas decorativas sutiles */}
        <motion.div
          className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fortune-electric/20 to-transparent"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-fortune-green/10 to-fortune-electric/10 border border-fortune-green/30 rounded-full text-sm font-semibold text-fortune-green backdrop-blur-sm">
              Proceso Simple
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            ¿Cómo{" "}
            <span className="bg-gradient-to-r from-fortune-green via-fortune-electric to-fortune-electric-purple bg-clip-text text-transparent">
              funciona
            </span>
            ?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Comenzar a invertir nunca fue tan{" "}
            <span className="text-fortune-green font-semibold">simple</span>. 
            Solo tres pasos te separan de tu{" "}
            <span className="text-fortune-electric font-semibold">libertad financiera</span>.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Línea conectora en desktop */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-fortune-green via-fortune-electric to-fortune-electric-purple opacity-30" />

            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: step.delay }}
                className="relative"
              >
                {/* Card mejorada */}
                <motion.div 
                  className="glass-morphism-strong rounded-3xl p-8 h-full hover-lift group relative overflow-hidden"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Brillo de fondo al hover */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${
                    step.id === 1 ? 'from-fortune-green/10 via-transparent to-transparent' :
                    step.id === 2 ? 'from-fortune-electric/10 via-transparent to-transparent' :
                    'from-fortune-electric-purple/10 via-transparent to-transparent'
                  }`} />

                  {/* Número del paso mejorado */}
                  <motion.div 
                    className="absolute -top-4 -left-4 w-14 h-14 rounded-full bg-gradient-to-br from-fortune-green to-fortune-electric flex items-center justify-center font-bold text-black text-xl shadow-2xl shadow-fortune-green/60"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200, duration: 0.6 }}
                  >
                    {step.id}
                  </motion.div>

                  {/* Icono animado mejorado */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${
                      step.id === 1 ? 'from-fortune-green/20 to-fortune-green/5' :
                      step.id === 2 ? 'from-fortune-electric/20 to-fortune-electric/5' :
                      'from-fortune-electric-purple/20 to-fortune-electric-purple/5'
                    } flex items-center justify-center mb-6 mx-auto group-hover:shadow-2xl ${
                      step.id === 1 ? 'group-hover:shadow-fortune-green/60' :
                      step.id === 2 ? 'group-hover:shadow-fortune-electric/60' :
                      'group-hover:shadow-fortune-electric-purple/60'
                    } transition-all duration-500`}
                  >
                    {/* Círculo de brillo */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                        step.id === 1 ? 'from-fortune-green/30 to-transparent' :
                        step.id === 2 ? 'from-fortune-electric/30 to-transparent' :
                        'from-fortune-electric-purple/30 to-transparent'
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <step.icon className={`w-12 h-12 relative z-10 ${
                      step.id === 1 ? 'text-fortune-green' :
                      step.id === 2 ? 'text-fortune-electric' :
                      'text-fortune-electric-purple'
                    }`} />
                  </motion.div>

                  {/* Título */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center group-hover:text-white transition-colors">
                    {step.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-sm text-gray-400 text-center leading-relaxed group-hover:text-gray-300 transition-colors">
                    {step.description}
                  </p>

                  {/* Barra inferior animada */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1.5 rounded-b-3xl bg-gradient-to-r ${
                      step.id === 1 ? 'from-fortune-green to-fortune-electric' :
                      step.id === 2 ? 'from-fortune-electric to-fortune-electric-purple' :
                      'from-fortune-electric-purple to-fortune-green'
                    }`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>

                {/* Flecha conectora (solo en móvil) */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: step.delay + 0.3 }}
                    className="md:hidden flex justify-center my-6"
                  >
                    <div className="w-1 h-12 bg-gradient-to-b from-fortune-green to-fortune-electric rounded-full" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <motion.div
            className="glass-morphism-strong rounded-3xl p-10 max-w-3xl mx-auto relative overflow-hidden"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Efecto de brillo de fondo */}
            <div className="absolute inset-0 bg-gradient-to-r from-fortune-green/5 via-fortune-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <p className="text-xl md:text-2xl font-bold text-white mb-6">
              ¿Listo para comenzar tu{" "}
              <span className="bg-gradient-to-r from-fortune-green to-fortune-electric bg-clip-text text-transparent">
                viaje de inversión
              </span>
              ?
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="inline-block"
            >
              <a
                href="#advantages"
                className="relative inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-fortune-green to-fortune-electric rounded-2xl text-black font-bold text-lg shadow-2xl shadow-fortune-green/50 hover:shadow-fortune-green/70 transition-all overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Ver todos los servicios
                  <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Efecto de brillo deslizante */}
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


