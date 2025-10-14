# 🌟 Fortune Global

**Plataforma de trading, inversiones y educación financiera de clase mundial**

> *"Invierte con visión, crece con propósito."*

---

## 📋 Descripción

Fortune Global es una plataforma web moderna diseñada para democratizar el acceso a los mercados financieros. Combina educación financiera de calidad, análisis en tiempo real y herramientas profesionales de trading en una experiencia de usuario excepcional.

## ✨ Características Principales

### Landing Page Pública
- ✅ **Hero Section** - Impacto visual inmediato con animaciones fluidas
- ✅ **Sobre Nosotros** - Tres pilares fundamentales: Transparencia, Tecnología y Comunidad
- ✅ **Servicios** - Academia de Trading, Análisis de Mercados, Inversión Inteligente y Consultoría
- ✅ **Testimonios** - Carrusel automático con experiencias reales
- ✅ **CTA Section** - Llamados a la acción estratégicos
- ✅ **Footer** - Información completa con enlaces y redes sociales

### Autenticación
- ✅ **Login** - Página de inicio de sesión con diseño glassmorphism
- ✅ **Registro** - Formulario completo de creación de cuenta
- 🔄 **Dashboard** - En desarrollo (próximamente)

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Componentes UI:** Radix UI
- **Gráficos:** Recharts (preparado)
- **Estado:** Zustand (preparado)
- **Iconos:** Lucide React

## 🎨 Principios de Diseño UX/UI

Esta plataforma fue construida siguiendo las mejores prácticas de diseño:

- **Hick's Law:** Opciones simplificadas y CTAs claros
- **Fitts' Law:** Elementos interactivos grandes y accesibles
- **Miller's Law:** Información organizada en chunks digestibles
- **Jakob's Law:** Patrones familiares de plataformas financieras conocidas
- **Ley de Proximidad:** Información relacionada agrupada lógicamente
- **Efecto Von Restorff:** CTAs destacados con colores contrastantes

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 18.x o superior
- npm o yarn

### Instalación

```bash
# Clonar el repositorio (si aplica)
git clone [url-del-repo]

# Navegar al directorio
cd fortune-global

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Scripts Disponibles

```bash
npm run dev      # Modo desarrollo
npm run build    # Compilar para producción
npm run start    # Iniciar en producción
npm run lint     # Verificar código
```

## 📁 Estructura del Proyecto

```
fortune-global/
├── src/
│   ├── app/                      # App Router de Next.js
│   │   ├── auth/                 # Páginas de autenticación
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── dashboard/            # Dashboard (en desarrollo)
│   │   ├── layout.tsx            # Layout principal
│   │   ├── page.tsx              # Landing page
│   │   └── globals.css           # Estilos globales
│   │
│   ├── components/
│   │   ├── landing/              # Componentes de la landing
│   │   │   ├── hero.tsx
│   │   │   ├── about.tsx
│   │   │   ├── services.tsx
│   │   │   ├── testimonials.tsx
│   │   │   ├── cta-section.tsx
│   │   │   └── footer.tsx
│   │   ├── ui/                   # Componentes reutilizables
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── container.tsx
│   │   └── theme-provider.tsx
│   │
│   ├── lib/
│   │   ├── mock-data.ts          # Datos simulados
│   │   └── utils.ts              # Utilidades
│   │
│   └── types/
│       └── index.ts              # Definiciones TypeScript
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎯 Próximas Características

### Dashboard (En Desarrollo)
- [ ] Sidebar de navegación
- [ ] Panel principal con métricas
- [ ] Vista de mercados (Stocks, Crypto, Forex)
- [ ] Gestión de portafolio
- [ ] Feed de noticias financieras
- [ ] Configuración de cuenta
- [ ] Gráficos interactivos en tiempo real

### Funcionalidades Adicionales
- [ ] Sistema de autenticación real
- [ ] Integración con APIs de mercados
- [ ] Notificaciones en tiempo real
- [ ] Modo oscuro/claro (toggle)
- [ ] Internacionalización (i18n)
- [ ] Progressive Web App (PWA)

## 🎨 Paleta de Colores

- **Fondo Principal:** `#0b0b0f` (Negro profundo)
- **Fondo Secundario:** `#1c1c1f` (Gris carbón)
- **Acento Primario:** Gradiente dorado (`from-amber-500 to-amber-700`)
- **Acento Secundario:** Azul eléctrico
- **Texto Principal:** Blanco
- **Texto Secundario:** Grises (400, 500)

## 📱 Responsive Design

La plataforma está optimizada para:
- 📱 Móviles (< 640px)
- 📱 Tablets (640px - 1024px)
- 💻 Desktop (> 1024px)

## 🔒 Advertencia de Riesgo

El trading de instrumentos financieros conlleva un alto nivel de riesgo y puede no ser adecuado para todos los inversores. Esta plataforma proporciona información educativa y no constituye asesoramiento financiero personalizado.

## 📄 Licencia

Este proyecto es privado y confidencial.

## 👥 Contacto

- **Email:** contacto@fortuneglobal.com
- **Ubicación:** Ciudad de México, México

---

**Desarrollado con ❤️ para democratizar el acceso a los mercados financieros**
