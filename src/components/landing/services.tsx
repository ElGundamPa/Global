"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, TrendingUp, Bitcoin, Users } from "lucide-react";

/**
 * Services Section - Four main service offerings
 * Follows Miller's Law by limiting to 4 main services
 * Uses consistent card layout (Jakob's Law - familiar patterns)
 */
export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: GraduationCap,
      title: "Trading Academy",
      description:
        "Aprende a operar en mercados financieros con cursos profesionales y mentorías personalizadas.",
      features: [
        "Cursos desde básico hasta avanzado",
        "Sesiones en vivo con traders profesionales",
        "Certificación oficial",
        "Acceso de por vida al material",
      ],
      gradient: "from-blue-500 to-blue-700",
      iconBg: "bg-blue-500/10",
      borderHover: "hover:border-blue-500/50",
    },
    {
      icon: TrendingUp,
      title: "Análisis de Mercados",
      description:
        "Recibe análisis expertos y señales de trading basadas en IA y análisis técnico avanzado.",
      features: [
        "Señales de trading diarias",
        "Análisis técnico profesional",
        "Reportes de mercado semanales",
        "Alertas en tiempo real",
      ],
      gradient: "from-purple-500 to-purple-700",
      iconBg: "bg-purple-500/10",
      borderHover: "hover:border-purple-500/50",
    },
    {
      icon: Bitcoin,
      title: "Inversión Inteligente",
      description:
        "Mantente al día con las mejores oportunidades en el mercado de criptomonedas y activos digitales.",
      features: [
        "Señales de compra/venta",
        "Análisis on-chain",
        "Alertas de precio",
        "Indicadores personalizados",
      ],
      gradient: "from-amber-500 to-amber-700",
      iconBg: "bg-amber-500/10",
      borderHover: "hover:border-amber-500/50",
    },
    {
      icon: Users,
      title: "Consultoría Financiera",
      description:
        "Asesoría personalizada para optimizar tu portafolio y estrategias de inversión.",
      features: [
        "Sesiones 1-a-1 con expertos",
        "Análisis de portafolio",
        "Estrategias personalizadas",
        "Seguimiento mensual",
      ],
      gradient: "from-green-500 to-green-700",
      iconBg: "bg-green-500/10",
      borderHover: "hover:border-green-500/50",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-[#0b0b0f] to-[#1c1c1f] relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />
      
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
              Nuestros Servicios
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Todo lo que necesitas para{" "}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                tener éxito
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
              Herramientas profesionales, educación de calidad y soporte
              experto para impulsar tu camino hacia la libertad financiera.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className={`h-full transition-all duration-300 hover:scale-105 ${service.borderHover} hover:shadow-2xl`}>
                  <CardHeader>
                    {/* Icon */}
                    <div className={`inline-flex w-fit p-4 rounded-xl ${service.iconBg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>

                    <CardTitle className="text-2xl text-white mb-3">
                      {service.title}
                    </CardTitle>
                    
                    <p className="text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-300 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Decorative gradient line */}
                    <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${service.gradient} rounded-full transition-all duration-700`} />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}




