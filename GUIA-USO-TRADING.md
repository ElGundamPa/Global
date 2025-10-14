# 🚀 Guía Rápida de Uso - Trading en Vivo

## 🎯 Inicio Rápido

### 1. **Balance Inicial**
Al iniciar sesión por primera vez, cada usuario tiene:
- **$10,000** de balance inicial
- Balance disponible visible en el sidebar y dashboard

### 2. **Ver Balance y Estadísticas**
En el **Dashboard principal** (`/dashboard`):
- 3 cards con estadísticas globales en la parte superior
- **Card 1:** Valor total del portafolio + gráfico de rendimiento
- **Card 2:** Balance disponible + estadísticas
- **Card 3:** Top 3 activos más rentables

### 3. **Ir a Trading en Vivo**
- Click en **"Trading en vivo"** en el sidebar (con punto rojo)
- URL: `/dashboard/trading`
- Verás:
  - Balance disponible en el header
  - Lista de todos los activos (Acciones, Criptos, Divisas)
  - Precios actualizándose cada 3 segundos
  - Badge "EN VIVO" pulsante

---

## 💰 Cómo Comprar un Activo

### Paso a Paso:

1. **Selecciona un activo**
   - Busca el activo que quieres comprar
   - Click en el botón **"Operar"** (verde)

2. **Se abre el modal de trading**
   - Izquierda: Gráfico interactivo en tiempo real
   - Derecha: Panel de compra/venta

3. **Configura tu compra**
   - Asegúrate de estar en el toggle **"Comprar"** (verde)
   - Ingresa la cantidad de unidades:
     - Escribe manualmente
     - O usa botones rápidos: **+1**, **+5**, **+10**
     - O click en **MAX** para comprar el máximo posible

4. **Revisa el resumen**
   - Precio por unidad
   - Comisión: $0.00 (gratis)
   - **Total Estimado** calculado automáticamente

5. **Verifica tu balance**
   - Abajo del resumen verás tu "Balance disponible"
   - El botón se deshabilitará si no tienes suficiente dinero

6. **Confirma la compra**
   - Click en **"Comprar [SÍMBOLO]"**
   - Verás un spinner de procesamiento
   - Mensaje de confirmación verde: ✓ Compra exitosa

7. **Cierra el modal**
   - Click en la X o fuera del modal
   - Tu balance ya está actualizado

---

## 💸 Cómo Vender un Activo

### Paso a Paso:

1. **Abre el modal de trading** (mismo proceso que compra)

2. **Cambia a "Vender"**
   - Click en el toggle **"Vender"** (rojo)

3. **Ingresa la cantidad** a vender

4. **Confirma la venta**
   - Click en **"Vender [SÍMBOLO]"**
   - El dinero se suma a tu balance disponible

---

## 📊 Gráfico Interactivo

### Características:

- **Rangos de tiempo:** 1D | 1W | 1M | 3M | 1Y | ALL
  - Click en cualquier botón para cambiar el rango

- **Hover interactivo:**
  - Pasa el mouse sobre el gráfico
  - Verás el precio exacto en ese momento
  - Línea vertical indicadora
  - Color cambia según dirección (verde ↑ / rojo ↓)

- **Información adicional:**
  - Apertura, Máximo, Mínimo, Rango
  - Debajo del gráfico

---

## 📈 Balance y Estadísticas

### En el Sidebar:
- **Saldo disponible:** Se actualiza cada 3 segundos
- **Valor del portafolio:** Cálculo en tiempo real

### En el Dashboard:
- **Valor Total del Portafolio:**
  - Incluye balance + valor de activos
  - Muestra ganancia/pérdida total
  - Gráfico de rendimiento histórico

- **Balance Disponible:**
  - Dinero libre para invertir
  - Total invertido hasta ahora
  - Número total de operaciones

- **Top Activos:**
  - Los 3 activos con mejor rendimiento
  - Porcentaje de ganancia de cada uno

---

## 🎮 Botones Rápidos

### En el Panel de Trading:

- **+1:** Añade 1 unidad
- **+5:** Añade 5 unidades
- **+10:** Añade 10 unidades
- **MAX:** Calcula y establece el máximo que puedes comprar

### Ejemplo con MAX:
- Tienes $10,000
- Activo cuesta $100
- MAX = 100 unidades (10,000 / 100)

---

## 📝 Historial de Transacciones

### Ver tu historial:
1. Click en **"Historial"** en el sidebar
2. URL: `/dashboard/history`

### Verás:
- Todas tus compras y ventas
- Fecha y hora de cada operación
- Cantidad, precio y total
- Estado (Completada ✓)

### Filtros disponibles:
- **Buscar** por símbolo o nombre
- **Filtrar** por tipo: Todas / Compras / Ventas

---

## 💼 Ver tu Portafolio

### Acceder al portafolio:
1. Click en **"Portafolio"** en el sidebar
2. URL: `/dashboard/portfolio`

### Información mostrada:
- Valor total del portafolio
- Total invertido
- Ganancia/Pérdida neta
- Número de activos

### Tabla de activos:
- Cada activo con:
  - Cantidad de unidades
  - Precio de compra
  - Precio actual
  - Valor total
  - Ganancia/Pérdida ($ y %)

---

## 🏆 Emblemas (Gamificación)

### Desbloquea emblemas:
1. Click en **"Emblemas"** en el sidebar
2. URL: `/dashboard/badges`

### Ejemplos de emblemas:
- **Primera Transacción:** Completa tu primera operación
- **Trader Activo:** 10 transacciones
- **Inversor Novato:** Alcanza $1,000 en tu portafolio
- **Rey de las Criptos:** Invierte en 5 criptomonedas
- **Maestro de Ganancias:** +20% de ganancia

---

## ⚙️ Configuración y Consejos

### Toggle de Actualizaciones:
- En Trading en Vivo, puedes **pausar/reanudar** las actualizaciones automáticas
- Toggle en el header superior derecho

### Precios en Tiempo Real:
- Los precios se actualizan cada **3 segundos**
- El balance se recalcula automáticamente
- Todo persiste en LocalStorage

### Resetear Balance (para pruebas):
Si necesitas reiniciar tu balance a $10,000:
```javascript
// Abre la consola del navegador (F12)
// Ejecuta:
localStorage.removeItem('fortune_user_balance');
localStorage.removeItem('fortune_performance_history');
// Recarga la página
```

---

## 🎨 Atajos Visuales

### Colores:
- **Verde:** Ganancias, compras, positivo
- **Rojo:** Pérdidas, ventas, negativo
- **Azul:** Información neutral
- **Amarillo:** Alertas o destacados

### Indicadores:
- **↑ Flecha arriba:** Precio subiendo
- **↓ Flecha abajo:** Precio bajando
- **✓ Check:** Operación exitosa
- **✗ X:** Error o cancelado
- **• Punto rojo:** En vivo / activo

---

## 🚨 Mensajes de Error Comunes

### "Balance insuficiente"
- No tienes suficiente dinero para esta compra
- Solución: Reduce la cantidad o usa el botón MAX

### "Cantidad inválida"
- La cantidad debe ser mayor a 0
- Solución: Ingresa un número válido

### "Error al procesar la operación"
- Error general del sistema
- Solución: Intenta de nuevo en unos segundos

---

## 📱 Responsive / Mobile

### En dispositivos móviles:
- El modal de trading se adapta automáticamente
- Gráfico aparece arriba
- Panel de trading aparece abajo
- Todas las funciones disponibles

---

## 🔄 Sincronización

### Todo se sincroniza automáticamente:
- ✅ Balance en el sidebar
- ✅ Estadísticas en el dashboard
- ✅ Portafolio actualizado
- ✅ Historial de transacciones
- ✅ Emblemas desbloqueados

### No necesitas recargar la página

---

## 💡 Tips y Trucos

### 1. **Usar el botón MAX eficientemente:**
   - Perfecto para invertir todo tu balance disponible
   - Calcula automáticamente sin errores

### 2. **Monitorear el gráfico antes de comprar:**
   - Cambia entre rangos de tiempo
   - Identifica tendencias
   - Usa el hover para ver precios históricos

### 3. **Diversificar tu portafolio:**
   - Invierte en diferentes tipos de activos
   - Desbloquea emblemas especiales
   - Reduce el riesgo simulado

### 4. **Revisar estadísticas regularmente:**
   - Dashboard principal muestra tu rendimiento
   - Top 3 activos te ayuda a ver qué funciona
   - Gráfico de rendimiento muestra la evolución

### 5. **Aprovechar las actualizaciones en tiempo real:**
   - Los precios cambian cada 3 segundos
   - Compra cuando veas una bajada (simulado)
   - Vende cuando veas una subida

---

## 🎯 Flujo Completo Recomendado

1. **Inicia sesión** → Tienes $10,000
2. **Ve al Dashboard** → Revisa tus estadísticas (todo en $0 al inicio)
3. **Click en "Trading en vivo"** → Explora los activos
4. **Selecciona un activo** → Click en "Operar"
5. **Compra tu primer activo** → Usa botones rápidos
6. **Cierra el modal** → Ve cómo tu balance se actualiza
7. **Regresa al Dashboard** → Estadísticas ya muestran datos
8. **Compra más activos** → Diversifica tu portafolio
9. **Revisa "Portafolio"** → Ve todos tus activos
10. **Revisa "Historial"** → Ve todas tus operaciones
11. **Revisa "Emblemas"** → ¡Desbloquea logros!

---

## ❓ Preguntas Frecuentes

### ¿Los precios son reales?
No, son simulados pero con comportamiento realista. Se actualizan cada 3 segundos con volatilidad simulada.

### ¿Puedo perder mi dinero simulado?
No pierdes dinero en compras. Solo cambia el valor de tus activos según los precios simulados.

### ¿Se guardan mis datos?
Sí, todo se guarda en LocalStorage. Tus datos persisten entre sesiones.

### ¿Puedo tener balance negativo?
No, el sistema previene compras si no tienes suficiente balance.

### ¿Cuántas operaciones puedo hacer?
Ilimitadas, siempre que tengas balance disponible.

### ¿Los emblemas se desbloquean automáticamente?
Sí, el sistema verifica automáticamente si cumples los requisitos.

---

✨ **¡Disfruta de tu experiencia de trading simulado! Todas las funcionalidades están operativas y listas para usar.**

## 🎮 ¡Empieza Ahora!

1. Abre el navegador
2. Ve a `/dashboard`
3. Click en **"Trading en vivo"**
4. ¡Comienza a operar!

**Balance inicial: $10,000**  
**Comisión: $0.00**  
**Riesgo: Cero (es simulado)**  
**Diversión: 100%** 🚀

