"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useInView } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "Emprendedor",
    country: "México",
    avatar: "CM",
    rating: 5,
    text: "Fortune Global transformó mi forma de ver las inversiones. Comencé con solo $500 y en 6 meses he duplicado mi capital. La plataforma es intuitiva y el soporte es excepcional.",
    investment: "$12,500",
    return: "+127%",
  },
  {
    id: 2,
    name: "María González",
    role: "Diseñadora Freelance",
    country: "España",
    avatar: "MG",
    rating: 5,
    text: "Nunca pensé que invertir pudiera ser tan simple. La IA me recomienda las mejores oportunidades y puedo ver mi dinero crecer en tiempo real. ¡Totalmente recomendado!",
    investment: "$8,200",
    return: "+95%",
  },
  {
    id: 3,
    name: "Andrés Silva",
    role: "Ingeniero de Software",
    country: "Argentina",
    avatar: "AS",
    rating: 5,
    text: "La tecnología detrás de Fortune Global es impresionante. Datos en tiempo real, análisis predictivos y una interfaz que cualquiera puede usar. Es el futuro de las inversiones.",
    investment: "$25,000",
    return: "+142%",
  },
  {
    id: 4,
    name: "Laura Ramírez",
    role: "Profesora Universitaria",
    country: "Colombia",
    avatar: "LR",
    rating: 5,
    text: "Siempre quise invertir pero me intimidaba. Fortune Global me enseñó paso a paso y ahora tengo un portafolio diversificado. La mejor decisión financiera que he tomado.",
    investment: "$6,800",
    return: "+89%",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative py-24 md:py-32 bg-gradient-to-b from-fortune-black via-fortune-blue-darker to-fortune-black overflow-hidden"
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fortune-green/5 rounded-full blur-3xl" />
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
            Lo que dicen nuestros inversores
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Miles de personas ya han transformado su futuro financiero con Fortune Global.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto relative">
          <div className="relative h-[500px] md:h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <div className="glass-morphism-strong rounded-3xl p-8 md:p-12 h-full relative overflow-hidden">
                  {/* Decorative quote icon */}
                  <div className="absolute top-8 left-8 opacity-10">
                    <Quote className="w-24 h-24 text-fortune-green" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start h-full">
                    {/* Avatar section */}
                    <div className="flex-shrink-0 text-center md:text-left">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-24 h-24 rounded-2xl bg-gradient-to-br from-fortune-green to-fortune-electric flex items-center justify-center text-3xl font-bold text-fortune-black mb-4 mx-auto md:mx-0 shadow-lg shadow-fortune-green/50"
                      >
                        {testimonials[currentIndex].avatar}
                      </motion.div>
                      
                      {/* Stats */}
                      <div className="flex gap-4 justify-center md:justify-start mt-6">
                        <div className="text-center">
                          <div className="text-sm text-gray-400 mb-1">Inversión</div>
                          <div className="text-lg font-bold text-fortune-green">
                            {testimonials[currentIndex].investment}
                          </div>
                        </div>
                        <div className="w-px bg-gray-700" />
                        <div className="text-center">
                          <div className="text-sm text-gray-400 mb-1">Retorno</div>
                          <div className="text-lg font-bold text-fortune-electric">
                            {testimonials[currentIndex].return}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Testimonial content */}
                    <div className="flex-1">
                      {/* Stars */}
                      <div className="flex gap-1 mb-4 justify-center md:justify-start">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-fortune-green text-fortune-green"
                          />
                        ))}
                      </div>

                      {/* Text */}
                      <blockquote className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed italic">
                        "{testimonials[currentIndex].text}"
                      </blockquote>

                      {/* Author info */}
                      <div className="text-center md:text-left">
                        <div className="font-bold text-white text-lg">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-gray-400">
                          {testimonials[currentIndex].role} • {testimonials[currentIndex].country}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gradient decoration */}
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-fortune-green/10 to-transparent rounded-tl-full" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="w-12 h-12 rounded-full glass-morphism flex items-center justify-center hover:bg-fortune-green/20 transition-colors group"
            >
              <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-fortune-green transition-colors" />
            </motion.button>

            {/* Dots indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-gradient-to-r from-fortune-green to-fortune-electric"
                      : "w-2 bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="w-12 h-12 rounded-full glass-morphism flex items-center justify-center hover:bg-fortune-green/20 transition-colors group"
            >
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-fortune-green transition-colors" />
            </motion.button>
          </div>
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: "50,000+", label: "Inversores satisfechos" },
            { value: "4.9/5", label: "Calificación promedio" },
            { value: "$500M+", label: "Volumen invertido" },
            { value: "98%", label: "Tasa de satisfacción" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-gradient-green mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
