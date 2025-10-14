"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "framer-motion";

export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-black via-[#0a0a0f] to-black overflow-hidden"
    >
      {/* Fondo minimalista con gradiente sutil */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fortune-electric/10 rounded-full blur-[100px]"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Icon badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-fortune-green to-fortune-electric mb-8 shadow-2xl shadow-fortune-green/50"
            >
              <Sparkles className="w-10 h-10 text-fortune-black" />
            </motion.div>

            {/* Headline */}
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-white">
              Invierte desde hoy, empieza con solo $500
            </h2>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Haz crecer tu futuro financiero con la plataforma de inversión más innovadora.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/auth/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-5 bg-gradient-to-r from-fortune-green to-fortune-electric rounded-2xl text-fortune-black font-bold text-lg shadow-2xl shadow-fortune-green/50 hover:shadow-fortune-green/70 transition-all overflow-hidden"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  
                  <span className="relative flex items-center gap-2">
                    Unirme a Fortune Global
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>

              <Link href="#markets">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 glass-morphism-strong rounded-2xl text-white font-semibold text-lg border-2 border-fortune-green/30 hover:border-fortune-green transition-all"
                >
                  Explorar Mercados
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Shield,
                title: "100% Seguro",
                description: "Tecnología de encriptación bancaria",
                color: "fortune-green",
              },
              {
                icon: TrendingUp,
                title: "Desde $500",
                description: "Comienza con inversión mínima",
                color: "fortune-electric",
              },
              {
                icon: Sparkles,
                title: "Sin comisiones ocultas",
                description: "Transparencia total en cada operación",
                color: "fortune-electric-purple",
              },
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="glass-morphism rounded-2xl p-6 hover-lift group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                    index === 0 ? 'from-fortune-green/20 to-fortune-green/5' :
                    index === 1 ? 'from-fortune-electric/20 to-fortune-electric/5' :
                    'from-fortune-electric-purple/20 to-fortune-electric-purple/5'
                  } flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <badge.icon className={`w-6 h-6 ${
                      index === 0 ? 'text-fortune-green' :
                      index === 1 ? 'text-fortune-electric' :
                      'text-fortune-electric-purple'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">
                      {badge.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {badge.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Final trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <p className="text-gray-500 text-sm">
              Más de <span className="text-fortune-green font-semibold">50,000 inversores</span> ya confían en Fortune Global
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fortune-green to-transparent opacity-50" />
    </section>
  );
}


