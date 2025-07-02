# Emergency App con Material UI (React Native Paper)

Esta aplicación de emergencia ahora está completamente integrada con Material UI para React Native usando React Native Paper, proporcionando una interfaz de usuario moderna y consistente.

## 🎨 Material UI Implementado

### Componentes Instalados
- **React Native Paper**: Implementación completa de Material Design 3
- **React Native Vector Icons**: Iconografía Material Design
- **Expo Font**: Soporte para tipografías personalizadas

### Características de Material UI

#### 🎯 Componentes Principales
- **Buttons**: Contained, Outlined, Text, Tonal
- **Cards**: Con títulos, contenido y acciones
- **FAB (Floating Action Button)**: Botones de acción flotante
- **TextInput**: Campos de texto con validación
- **Navigation**: Tabs con iconos Material
- **Snackbars**: Notificaciones no intrusivas
- **Dialogs**: Modales para confirmaciones

#### 🎨 Elementos Visuales
- **Chips**: Etiquetas interactivas
- **Badges**: Indicadores numéricos
- **Progress Bars**: Barras de progreso
- **Activity Indicators**: Indicadores de carga
- **Dividers**: Separadores visuales
- **Surfaces**: Contenedores con elevación

#### 🎛️ Controles
- **Switches**: Interruptores on/off
- **Radio Buttons**: Botones de selección única
- **Toggle Buttons**: Botones de alternancia
- **Icon Buttons**: Botones con solo iconos

#### 📊 Datos y Listas
- **Data Tables**: Tablas de datos organizadas
- **Lists**: Listas con iconos y acciones
- **Menu**: Menús desplegables
- **Searchbar**: Barra de búsqueda

### 🎨 Temas Personalizados

#### Tema Claro
```javascript
primary: '#F7941D',        // Naranja principal
secondary: '#FF4444',      // Rojo emergencia
tertiary: '#6200EE',       // Púrpura Material
surface: '#FFFFFF',        // Superficie blanca
background: '#FAFAFA'      // Fondo claro
```

#### Tema Oscuro
```javascript
primary: '#FFB74D',        // Naranja claro
secondary: '#FF6B6B',      // Rojo suave
tertiary: '#BB86FC',       // Púrpura claro
surface: '#121212',        // Superficie oscura
background: '#0A0A0A'      // Fondo negro
```

## 📱 Pantallas de la App

### 🏠 Inicio (index.js)
- **Botón de Emergencia**: Grande, rojo, circular para llamadas
- **Botón de SMS**: Naranja para mensajes
- **Card Informativa**: Con descripción de la app
- **Chip**: Muestra cantidad de números configurados
- **FAB**: Acceso rápido a configuración

### ⚙️ Configuración (config.js)
- **TextInputs**: Campos para 3 números de teléfono
- **Validación**: HelperText para validar números
- **Iconos**: En campos de entrada y botones
- **Snackbar**: Confirmación de guardado exitoso
- **Card**: Instrucciones de uso

### 🎨 Ejemplos Material UI (examples.js)
- **Showcase completo**: Todos los componentes disponibles
- **Appbar**: Barra superior con menú
- **Banner**: Notificaciones informativas
- **Secciones organizadas**: Por tipo de componente
- **Interactividad**: Elementos funcionales para probar

### 👤 Perfil (profile.js)
- Mantiene el diseño original con estilo Material

## 🚀 Instalación y Uso

### Dependencias Instaladas
```bash
npm install react-native-paper react-native-vector-icons
npx expo install expo-font @react-native-async-storage/async-storage expo-sms
```

### Iniciar la App
```bash
npx expo start
```

### Opciones de Visualización
- **iOS Simulator**: Presiona `i`
- **Android Emulator**: Presiona `a`
- **Web**: Presiona `w` o http://localhost:8081
- **Dispositivo físico**: Escanea el QR con Expo Go

## 🔧 Estructura del Proyecto

```
app/
├── _layout.tsx          # Provider de Material UI
├── (tabs)/
│   ├── _layout.js       # Navegación con tabs Material
│   ├── index.js         # Pantalla principal mejorada
│   ├── config.js        # Configuración con Material UI
│   ├── examples.js      # Showcase de componentes
│   └── profile.js       # Perfil de usuario
themes/
└── materialTheme.js     # Temas personalizados
utils/
└── storage.js           # Almacenamiento local
```

## 🎯 Funcionalidades

### Emergencia
- ☎️ **Llamada rápida**: Botón grande para llamar al primer número
- 📱 **SMS grupal**: Enviar mensaje a todos los números configurados
- 🔢 **3 números**: Configurar hasta 3 contactos de emergencia

### Material Design
- 🌙 **Modo oscuro**: Automático según configuración del sistema
- 🎨 **Colores consistentes**: Paleta Material Design 3
- ♿ **Accesibilidad**: Componentes accesibles por defecto
- 📱 **Responsive**: Adaptable a diferentes tamaños de pantalla

## 🛠️ Configuración Avanzada

### Personalizar Colores
Edita `themes/materialTheme.js` para cambiar:
- Colores primarios y secundarios
- Elevaciones y sombras
- Tipografías
- Bordes y espaciado

### Agregar Componentes
React Native Paper ofrece más componentes:
- **Bottom Navigation**
- **Calendar**
- **Time Picker**
- **Slider**
- **Tooltip**

## 📖 Documentación
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Material Design 3](https://m3.material.io/)
- [Expo Documentation](https://docs.expo.dev/)

## 🚨 Notas de Emergencia
Esta app está diseñada para situaciones de emergencia. Asegúrate de:
1. Configurar números de contacto confiables
2. Probar la funcionalidad regularmente
3. Mantener la app actualizada
4. Tener la batería cargada

---
**Desarrollado con ❤️ usando Expo y Material UI**
