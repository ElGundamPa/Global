"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrendingUp, Sparkles, Zap } from "lucide-react";

export function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-[#0a0a0f] to-black pt-16">
      {/* Video de fondo - más visible */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-40"
        >
          <source src="/videos/financial-investment-01308-2025-08-29-11-46-53-utc.mp4" type="video/mp4" />
        </video>
        {/* Overlay con gradiente de colores de marca */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-tr from-fortune-green/10 via-transparent to-fortune-electric/10" />
      </div>

      {/* Efectos de fondo animados mejorados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradiente principal verde brillante */}
        <motion.div
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-fortune-green/30 to-fortune-electric/20 rounded-full blur-[100px]"
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Gradiente secundario azul eléctrico */}
        <motion.div
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-fortune-electric/30 to-fortune-electric-purple/20 rounded-full blur-[100px]"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Partículas flotantes animadas */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-fortune-green/40 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Líneas decorativas animadas */}
        <motion.div
          className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fortune-green/30 to-transparent"
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-6 py-20 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge animado mejorado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-block"
          >
            <motion.div 
              className="relative bg-gradient-to-r from-fortune-green/10 to-fortune-electric/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-fortune-green/30 inline-flex items-center gap-2 shadow-lg shadow-fortune-green/10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="w-2 h-2 bg-fortune-green rounded-full shadow-lg shadow-fortune-green/50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-white text-xs font-semibold bg-gradient-to-r from-fortune-green to-fortune-electric bg-clip-text text-transparent">
                Plataforma de inversión más confiable
              </span>
            </motion.div>
          </motion.div>

          {/* Título principal con gradiente */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight"
          >
            <span className="text-white">Tu App de inversión </span>
            <span className="bg-gradient-to-r from-fortune-green via-fortune-electric to-fortune-electric-purple bg-clip-text text-transparent animate-gradient-shift">
              impulsada por IA
            </span>
            <br />
            <span className="text-white">ahora con alcance </span>
            <span className="bg-gradient-to-r from-fortune-electric to-fortune-green bg-clip-text text-transparent">
              mundial.
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Invertir ya no tiene fronteras: unificamos mercados globales e IA en una sola app.
            <br />
            Únete a la evolución financiera hecha para todos.
          </motion.p>

          {/* CTAs mejorados */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/auth/signup">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button 
                  size="lg" 
                  className="relative bg-gradient-to-r from-fortune-green to-fortune-electric hover:shadow-2xl hover:shadow-fortune-green/50 text-black font-bold px-8 py-6 text-base rounded-xl transition-all overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Comenzar Ahora
                    <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* Efecto de brillo al hover */}
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>
            </Link>
            
            <Link href="#services">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="relative border-2 border-fortune-electric/50 text-white hover:bg-fortune-electric/10 hover:border-fortune-electric px-8 py-6 text-base rounded-xl backdrop-blur-md transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Descargar App
                  </span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
