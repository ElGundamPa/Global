"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { Shield, Cpu, Users } from "lucide-react";

/**
 * About Section - Company mission with three core pillars
 * Uses Law of Proximity to group related information
 * Implements scroll-triggered animations for engagement
 */
export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pillars = [
    {
      icon: Shield,
      title: "Transparencia",
      description:
        "Operamos con total claridad en cada transacción. Tu confianza es nuestra prioridad y cada dato es verificable en tiempo real.",
      color: "from-blue-500 to-blue-700",
      shadowColor: "shadow-blue-500/50",
    },
    {
      icon: Cpu,
      title: "Tecnología",
      description:
        "Plataforma de última generación con IA y análisis predictivo. Herramientas profesionales al alcance de todos los inversores.",
      color: "from-purple-500 to-purple-700",
      shadowColor: "shadow-purple-500/50",
    },
    {
      icon: Users,
      title: "Comunidad",
      description:
        "Más que una plataforma, somos una familia de inversores. Aprende, comparte y crece junto a miles de traders exitosos.",
      color: "from-amber-500 to-amber-700",
      shadowColor: "shadow-amber-500/50",
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-[#0b0b0f] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      
      <Container>
        <div ref={ref} className="space-y-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20">
              Sobre Fortune Global
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Tu socio estratégico en el{" "}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                mundo financiero
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
              En Fortune Global, creemos que todos merecen acceso a educación
              financiera de calidad y herramientas de inversión profesionales.
              Nuestra misión es democratizar el trading y empoderar a
              inversores de todos los niveles.
            </p>
          </motion.div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <div className="group h-full p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:scale-105">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${pillar.color} shadow-lg ${pillar.shadowColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <pillar.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Decorative line */}
                  <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${pillar.color} rounded-full transition-all duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative mt-16"
          >
            <div className="relative p-12 rounded-3xl bg-gradient-to-br from-amber-600/10 to-amber-900/10 border border-amber-500/20 overflow-hidden">
              {/* Glow effect */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl" />
              
              <div className="relative z-10 text-center max-w-4xl mx-auto">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Nuestra Visión
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Ser la plataforma financiera más confiable y educativa de
                  América Latina, transformando vidas a través de la educación
                  financiera y el acceso equitativo a los mercados globales.
                  Creemos que con las herramientas correctas y el conocimiento
                  adecuado, cualquier persona puede alcanzar la libertad
                  financiera.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}




