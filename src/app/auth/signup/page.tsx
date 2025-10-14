"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Mail, Lock, User, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUser, isAuthenticated } from "@/lib/auth";

/**
 * Signup Page - New user registration
 * Clean, minimal design with glassmorphism
 */
export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    // Register user
    const result = registerUser(formData.name, formData.email, formData.password);
    
    if (result.success) {
      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0f] to-black relative overflow-hidden flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-fortune-green/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fortune-electric/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <Container className="relative z-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-fortune-green transition-colors duration-300 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>

          <div className="max-w-md mx-auto">
            {/* Logo */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-fortune-green to-fortune-electric rounded-2xl flex items-center justify-center shadow-2xl shadow-fortune-green/50">
                <TrendingUp className="w-8 h-8 text-black" />
              </div>
            </motion.div>

            <Card className="backdrop-blur-xl bg-white/5 border-fortune-green/20 shadow-xl shadow-fortune-green/5">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-white font-bold">
                  Únete a Fortune Global
                </CardTitle>
                <CardDescription className="text-gray-400 mt-2">
                  Crea tu cuenta y comienza a invertir hoy
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">
                      Nombre completo
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-fortune-green transition-colors" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Juan Pérez"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all duration-300"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Correo electrónico
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-fortune-green transition-colors" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all duration-300"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-300">
                      Contraseña
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-fortune-green transition-colors" />
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all duration-300"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Confirm Password field */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                      Confirmar contraseña
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-fortune-green transition-colors" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all duration-300"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Terms and conditions */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-fortune-green focus:ring-fortune-green/20"
                      required
                      disabled={loading}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-400">
                      Acepto los{" "}
                      <Link href="#" className="text-fortune-green hover:text-fortune-electric transition-colors">
                        términos y condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link href="#" className="text-fortune-green hover:text-fortune-electric transition-colors">
                        política de privacidad
                      </Link>
                    </label>
                  </div>

                  {/* Submit button */}
                  <motion.div whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-fortune-green to-fortune-electric hover:shadow-xl hover:shadow-fortune-green/50 text-black font-semibold shadow-lg shadow-fortune-green/30 py-6 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Creando cuenta..." : "Crear cuenta"}
                    </Button>
                  </motion.div>

                  {/* Divider */}
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-[#0b0b0f] text-gray-400">
                        ¿Ya tienes cuenta?
                      </span>
                    </div>
                  </div>

                  {/* Login link */}
                  <Link href="/auth/login">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-fortune-green/30 text-white hover:bg-fortune-green/10 hover:border-fortune-green/50 transition-all duration-300"
                      >
                        Iniciar sesión
                      </Button>
                    </motion.div>
                  </Link>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}

