/**
 * modern-gallery.js - Script para una galería de fotos moderna e interactiva
 * Implementa un layout tipo masonry, lightbox avanzado y filtros
 */

class ModernGallery {
  constructor(containerId, options = {}) {
    // Opciones por defecto
    this.options = {
      itemSelector: '.gallery-item',
      columnWidth: 250,
      gutter: 16,
      transitionDuration: '0.4s',
      fitWidth: true,
      ...options
    };
    
    // Elementos DOM
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    // Datos de la galería
    this.images = [];
    this.currentIndex = 0;
    this.categories = new Set();

    // Crear elementos necesarios
    this.createGalleryElements();
    
    // Inicializar
    this.init();
  }
  
  // Crear los elementos necesarios para la galería
  createGalleryElements() {
    // Crear contenedor para los controles
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.className = 'gallery-controls';
    this.container.appendChild(this.controlsContainer);
    
    // Crear contenedor para las imágenes (masonry)
    this.masonryContainer = document.createElement('div');
    this.masonryContainer.className = 'gallery-masonry';
    this.container.appendChild(this.masonryContainer);
    
    // Crear loader
    this.loader = document.createElement('div');
    this.loader.className = 'gallery-loader';
    this.container.appendChild(this.loader);
    
    // Crear lightbox
    this.createLightbox();
  }
  
  // Crear el lightbox con controles mejorados
  createLightbox() {
    // Contenedor principal
    this.lightbox = document.createElement('div');
    this.lightbox.className = 'lightbox';
    
    // Contenido
    this.lightboxContent = document.createElement('div');
    this.lightboxContent.className = 'lightbox-content';
    
    // Imagen
    this.lightboxImage = document.createElement('img');
    this.lightboxImage.className = 'lightbox-image';
    this.lightboxContent.appendChild(this.lightboxImage);
    
    // Leyenda
    this.lightboxCaption = document.createElement('div');
    this.lightboxCaption.className = 'lightbox-caption';
    this.lightboxContent.appendChild(this.lightboxCaption);
    
    // Contador de imágenes
    this.lightboxCounter = document.createElement('div');
    this.lightboxCounter.className = 'lightbox-counter';
    this.lightboxCounter.textContent = '1 / ' + this.images.length;
    
    // Barra de herramientas
    const toolbar = document.createElement('div');
    toolbar.className = 'lightbox-toolbar';
    toolbar.appendChild(this.lightboxCounter);
    this.lightboxContent.appendChild(toolbar);
    
    // Controles de navegación mejorados
    const prevButton = document.createElement('button');
    prevButton.className = 'lightbox-prev';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.setAttribute('aria-label', 'Imagen anterior');
    prevButton.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!this.isNavigationDisabled) {
        this.prevImage();
      }
    });
    
    const nextButton = document.createElement('button');
    nextButton.className = 'lightbox-next';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.setAttribute('aria-label', 'Imagen siguiente');
    nextButton.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!this.isNavigationDisabled) {
        this.nextImage();
      }
    });
    
    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.setAttribute('aria-label', 'Cerrar');
    closeButton.addEventListener('click', () => {
      this.closeLightbox();
    });
    
    // Botones adicionales para la barra de herramientas
    const fullscreenButton = document.createElement('button');
    fullscreenButton.className = 'lightbox-fullscreen';
    fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';
    fullscreenButton.setAttribute('aria-label', 'Pantalla completa');
    fullscreenButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleFullscreen();
    });
    toolbar.appendChild(fullscreenButton);
    
    // Añadir elementos al lightbox
    this.lightbox.appendChild(this.lightboxContent);
    this.lightbox.appendChild(prevButton);
    this.lightbox.appendChild(nextButton);
    this.lightbox.appendChild(closeButton);
    
    // Cerrar al hacer clic fuera de la imagen
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });
    
    // Soporte para gestos táctiles
    this.setupTouchNavigation();
    
    // Añadir al DOM
    document.body.appendChild(this.lightbox);
    
    // Manejar eventos de teclado
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') {
        this.closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        if (!this.isNavigationDisabled) {
          this.prevImage();
        }
      } else if (e.key === 'ArrowRight') {
        if (!this.isNavigationDisabled) {
          this.nextImage();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        this.toggleFullscreen();
      }
    });
  }
  
  // Configurar navegación táctil
  setupTouchNavigation() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    this.lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    this.lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, false);
  }
  
  // Manejar gestos de deslizamiento
  handleSwipe(startX, endX) {
    if (this.isNavigationDisabled) return;
    
    const threshold = 50; // Mínima distancia para considerar un swipe
    
    if (startX - endX > threshold) {
      // Deslizamiento hacia la izquierda -> siguiente imagen
      this.nextImage();
    } else if (endX - startX > threshold) {
      // Deslizamiento hacia la derecha -> imagen anterior
      this.prevImage();
    }
  }
  
  // Alternar modo pantalla completa
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      // Entrar en modo pantalla completa
      if (this.lightbox.requestFullscreen) {
        this.lightbox.requestFullscreen();
      } else if (this.lightbox.webkitRequestFullscreen) {
        this.lightbox.webkitRequestFullscreen();
      } else if (this.lightbox.msRequestFullscreen) {
        this.lightbox.msRequestFullscreen();
      }
    } else {
      // Salir de modo pantalla completa
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }
  
  // Inicializar la galería
  async init() {
    try {
      // Cargar imágenes
      await this.loadImages();
      
      // Ocultar loader
      this.loader.style.display = 'none';
      
      // Crear filtros
      this.createFilters();
      
      // Renderizar imágenes
      this.renderImages();
      
      // Inicializar layout masonry
      this.initMasonry();
    } catch (error) {
      console.error('Error al inicializar la galería:', error);
      this.showError('No se pudieron cargar las imágenes. Por favor, intenta de nuevo más tarde.');
    }
  }
  
  // Cargar las imágenes
  async loadImages() {
    // Imágenes de estudiantes trabajando
    const imageFiles = [
      { 
        src: 'assets/images/imagenestudiantetrabajando (1).jpg',
        title: 'Estudiantes en acción',
        description: 'Explorando el impacto ambiental en nuestra comunidad',
        category: 'fieldwork'
      },
      { 
        src: 'assets/images/imagenestudiantetrabajando (2).jpg',
        title: 'Investigación colaborativa',
        description: 'Trabajo en equipo para analizar datos ambientales',
        category: 'research'
      },
      { 
        src: 'assets/images/imagenestudiantetrabajando (3).jpg',
        title: 'Análisis de muestras',
        description: 'Estudiantes examinando evidencias del impacto humano',
        category: 'laboratory'
      },
      { 
        src: 'assets/images/imagenestudiantetrabajando (4).jpg',
        title: 'Documentación de campo',
        description: 'Registro de observaciones en el entorno natural',
        category: 'fieldwork'
      },
      { 
        src: 'assets/images/imagenestudiantetrabajando (5).jpg',
        title: 'Debate de soluciones',
        description: 'Discusión sobre alternativas sostenibles',
        category: 'classroom'
      },
      { 
        src: 'assets/images/imagenestudiantetrabajando (6).jpg',
        title: 'Presentación de hallazgos',
        description: 'Compartiendo resultados con la comunidad educativa',
        category: 'presentation'
      },
      { 
        src: 'assets/images/imagenestudiantetrabajando (7).jpg',
        title: 'Trabajo interdisciplinario',
        description: 'Integrando conocimientos de diferentes áreas',
        category: 'classroom'
      }
    ];
    
    // Precargar imágenes y obtener dimensiones
    const imagePromises = imageFiles.map(imageData => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          // Calcular la relación de aspecto para el layout masonry
          const aspectRatio = img.height / img.width;
          resolve({
            ...imageData,
            width: img.width,
            height: img.height,
            aspectRatio,
            error: false
          });
          // Añadir categoría al conjunto de categorías
          this.categories.add(imageData.category);
        };
        img.onerror = () => {
          // Si hay error, aún así agregamos un placeholder visual
          resolve({
            ...imageData,
            width: 300,
            height: 200,
            aspectRatio: 200 / 300,
            error: true
          });
        };
        img.src = imageData.src;
      });
    });
    // Esperar a que todas las imágenes se carguen (incluyendo las que fallan)
    this.images = await Promise.all(imagePromises);
  }
  
  // Crear los filtros basados en las categorías
  createFilters() {
    // Botón para mostrar todas las imágenes
    const allButton = document.createElement('button');
    allButton.className = 'gallery-filter active';
    allButton.textContent = 'Todas';
    allButton.dataset.category = 'all';
    allButton.addEventListener('click', () => this.filterImages('all'));
    this.controlsContainer.appendChild(allButton);
    
    // Botones para cada categoría
    const categoryNames = {
      'fieldwork': 'Trabajo de campo',
      'research': 'Investigación',
      'laboratory': 'Laboratorio',
      'classroom': 'Aula',
      'presentation': 'Presentaciones'
    };
    
    // Crear un botón para cada categoría
    [...this.categories].sort().forEach(category => {
      const button = document.createElement('button');
      button.className = 'gallery-filter';
      button.textContent = categoryNames[category] || category;
      button.dataset.category = category;
      button.addEventListener('click', () => this.filterImages(category));
      this.controlsContainer.appendChild(button);
    });
  }
  
  // Filtrar imágenes por categoría
  filterImages(category) {
    // Actualizar botones de filtro
    const filterButtons = this.controlsContainer.querySelectorAll('.gallery-filter');
    filterButtons.forEach(button => {
      if (button.dataset.category === category) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    
    // Filtrar imágenes con animación
    const items = this.masonryContainer.querySelectorAll('.gallery-item');
    items.forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
        // Mostrar con animación
        item.style.opacity = '0';
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
        }, 50);
      } else {
        // Ocultar con animación
        item.style.opacity = '0';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
    
    // Recalcular el layout después de que las animaciones terminen
    setTimeout(() => {
      this.recalculateLayout();
    }, 350);
  }
  
  // Recalcular el layout de la galería
  recalculateLayout() {
    const items = this.masonryContainer.querySelectorAll('.gallery-item:not([style*="display: none"])');
    items.forEach(item => {
      this.resizeGridItem(item);
    });
  }
  
  // Renderizar las imágenes en el contenedor con proporciones optimizadas
  renderImages() {
    // Limpiar el contenedor
    this.masonryContainer.innerHTML = '';
    
    // Calcular proporciones óptimas para la galería
    this.calculateOptimalProportions();
    
    // Crear elementos para cada imagen
    this.images.forEach((image, index) => {
      // Contenedor del item
      const item = document.createElement('div');
      item.className = 'gallery-item slide-up';
      item.dataset.category = image.category;
      
      // Calcular altura proporcional para el layout masonry
      const optimalRowSpan = this.getOptimalRowSpan(image);
      item.style.gridRowEnd = `span ${optimalRowSpan}`;
      
      // Establecer aspect-ratio para mantener proporciones
      if (image.aspectRatio) {
        // Usar aspect-ratio CSS para mantener proporciones
        item.style.aspectRatio = `${1}/${image.aspectRatio}`;
      }
      
      // Mostrar imagen o placeholder
      if (image.error) {
        // Placeholder visual si la imagen falló
        const placeholder = document.createElement('div');
        placeholder.className = 'gallery-img-placeholder flex flex-col items-center justify-center h-full w-full text-gray-400';
        placeholder.style.minHeight = '160px';
        placeholder.innerHTML = `
          <i class='fas fa-image fa-3x mb-2'></i>
          <span class='text-xs'>Imagen no disponible</span>
        `;
        item.appendChild(placeholder);
      } else {
        // Imagen real
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.title;
        img.className = 'gallery-img';
        img.loading = 'lazy';
        item.appendChild(img);
      }
      // Info de la imagen
      const info = document.createElement('div');
      info.className = 'gallery-item-info';
      const title = document.createElement('h4');
      title.className = 'gallery-item-title';
      title.textContent = image.title;
      const description = document.createElement('p');
      description.className = 'gallery-item-description';
      description.textContent = image.description;
      info.appendChild(title);
      info.appendChild(description);
      item.appendChild(info);
      // Evento para abrir el lightbox solo si la imagen existe
      if (!image.error) {
        item.addEventListener('click', () => {
          this.openLightbox(index);
        });
      }
      // Añadir item al contenedor
      this.masonryContainer.appendChild(item);
      // Añadir delay para la animación escalonada
      setTimeout(() => {
        item.style.opacity = 1;
      }, index * 80); // Reducido para una animación más rápida
    });
  }
  
  // Calcular proporciones óptimas para la galería
  calculateOptimalProportions() {
    try {
      // Calcular el ancho promedio de las columnas
      const containerWidth = this.masonryContainer.clientWidth;
      const columnWidth = parseInt(window.getComputedStyle(this.masonryContainer).getPropertyValue('grid-template-columns').split('minmax(')[1]);
      const numColumns = Math.floor(containerWidth / columnWidth);
      
      // Calcular proporciones óptimas basadas en las dimensiones del contenedor
      this.optimalHeight = Math.floor(containerWidth / numColumns) * 0.8; // 80% del ancho de columna
      
      // Guardar para cálculos posteriores
      this.gridDimensions = {
        containerWidth,
        columnWidth,
        numColumns,
        optimalHeight: this.optimalHeight
      };
    } catch (error) {
      console.warn('Error al calcular proporciones óptimas:', error);
      // Valores por defecto
      this.optimalHeight = 250;
      this.gridDimensions = {
        containerWidth: 1000,
        columnWidth: 250,
        numColumns: 4,
        optimalHeight: 250
      };
    }
  }
  
  // Obtener altura óptima de fila para una imagen
  getOptimalRowSpan(image) {
    // Usar la relación de aspecto para calcular la altura óptima
    const baseRowSpan = Math.ceil(image.aspectRatio * 25);
    
    // Ajustar para imágenes muy altas o muy anchas
    if (image.aspectRatio > 1.5) {
      // Imágenes verticales (altas)
      return Math.min(baseRowSpan, 50); // Limitar altura máxima
    } else if (image.aspectRatio < 0.6) {
      // Imágenes horizontales (anchas)
      return Math.max(baseRowSpan, 15); // Garantizar altura mínima
    }
    
    return baseRowSpan;
  }
  
  // Generar placeholder de baja resolución basado en la categoría
  generateLowResPlaceholder(category) {
    // Colores por categoría para placeholders
    const categoryColors = {
      'fieldwork': 'rgba(76, 175, 80, 0.2)',
      'research': 'rgba(33, 150, 243, 0.2)',
      'laboratory': 'rgba(156, 39, 176, 0.2)',
      'classroom': 'rgba(255, 152, 0, 0.2)',
      'presentation': 'rgba(233, 30, 99, 0.2)'
    };
    
    // Devolver null para usar el sistema normal de carga
    return null;
  }
  
  // Recalcular el layout completo
  recalculateLayout() {
    // Recalcular proporciones óptimas
    this.calculateOptimalProportions();
    
    // Actualizar todos los elementos visibles
    const items = this.masonryContainer.querySelectorAll('.gallery-item:not([style*="display: none"])');
    items.forEach(item => {
      this.resizeGridItem(item);
    });
  }
  
  // Inicializar el layout masonry
  initMasonry() {
    // Implementación mejorada de masonry con CSS Grid
    this.resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        // Solo procesar elementos visibles
        const items = entry.target.querySelectorAll('.gallery-item:not([style*="display: none"])');
        items.forEach(item => {
          const img = item.querySelector('img');
          if (img && img.complete) {
            this.resizeGridItem(item);
          } else if (img) {
            img.addEventListener('load', () => {
              this.resizeGridItem(item);
            });
          }
        });
      }
    });
    
    // Observar el contenedor
    this.resizeObserver.observe(this.masonryContainer);
    
    // Observar cambios en el tamaño de la ventana
    window.addEventListener('resize', () => {
      this.recalculateLayout();
    });
  }
  
  // Redimensionar un item en el grid con mejor manejo de errores
  resizeGridItem(item) {
    try {
      // Verificar que el elemento sea visible
      if (item.offsetParent === null) return;
      
      // Obtener las propiedades del grid
      const computedStyle = window.getComputedStyle(this.masonryContainer);
      const rowHeight = parseInt(computedStyle.getPropertyValue('grid-auto-rows') || '10');
      const rowGap = parseInt(computedStyle.getPropertyValue('grid-row-gap') || '16');
      
      // Calcular la altura real del elemento
      const itemHeight = item.getBoundingClientRect().height;
      
      // Calcular el número de filas que debe ocupar
      const rowSpan = Math.max(1, Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap)));
      
      // Aplicar el rowspan
      item.style.gridRowEnd = `span ${rowSpan}`;
    } catch (error) {
      console.warn('Error al redimensionar elemento de la galería:', error);
    }
  }
  
  // Abrir el lightbox
  openLightbox(index) {
    this.currentIndex = index;
    const image = this.images[index];
    
    // Actualizar imagen y leyenda
    this.lightboxImage.src = image.src;
    this.lightboxCaption.innerHTML = `
      <h3>${image.title}</h3>
      <p>${image.description}</p>
    `;
    
    // Mostrar lightbox
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  }
  
  // Cerrar el lightbox
  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll
  }
  
  // Ir a la imagen anterior con precarga
  prevImage() {
    // Desactivar botones durante la transición
    this.disableNavigation();
    
    // Calcular nuevo índice
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    
    // Precargar la imagen anterior para tenerla lista
    const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.preloadImage(this.images[prevIndex].src);
    
    // Actualizar la imagen con efecto de deslizamiento hacia la derecha
    this.updateLightboxImage('right');
  }
  
  // Ir a la imagen siguiente con precarga
  nextImage() {
    // Desactivar botones durante la transición
    this.disableNavigation();
    
    // Calcular nuevo índice
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    
    // Precargar la siguiente imagen para tenerla lista
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    this.preloadImage(this.images[nextIndex].src);
    
    // Actualizar la imagen con efecto de deslizamiento hacia la izquierda
    this.updateLightboxImage('left');
  }
  
  // Precargar una imagen para mejorar la experiencia
  preloadImage(src) {
    if (!this.imageCache) {
      this.imageCache = {};
    }
    
    // Solo precargar si no está en caché
    if (!this.imageCache[src]) {
      const img = new Image();
      img.src = src;
      this.imageCache[src] = img;
    }
  }
  
  // Desactivar navegación durante transiciones
  disableNavigation() {
    if (this.isNavigationDisabled) return;
    
    this.isNavigationDisabled = true;
    
    // Reactivar después de la transición
    setTimeout(() => {
      this.isNavigationDisabled = false;
    }, 500); // Un poco más que la duración de la transición
  }
  
  // Actualizar la imagen del lightbox con transiciones más suaves y direccionales
  updateLightboxImage(direction = 'fade') {
    const image = this.images[this.currentIndex];
    
    // Aplicar transiciones más suaves
    this.lightboxContent.classList.add('transitioning');
    
    // Determinar el efecto de transición según la dirección
    let initialTransform = 'scale(0.95)';
    if (direction === 'left') {
      initialTransform = 'translateX(50px) scale(0.95)';
    } else if (direction === 'right') {
      initialTransform = 'translateX(-50px) scale(0.95)';
    }
    
    // Efecto de salida
    this.lightboxImage.style.opacity = 0;
    this.lightboxImage.style.transform = initialTransform;
    this.lightboxCaption.style.opacity = 0;
    
    // Actualizar contador de imágenes
    if (this.lightboxCounter) {
      this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }
    
    // Tiempo de transición optimizado
    const transitionTime = 250; // ms, más rápido para mejor UX
    
    setTimeout(() => {
      // Cambiar la imagen y la leyenda
      this.lightboxImage.src = image.src;
      this.lightboxCaption.innerHTML = `
        <h3>${image.title}</h3>
        <p>${image.description}</p>
      `;
      
      // Asegurarse de que la imagen esté cargada antes de mostrarla
      this.lightboxImage.onload = () => {
        // Efecto de entrada
        this.lightboxImage.style.opacity = 1;
        this.lightboxImage.style.transform = 'translateX(0) scale(1)';
        this.lightboxCaption.style.opacity = 1;
        this.lightboxContent.classList.remove('transitioning');
      };
      
      // Por si la imagen ya estaba en caché y onload no se dispara
      if (this.lightboxImage.complete) {
        this.lightboxImage.onload();
      }
    }, transitionTime);
  }
  
  // Mostrar un mensaje de error
  showError(message) {
    this.loader.style.display = 'none';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'gallery-error';
    errorElement.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <p>${message}</p>
    `;
    
    this.container.appendChild(errorElement);
  }
}

// Inicializar la galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar la galería moderna
  const gallery = new ModernGallery('dynamic-gallery', {
    // Opciones personalizadas si es necesario
  });
});
