# Páginas del Dashboard - Fortune Global

## 📋 Resumen

Se han creado 4 nuevas páginas para el dashboard del usuario, completando la funcionalidad completa del sidebar. Todas las páginas mantienen coherencia visual con el diseño existente y utilizan animaciones fluidas con Framer Motion.

---

## 🗂️ Páginas Implementadas

### 1. 📊 **Portafolio** (`/dashboard/portfolio`)

**Descripción:** Vista completa del portafolio de inversiones del usuario con estadísticas detalladas.

**Características:**
- **Tarjetas de Resumen:**
  - Valor Total del Portafolio
  - Total Invertido
  - Ganancia/Pérdida (con indicador visual)
  - Cantidad de Activos

- **Distribución del Portafolio:**
  - Gráfico de barras animado mostrando:
    - Porcentaje en Acciones
    - Porcentaje en Criptomonedas
    - Porcentaje en Divisas
  - Colores diferenciados por tipo de activo

- **Tabla de Activos:**
  - Lista completa de todos los activos en el portafolio
  - Información por activo:
    - Símbolo y nombre
    - Cantidad de unidades
    - Precio de compra
    - Precio actual
    - Valor total
    - Ganancia/Pérdida ($ y %)
  - Enlace a la página de detalle de cada activo
  - Estado vacío con CTA para explorar activos

**Datos:**
- Lee del localStorage usando `getPortfolio()`
- Calcula valores en tiempo real con `calculatePortfolioValue()`
- Integración con datos de `assets-data.ts` y `mock-data.ts`

---

### 2. 🏆 **Emblemas** (`/dashboard/badges`)

**Descripción:** Sistema de logros y badges para gamificar la experiencia de inversión.

**Características:**
- **Estadísticas de Emblemas:**
  - Total de emblemas disponibles
  - Emblemas desbloqueados
  - Emblemas bloqueados
  - Progreso general (%)

- **Barra de Progreso Global:**
  - Animada al cargar
  - Muestra progreso visual del usuario

- **Filtros:**
  - Por Categoría: Trading, Portafolio, Aprendizaje, Social, Especial
  - Por Rareza: Común, Raro, Épico, Legendario

- **Grid de Emblemas:**
  - Diseño responsive (1-4 columnas según pantalla)
  - Cada emblema muestra:
    - Icono emoji
    - Nombre y descripción
    - Badge de rareza con colores únicos
    - Estado: desbloqueado o bloqueado
    - Barra de progreso para emblemas bloqueados
    - Fecha de desbloqueo para emblemas conseguidos
  - Efecto de overlay blur en emblemas bloqueados
  - Animación de brillo en emblemas desbloqueados

**Sistema de Emblemas:**
- **16 emblemas diferentes** en 4 categorías
- Emblemas de Trading:
  - Primera Transacción (1 transacción)
  - Trader Activo (10 transacciones)
  - Trader Experimentado (50 transacciones)
  - Maestro del Trading (100 transacciones)
  - Manos de Diamante (mantener activo 30+ días)

- Emblemas de Portafolio:
  - Diversificación Básica (5 activos diferentes)
  - Portafolio Diversificado (10 activos diferentes)
  - Rey de las Criptos (5 criptomonedas diferentes)
  - Maestro de Acciones (5 acciones diferentes)
  - Inversor Novato ($1,000)
  - Inversor Serio ($10,000)
  - Inversor Profesional ($50,000)
  - Ballena Inversora ($100,000)
  - Maestro de Ganancias (+20% ganancia)

- Emblemas Especiales:
  - Madrugador (operar 6am-9am)
  - Ave Nocturna (operar 8pm-12am)

**Datos:**
- Sistema completo en `src/lib/badges.ts`
- Persistencia en localStorage
- Función `checkBadgeProgress()` para actualización automática

---

### 3. 📜 **Historial** (`/dashboard/history`)

**Descripción:** Registro completo de todas las transacciones realizadas por el usuario.

**Características:**
- **Tarjetas de Estadísticas:**
  - Total de Transacciones
  - Total de Compras
  - Total de Ventas
  - Monto Total Operado

- **Filtros y Búsqueda:**
  - Barra de búsqueda por símbolo o nombre
  - Filtro por tipo: Todas / Solo Compras / Solo Ventas

- **Lista de Transacciones:**
  - Ordenadas cronológicamente (más recientes primero)
  - Cada transacción muestra:
    - Icono indicador (↑ compra / ↓ venta)
    - Símbolo y nombre del activo
    - Badge del tipo de operación
    - Fecha y hora completa (formato español)
    - Cantidad de unidades
    - Precio por unidad
    - Monto total
    - Estado (Completada/Pendiente)
  - Colores diferenciados:
    - Verde para compras
    - Rojo para ventas
  - Animación de entrada escalonada
  - Estado vacío cuando no hay transacciones

**Datos:**
- Sistema de transacciones en `src/lib/transactions.ts`
- Integración automática con compras desde páginas de activos
- Persistencia en localStorage
- Formato de fecha con `date-fns` (localización española)

---

### 4. 📡 **Trading en Vivo** (`/dashboard/trading`)

**Descripción:** Vista de mercado en tiempo real con actualizaciones automáticas de precios.

**Características:**
- **Indicador EN VIVO:**
  - Badge rojo pulsante con animación
  - Punto rojo animado simulando transmisión en vivo
  - Toggle para activar/desactivar actualizaciones automáticas

- **Estadísticas del Mercado:**
  - Estado del Mercado (ABIERTO/CERRADO)
  - Activos Activos disponibles para operar
  - Cantidad de activos En Alza
  - Cantidad de activos En Baja

- **Última Actualización:**
  - Timestamp en tiempo real
  - Icono animado giratorio
  - Se actualiza cada 3 segundos

- **Secciones de Activos:**
  - **Acciones** (Stocks)
  - **Criptomonedas** (Crypto)
  - **Divisas** (Forex)

- **Tarjetas de Activos:**
  - Avatar con iniciales del símbolo
  - Nombre y símbolo
  - Precio actual (con animación de cambio)
  - Cambio en 24h ($ y %)
  - Indicador visual de dirección (↑/↓)
  - Botón "Operar" para ir a página de detalle
  - Animación de color al cambiar precio:
    - Verde al subir
    - Rojo al bajar
    - Transición suave a neutral

- **Actualizaciones en Tiempo Real:**
  - Los precios se actualizan cada 3 segundos
  - Animación de escala y color en cada cambio
  - Simulación realista de volatilidad del mercado
  - Toggle para pausar/reanudar actualizaciones

**Datos:**
- Usa `getAllAssets()` de `mock-data.ts`
- Función `generatePriceUpdate()` para simular cambios de precio
- Actualización automática con `setInterval`
- Tracking de dirección de cambio para animaciones

---

## 🗃️ Archivos Auxiliares Creados

### `src/lib/transactions.ts`
Sistema completo para gestión de transacciones:
- Interface `Transaction`
- Funciones:
  - `getTransactions()` - Obtener todas las transacciones
  - `addTransaction()` - Agregar nueva transacción
  - `getTransactionsByAsset()` - Filtrar por activo
  - `getTransactionsByType()` - Filtrar por tipo (buy/sell)
  - `getTotalInvested()` - Calcular total invertido
  - `getTransactionStats()` - Obtener estadísticas
  - `clearTransactions()` - Limpiar historial

### `src/lib/badges.ts`
Sistema completo de emblemas y logros:
- Interface `Badge`
- 16 emblemas predefinidos con:
  - Nombre y descripción
  - Icono emoji
  - Categoría (trading, portfolio, learning, social, special)
  - Rareza (common, rare, epic, legendary)
  - Requisitos y progreso
  - Color único por rareza
- Funciones:
  - `getBadges()` - Obtener todos los emblemas
  - `updateBadgeProgress()` - Actualizar progreso
  - `unlockBadge()` - Desbloquear emblema
  - `getUnlockedBadges()` - Obtener desbloqueados
  - `getBadgesByCategory()` - Filtrar por categoría
  - `getBadgeStats()` - Estadísticas generales
  - `checkBadgeProgress()` - Verificación automática de logros

### Actualización de `src/lib/portfolio.ts`
- Función `buyAsset()` agregada:
  - Compra un activo y lo agrega al portafolio
  - Registra automáticamente la transacción
  - Manejo de errores robusto
- Función `determineAssetType()` para clasificar activos

---

## 🎨 Componentes UI Creados

### `src/components/ui/dialog.tsx`
Componente modal personalizado:
- Backdrop con blur
- Animaciones de entrada/salida con Framer Motion
- Cierre con ESC o clic fuera
- Subcomponentes:
  - `Dialog` - Contenedor principal
  - `DialogContent` - Contenido
  - `DialogHeader` - Encabezado
  - `DialogTitle` - Título
  - `DialogDescription` - Descripción

### `src/components/ui/tabs.tsx`
Componente de pestañas personalizado:
- Animación de indicador activo
- Context API para manejo de estado
- Transiciones suaves entre pestañas
- Subcomponentes:
  - `Tabs` - Contenedor principal
  - `TabsList` - Lista de pestañas
  - `TabsTrigger` - Botón de pestaña
  - `TabsContent` - Contenido de pestaña

---

## 🎯 Coherencia de Diseño

Todas las páginas mantienen:
- **Paleta de colores:**
  - Fortune Green: `#00FF87`
  - Fortune Electric: `#00D9FF`
  - Fondos oscuros: `#0a0a0f` y `black`
  - Bordes sutiles: `border-white/5` y `border-white/10`

- **Animaciones:**
  - Entrada con `opacity` y `y` offset
  - Delays escalonados para listas
  - Hover effects suaves
  - Transiciones de 300-500ms
  - Spring animations donde aplique

- **Tipografía:**
  - Títulos: `text-4xl font-bold`
  - Subtítulos: `text-xl font-bold`
  - Texto normal: `text-sm` o `text-base`
  - Colores: `text-white`, `text-gray-400`, `text-gray-500`

- **Cards y Containers:**
  - Fondo: `bg-[#0a0a0f]`
  - Bordes: `border border-white/10`
  - Rounded: `rounded-xl`
  - Padding: `p-6`
  - Shadow: `shadow-lg shadow-white/5`

- **Estados Vacíos:**
  - Icono grande centrado
  - Mensaje descriptivo
  - CTA cuando aplique

---

## 🔗 Integración

Todas las páginas están:
1. **Enlazadas en el sidebar** (`src/components/dashboard/sidebar.tsx`)
2. **Conectadas con LocalStorage** para persistencia de datos
3. **Integradas con el sistema de activos** existente
4. **Preparadas para expansión futura** (APIs reales, WebSockets, etc.)

---

## 🚀 Funcionalidad Completa

El dashboard ahora incluye:
- ✅ Panel principal
- ✅ Compra de activos
- ✅ Vista de detalle de activos (con gráficas interactivas)
- ✅ **Portafolio** (nuevo)
- ✅ **Emblemas** (nuevo)
- ✅ **Historial** (nuevo)
- ✅ **Trading en vivo** (nuevo)
- ✅ Información personal
- ✅ Soporte
- ✅ Retiro
- ✅ Depósito

---

## 📱 Responsive Design

Todas las páginas son completamente responsive:
- **Mobile:** 1 columna, stacking vertical
- **Tablet:** 2 columnas en grids
- **Desktop:** 3-4 columnas según la sección
- Breakpoints: `md:`, `lg:`, `xl:`

---

## 🎮 Interactividad

Las páginas incluyen:
- Hover effects en todos los elementos interactivos
- Animaciones de feedback al hacer clic
- Estados de carga simulados
- Transiciones suaves entre páginas
- Efectos visuales de precios en tiempo real
- Sistema de progreso y logros gamificado

---

## 💾 Datos y Persistencia

- **LocalStorage keys:**
  - `fortune_portfolio` - Portafolio del usuario
  - `fortune_transactions` - Historial de transacciones
  - `fortune_badges` - Emblemas y progreso

- **Inicialización automática:**
  - Badges se inicializan automáticamente
  - Portfolio y transacciones empiezan vacíos
  - Datos persisten entre sesiones

---

## 🎨 Animaciones Destacadas

1. **Portafolio:**
   - Barras de progreso animadas con delay
   - Entrada escalonada de filas de tabla

2. **Emblemas:**
   - Efecto de brillo en badges desbloqueados
   - Blur overlay en badges bloqueados
   - Scale animation en hover

3. **Historial:**
   - Entrada lateral de transacciones
   - Colores diferenciados por tipo

4. **Trading en Vivo:**
   - Cambio de precio con escala y color
   - Badge pulsante "EN VIVO"
   - Timestamp actualizado continuamente
   - Toggle animado para pausar/reanudar

---

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** - App Router
- **React 18** - Hooks y componentes cliente
- **TypeScript** - Type safety completo
- **Framer Motion** - Animaciones fluidas
- **Tailwind CSS** - Estilos utilitarios
- **Lucide React** - Iconografía
- **date-fns** - Manejo de fechas (localización ES)
- **LocalStorage** - Persistencia de datos
- **Recharts** - Gráficas interactivas (en página de activos)

---

## 📝 Notas Finales

- Todas las páginas usan "use client" ya que requieren interactividad
- Los datos son simulados pero la estructura está lista para APIs reales
- El sistema de badges puede expandirse agregando más logros
- El trading en vivo puede conectarse a WebSockets para datos reales
- Todos los componentes son reutilizables y modulares

---

✨ **Las 4 páginas del sidebar están completamente implementadas y listas para usar.**

