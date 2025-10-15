"use client";

import { motion } from "framer-motion";
import { 
  Wrench, 
  TrendingUp, 
  Shield, 
  ArrowDownToLine, 
  Megaphone, 
  ArrowUpFromLine, 
  DollarSign, 
  X, 
  Phone,
  FileCheck
} from "lucide-react";

const supportDepartments = [
  {
    id: "technical",
    title: "Soporte Técnico",
    description: "Resolución de problemas técnicos relacionados con la plataforma y las aplicaciones de Fortune Global.",
    icon: Wrench,
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400"
  },
  {
    id: "investment-plans",
    title: "Gestión de Planes de Inversión",
    description: "Modificaciones, cancelaciones y consultas específicas sobre los planes de inversión existentes.",
    icon: TrendingUp,
    color: "from-fortune-green/20 to-fortune-electric/20",
    borderColor: "border-fortune-green/30",
    iconColor: "text-fortune-green"
  },
  {
    id: "legal",
    title: "Departamento Legal",
    description: "Consultas legales, términos y condiciones, y políticas de privacidad.",
    icon: Shield,
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400"
  },
  {
    id: "withdrawals",
    title: "Departamento de Retiros",
    description: "Manejo de solicitudes de retiro, verificación y procesamiento de pagos.",
    icon: ArrowDownToLine,
    color: "from-red-500/20 to-red-600/20",
    borderColor: "border-red-500/30",
    iconColor: "text-red-400"
  },
  {
    id: "marketing",
    title: "Departamento de Marketing",
    description: "Consultas relacionadas con colaboraciones, eventos, patrocinios, entrevistas, prensa, y más.",
    icon: Megaphone,
    color: "from-pink-500/20 to-pink-600/20",
    borderColor: "border-pink-500/30",
    iconColor: "text-pink-400"
  },
  {
    id: "investments",
    title: "Departamento de Inversiones",
    description: "Asesoramiento en la selección de productos de inversión, renta fija y renta variable.",
    icon: TrendingUp,
    color: "from-green-500/20 to-emerald-600/20",
    borderColor: "border-green-500/30",
    iconColor: "text-green-400"
  },
  {
    id: "deposits",
    title: "Departamento de Depósitos",
    description: "Manejo de todas las transacciones de depósito, verificación de fondos y acreditación en las respectivas billeteras de los usuarios.",
    icon: ArrowUpFromLine,
    color: "from-yellow-500/20 to-yellow-600/20",
    borderColor: "border-yellow-500/30",
    iconColor: "text-yellow-400"
  },
  {
    id: "cancellation",
    title: "Departamento de Cancelación de Inversiones",
    description: "Asistencia en la Cancelación y Modificación de Planes de Inversión.",
    icon: X,
    color: "from-orange-500/20 to-orange-600/20",
    borderColor: "border-orange-500/30",
    iconColor: "text-orange-400"
  },
  {
    id: "customer-service",
    title: "Atención al Cliente",
    description: "Asistencia general, resolución de dudas, atención a consultas no técnicas y borrado de la cuenta.",
    icon: Phone,
    color: "from-cyan-500/20 to-cyan-600/20",
    borderColor: "border-cyan-500/30",
    iconColor: "text-cyan-400"
  }
];

export default function SoportePage() {
  return (
    <main className="flex-1 overflow-y-auto p-8 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Soporte</h1>
              <h2 className="text-xl font-semibold text-white/90 mb-2">
                Selecciona cuidadosamente el departamento de Soporte
              </h2>
              <p className="text-gray-400 text-sm max-w-3xl">
                Para resolver tus inquietudes de manera rápida y efectiva, te recomendamos seleccionar el 
                departamento que mejor se ajuste a tu necesidad. Así, podrás disfrutar de una experiencia de 
                soporte al cliente de primera clase.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-lg hover:bg-white/10 transition-all"
            >
              <FileCheck className="w-4 h-4" />
              Ver tickets creados
            </motion.button>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportDepartments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0, 255, 135, 0.15)"
                }}
                className={`relative bg-gradient-to-br ${dept.color} border ${dept.borderColor} rounded-xl p-6 shadow-lg cursor-pointer group overflow-hidden`}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4">
                    <Icon className={`w-10 h-10 ${dept.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg font-bold ${dept.iconColor} mb-3`}>
                    {dept.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-8 h-8 border ${dept.borderColor} rounded flex items-center justify-center`}>
                    <svg className={`w-4 h-4 ${dept.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            ¿No encuentras el departamento que necesitas?{" "}
            <button className="text-fortune-green hover:text-fortune-electric transition-colors font-semibold">
              Contáctanos directamente
            </button>
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
