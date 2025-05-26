# Explorando Nuestro Entorno: Impacto humano y salud

Sitio web educativo responsivo y atractivo para planificaciones didácticas con arquitectura modular, componentes reutilizables, optimización de rendimiento y accesibilidad mejorada.

## Mejoras recientes

### Optimización de rendimiento
- Implementación de carga diferida (lazy loading) para imágenes
- Optimización de recursos estáticos
- Preconexiones para recursos externos
- Reducción de bloqueo de renderizado

### Manejo de imágenes
- Sistema avanzado de gestión de imágenes
- Respaldos automáticos para imágenes no disponibles
- Soporte para imágenes responsivas
- Optimización automática de imágenes

### Accesibilidad
- Mejoras en el contraste y legibilidad
- Etiquetas ARIA para elementos interactivos
- Navegación mejorada por teclado
- Textos alternativos para imágenes

## Instrucciones de uso

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# O iniciar servidor simple
npm run start
```

### Optimización de imágenes

Para optimizar las imágenes del proyecto y generar versiones responsivas:

```bash
# Optimización básica
npm run optimize-images

# Optimización avanzada (genera versiones responsivas)
npm run optimize-images:advanced
```

### Solución de problemas con imágenes

Si tienes problemas con las imágenes, puedes utilizar el script de corrección:

```bash
npm run fix-images
```

### Construcción para producción

```bash
# Construcción básica
npm run build

# Construcción completa (incluye optimización de imágenes y pruebas de accesibilidad)
npm run build:full
```

## Estructura del proyecto

```
Sitio_web_Planificacion_reves/
│
├── .github/             # Configuraciones de GitHub
│   └── workflows/       # Flujos de trabajo de GitHub Actions
│       └── deploy.yml   # Configuración de despliegue automático
│
├── assets/
│   ├── images/          # Imágenes y capturas
│   ├── icons/           # SVGs o íconos
│   └── pdfs/            # Documentos PDF
│
├── components/          # Componentes JS reutilizables
│   ├── Accordion.js     # Componente de acordeón
│   ├── Gallery.js       # Componente de galería con lightbox
│   ├── Navigation.js    # Componente de navegación
│   ├── Notification.js  # Componente de notificaciones
│   └── Tabs.js          # Componente de pestañas
│
├── css/
│   ├── animations.css   # Animaciones y microinteracciones
│   ├── main.css         # Archivo principal para procesamiento
│   ├── styles.css       # Estilos personalizados
│   ├── optimized.css    # Estilos optimizados para rendimiento
│   └── tailwind.css     # Configuración de Tailwind
│
├── js/
│   ├── scripts.js       # Funcionalidad JS principal (módulo)
│   └── responsive-images.js # Cargador de imágenes responsivas (generado)
│
├── scripts/                    # Scripts de utilidad
│   ├── optimize-images.js        # Script para optimización de imágenes
│   ├── optimize-images-advanced.js # Script avanzado para optimización de imágenes
│   └── image-loader.js           # Sistema de gestión de imágenes
│
├── utils/               # Utilidades y funciones auxiliares
│   ├── animations.js    # Utilidades para animaciones
│   ├── navigation.js    # Utilidades para navegación
│   └── storage.js       # Utilidades para almacenamiento local
│
├── dist/                # Carpeta de distribución (generada)
├── node_modules/        # Dependencias (generada)
│
├── index.html           # Página principal
├── anexos.html          # Página de anexos
├── evaluacion.html      # Página de evaluación
├── secuencia.html       # Página de secuencia didáctica
├── .eslintrc.js         # Configuración de ESLint
├── .pa11yci            # Configuración de Pa11y
├── lighthouserc.js      # Configuración de Lighthouse
├── netlify.toml         # Configuración de Netlify
├── vercel.json          # Configuración de Vercel
├── package.json         # Dependencias y scripts
├── tailwind.config.js   # Configuración de Tailwind CSS
├── vite.config.js       # Configuración de Vite
└── README.md            # Instrucciones
```

## Tecnologías usadas
- HTML5, CSS3, JavaScript (ES6+ con módulos)
- [Tailwind CSS](https://tailwindcss.com/) (con configuración local)
- [Vite](https://vitejs.dev/) para construcción y desarrollo
- [AOS](https://michalsnik.github.io/aos/) para animaciones de scroll
- [ESLint](https://eslint.org/) para linting y calidad de código
- [Pa11y](https://pa11y.org/) para pruebas de accesibilidad
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) para análisis de rendimiento
- Arquitectura modular basada en componentes

## Despliegue del sitio

El proyecto incluye configuraciones optimizadas para varios servicios de despliegue:

### GitHub Pages (Automatizado)
1. Sube todos los archivos a un repositorio en GitHub.
2. El flujo de trabajo de GitHub Actions (`.github/workflows/deploy.yml`) se ejecutará automáticamente.
3. Este flujo construye el sitio, ejecuta pruebas de Lighthouse y despliega a GitHub Pages.
4. Tu sitio estará disponible en `https://usuario.github.io/repositorio/`.

### Netlify (Recomendado)
1. Sube el proyecto a un repositorio de GitHub o arrastra la carpeta a [Netlify](https://app.netlify.com/).
2. La configuración en `netlify.toml` se aplicará automáticamente.
3. Ejecuta `npm run deploy:netlify` para desplegar usando la CLI de Netlify.
4. Beneficios: CDN global, SSL gratuito, cabeceras de seguridad optimizadas y comprensión automática.

### Vercel
1. Conecta tu repositorio a [Vercel](https://vercel.com/).
2. La configuración en `vercel.json` se aplicará automáticamente.
3. Alternativamente, ejecuta `npm run deploy:vercel` para desplegar usando la CLI de Vercel.
4. Beneficios: Previsualizaciones automáticas para cada PR y despliegue global.

## Personalización
- Cambia imágenes y textos en `index.html` según tus necesidades.
- Agrega más recursos en `assets/images/`, `assets/pdfs/` y `assets/icons/`.

## Arquitectura y Patrones de Diseño

### Componentes Reutilizables
El proyecto utiliza una arquitectura modular basada en componentes reutilizables:
- **Accordion**: Componente para mostrar/ocultar contenido en secciones plegables.
- **Gallery**: Componente de galería de imágenes con lightbox integrado.
- **Navigation**: Componente de navegación con scroll-spy y soporte móvil.
- **Tabs**: Componente de pestañas para organizar contenido.

### Módulos de Utilidades
- **animations.js**: Funciones para animaciones y efectos visuales.
- **navigation.js**: Utilidades para navegación y componentes interactivos.
- **storage.js**: Funciones para gestión de almacenamiento local.

## Mejoras Implementadas

### Arquitectura y Modularización
1. **Modularización**: Código organizado en módulos ES6 para mejor mantenimiento.
2. **Componentes Reutilizables**: Implementación de componentes JS independientes.
3. **Patrón de Diseño Modular**: Separación clara de responsabilidades entre componentes.

### Optimización de Rendimiento
1. **Carga Optimizada**: División de código en chunks para mejor caching.
2. **Compresión Automática**: Archivos comprimidos con gzip y brotli para carga más rápida.
3. **Optimización de Imágenes**: Generación automática de imágenes en diferentes formatos (WebP, AVIF) y tamaños.
4. **Carga Diferida**: Implementación de lazy loading para imágenes y componentes.
5. **Monitoreo de Rendimiento**: Integración con Lighthouse para análisis continuo.

### Mejoras de Accesibilidad (a11y)
1. **Navegación por Teclado**: Todos los componentes interactivos son accesibles mediante teclado.
2. **Atributos ARIA**: Implementación adecuada de roles y atributos ARIA.
3. **Contraste y Legibilidad**: Mejora en el contraste de colores y tamaños de texto.
4. **Pruebas Automáticas**: Integración con Pa11y para verificación continua de accesibilidad.
5. **Textos Alternativos**: Todas las imágenes incluyen descripciones adecuadas.

### Mejoras de UX/UI
1. **Notificaciones**: Sistema de notificaciones para feedback visual al usuario.
2. **Microinteracciones**: Animaciones sutiles para mejorar la experiencia de usuario.
3. **Feedback Visual**: Indicadores claros para estados de carga, éxito y error.
4. **Diseño Responsivo Mejorado**: Experiencia optimizada en todos los dispositivos.
5. **Modo Oscuro**: Soporte para preferencias de color del sistema.

### Despliegue y CI/CD
1. **Configuraciones Optimizadas**: Archivos de configuración para Netlify, Vercel y GitHub Pages.
2. **Integración Continua**: Flujos de trabajo automatizados para pruebas y despliegue.
3. **Cabeceras de Seguridad**: Implementación de cabeceras HTTP para mejorar la seguridad.
4. **Caché Optimizado**: Estrategias de caché para recursos estáticos.

## Ejecución de pruebas y optimización

### Análisis de rendimiento

```bash
# Ejecutar análisis de rendimiento con Lighthouse
npm run analyze

# Visualizar el tamaño del bundle
npm run build -- --mode analyze
```

### Pruebas de accesibilidad

```bash
# Ejecutar pruebas de accesibilidad
npm run a11y

# Verificar errores de linting relacionados con accesibilidad
npm run lint
```

### Optimización de imágenes

```bash
# Optimizar todas las imágenes del proyecto
npm run optimize-images
```

### Construcción para producción

```bash
# Ejecutar el proceso completo de construcción
npm run build:full
```

## Créditos
Desarrollado originalmente por un experto en UX/UI y front-end.
Modernización, optimización y mejoras de accesibilidad por Cascade AI.
