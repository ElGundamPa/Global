"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  ArrowUp,
  TrendingUp
} from "lucide-react";

const footerLinks = {
  platform: [
    { label: "Trading", href: "/trading" },
    { label: "Mercados", href: "/markets" },
    { label: "Portafolio", href: "/portfolio" },
    { label: "Academia", href: "/academy" },
  ],
  company: [
    { label: "Sobre Nosotros", href: "/about" },
    { label: "Equipo", href: "/team" },
    { label: "Carreras", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  resources: [
    { label: "Ayuda & Soporte", href: "/support" },
    { label: "Centro de Aprendizaje", href: "/learn" },
    { label: "API", href: "/api" },
    { label: "Estado del Sistema", href: "/status" },
  ],
  legal: [
    { label: "Términos de Servicio", href: "/terms" },
    { label: "Privacidad", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
    { label: "Licencias", href: "/licenses" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/fortuneglobal", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/fortuneglobal", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/fortuneglobal", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@fortuneglobal", label: "YouTube" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-fortune-black to-fortune-blue-darker overflow-hidden">
      {/* Gradiente animado superior */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-fortune-green to-transparent"
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-fortune-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fortune-electric/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main footer content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fortune-green to-fortune-electric flex items-center justify-center shadow-lg shadow-fortune-green/50 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-fortune-black" />
                </div>
                <span className="text-2xl font-bold text-gradient-green">
                  Fortune Global
                </span>
              </Link>

              <p className="text-gray-400 mb-6 leading-relaxed">
                La plataforma de inversión más innovadora. Tecnología de punta, 
                seguridad garantizada y educación financiera de clase mundial.
              </p>

              {/* Contact info */}
              <div className="space-y-3">
                <a 
                  href="mailto:hola@fortuneglobal.com" 
                  className="flex items-center gap-3 text-gray-400 hover:text-fortune-green transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-fortune-green/10 flex items-center justify-center group-hover:bg-fortune-green/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">hola@fortuneglobal.com</span>
                </a>

                <a 
                  href="tel:+1234567890" 
                  className="flex items-center gap-3 text-gray-400 hover:text-fortune-green transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-fortune-green/10 flex items-center justify-center group-hover:bg-fortune-green/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+1 (234) 567-890</span>
                </a>

                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-8 h-8 rounded-lg bg-fortune-green/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Global HQ, Silicon Valley</span>
                </div>
              </div>
            </div>

            {/* Links columns */}
            <div>
              <h3 className="font-bold text-white mb-4">Plataforma</h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-fortune-green transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Compañía</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-fortune-green transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Recursos</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-fortune-green transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-fortune-green transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4 mb-12">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-12 h-12 rounded-xl glass-morphism flex items-center justify-center hover:bg-fortune-green/20 transition-colors group"
              >
                <social.icon className="w-5 h-5 text-gray-400 group-hover:text-fortune-green transition-colors" />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8" />

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm mb-2">
                © {new Date().getFullYear()} Fortune Global. Todos los derechos reservados.
              </p>
              <p className="text-gray-600 text-xs max-w-2xl">
                <strong>Advertencia de riesgo:</strong> Las inversiones conllevan riesgos. 
                El valor de tus inversiones puede subir o bajar. Fortune Global no garantiza rendimientos.
              </p>
            </div>

            {/* Scroll to top button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 glass-morphism rounded-xl flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-fortune-green transition-colors group"
            >
              Volver arriba
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom gradient glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1">
        <motion.div
          className="h-full bg-gradient-to-r from-fortune-green via-fortune-electric to-fortune-electric-purple opacity-20"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 100%",
          }}
        />
      </div>
    </footer>
  );
}
