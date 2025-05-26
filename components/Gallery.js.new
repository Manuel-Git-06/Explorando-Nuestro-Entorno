/**
 * Gallery.js - Componente de galería de imágenes con lightbox mejorado
 * Parte de la modernización gradual del proyecto Planificación Revés
 * 
 * Funcionalidades:
 * - Lightbox con navegación por teclado (flechas izquierda/derecha, ESC para cerrar)
 * - Zoom en imágenes (rueda del ratón o teclas +/-)
 * - Transiciones suaves entre imágenes
 * - Soporte para leyendas en imágenes
 * - Indicador de carga para imágenes grandes
 * - Controles táctiles para dispositivos móviles
 */

/**
 * Función auxiliar para crear botones de navegación
 * @param {string} text - Texto del botón
 * @param {Function} onClick - Función a ejecutar al hacer clic
 * @returns {HTMLElement} - El botón configurado
 */
function createNavigationButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.background = 'rgba(0,0,0,0.5)';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '50%';
    button.style.width = '3rem';
    button.style.height = '3rem';
    button.style.fontSize = '1.5rem';
    button.style.cursor = 'pointer';
    button.style.display = 'flex';
    button.style.justifyContent = 'center';
    button.style.alignItems = 'center';
    button.style.transition = 'background-color 0.2s';
    
    button.addEventListener('mouseover', function() {
        this.style.backgroundColor = 'rgba(0,0,0,0.7)';
    });
    
    button.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'rgba(0,0,0,0.5)';
    });
    
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        onClick();
    });
    
    return button;
}

/**
 * Función auxiliar para crear botones de acción
 * @param {string} title - Título del botón (tooltip)
 * @param {string} text - Texto del botón
 * @param {Function} onClick - Función a ejecutar al hacer clic
 * @returns {HTMLElement} - El botón configurado
 */
function createActionButton(title, text, onClick) {
    const button = document.createElement('button');
    button.title = title;
    button.textContent = text;
    button.style.background = 'rgba(255,255,255,0.2)';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.padding = '0.5rem';
    button.style.fontSize = '1rem';
    button.style.cursor = 'pointer';
    button.style.display = 'flex';
    button.style.justifyContent = 'center';
    button.style.alignItems = 'center';
    button.style.transition = 'background-color 0.2s';
    
    button.addEventListener('mouseover', function() {
        this.style.backgroundColor = 'rgba(255,255,255,0.3)';
    });
    
    button.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'rgba(255,255,255,0.2)';
    });
    
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        onClick();
    });
    
    return button;
}

/**
 * Crea un componente de galería de imágenes con lightbox mejorado
 * @param {Object[]} images - Array de objetos con src, alt y opcionalmente caption para cada imagen
 * @param {Object} options - Opciones de configuración
 * @returns {HTMLElement} - El elemento galería configurado
 */
export function createGallery(images = [], options = {}) {
    const defaultOptions = {
        containerId: '',
        containerClass: 'gallery-container',
        imageContainerClass: 'gallery-item',
        imageClass: 'gallery-image',
        lightboxClass: 'lightbox',
        captionClass: 'lightbox-caption',
        lazyLoad: true,                  // Cargar imágenes perezosamente
        aspectRatio: 'square',           // 'square', 'landscape', 'portrait', 'original'
        hoverEffect: 'zoom',             // 'zoom', 'brighten', 'darken', 'none'
        columns: {
            mobile: 2,                    // Columnas en móvil
            tablet: 3,                    // Columnas en tablet
            desktop: 4                    // Columnas en escritorio
        },
        showCount: true,                 // Mostrar contador de imágenes
        enableKeyboardNavigation: true,  // Habilitar navegación por teclado
        enableZoom: true,                // Habilitar zoom
        enableFullscreen: true,          // Habilitar modo pantalla completa
        enableDownload: false,           // Habilitar descarga de imágenes
        enableShare: false,              // Habilitar compartir imágenes
        showThumbnails: false,           // Mostrar miniaturas en lightbox
        autoplaySlideshow: false,        // Reproducir presentación automáticamente
        slideshowSpeed: 5000             // Velocidad de presentación en ms
    };

    const config = { ...defaultOptions, ...options };
    
    // Crear el contenedor de la galería
    const container = document.createElement('div');
    if (config.containerId) container.id = config.containerId;
    container.className = config.containerClass;
    
    // Aplicar estilos de cuadrícula basados en la configuración de columnas
    container.style.display = 'grid';
    container.style.gap = '1rem';
    container.style.gridTemplateColumns = `repeat(${config.columns.mobile}, 1fr)`;
    
    // Estilos responsivos para diferentes tamaños de pantalla
    const mediaQueryTablet = window.matchMedia('(min-width: 768px)');
    const mediaQueryDesktop = window.matchMedia('(min-width: 1024px)');
    
    if (mediaQueryTablet.matches) {
        container.style.gridTemplateColumns = `repeat(${config.columns.tablet}, 1fr)`;
    }
    
    if (mediaQueryDesktop.matches) {
        container.style.gridTemplateColumns = `repeat(${config.columns.desktop}, 1fr)`;
    }
    
    // Escuchar cambios en el tamaño de la ventana
    window.addEventListener('resize', () => {
        if (mediaQueryDesktop.matches) {
            container.style.gridTemplateColumns = `repeat(${config.columns.desktop}, 1fr)`;
        } else if (mediaQueryTablet.matches) {
            container.style.gridTemplateColumns = `repeat(${config.columns.tablet}, 1fr)`;
        } else {
            container.style.gridTemplateColumns = `repeat(${config.columns.mobile}, 1fr)`;
        }
    });
    
    // Crear cada imagen en la galería
    images.forEach((image, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = config.imageContainerClass;
        
        // Aplicar estilos de relación de aspecto
        imgContainer.style.overflow = 'hidden';
        imgContainer.style.borderRadius = '0.375rem';
        imgContainer.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.1)';
        imgContainer.style.transition = 'all 0.3s ease';
        imgContainer.style.cursor = 'pointer';
        
        // Aplicar relación de aspecto
        if (config.aspectRatio !== 'original') {
            imgContainer.style.position = 'relative';
            
            if (config.aspectRatio === 'square') {
                imgContainer.style.paddingBottom = '100%'; // 1:1
            } else if (config.aspectRatio === 'landscape') {
                imgContainer.style.paddingBottom = '75%';  // 4:3
            } else if (config.aspectRatio === 'portrait') {
                imgContainer.style.paddingBottom = '133.33%'; // 3:4
            }
        }
        
        // Crear la imagen
        const img = document.createElement('img');
        
        // Configurar carga perezosa si está habilitada
        if (config.lazyLoad) {
            img.loading = 'lazy';
            img.setAttribute('data-src', image.src);
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'; // Placeholder transparente
            
            // Observador de intersección para cargar imágenes cuando sean visibles
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.getAttribute('data-src');
                        observer.unobserve(lazyImage);
                    }
                });
            }, { rootMargin: '100px' });
            
            observer.observe(img);
        } else {
            img.src = image.src;
        }
        
        img.alt = image.alt || `Imagen ${index + 1}`;
        img.className = config.imageClass;
        
        // Aplicar estilos a la imagen
        if (config.aspectRatio !== 'original') {
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
        } else {
            img.style.width = '100%';
            img.style.display = 'block';
        }
        
        // Aplicar efecto hover
        if (config.hoverEffect === 'zoom') {
            img.style.transition = 'transform 0.3s ease';
            imgContainer.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.1)';
            });
            imgContainer.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        } else if (config.hoverEffect === 'brighten') {
            img.style.transition = 'filter 0.3s ease';
            imgContainer.addEventListener('mouseenter', () => {
                img.style.filter = 'brightness(1.2)';
            });
            imgContainer.addEventListener('mouseleave', () => {
                img.style.filter = 'brightness(1)';
            });
        } else if (config.hoverEffect === 'darken') {
            img.style.transition = 'filter 0.3s ease';
            imgContainer.addEventListener('mouseenter', () => {
                img.style.filter = 'brightness(0.8)';
            });
            imgContainer.addEventListener('mouseleave', () => {
                img.style.filter = 'brightness(1)';
            });
        }
        
        // Añadir leyenda si existe (como overlay)
        if (image.caption) {
            const captionOverlay = document.createElement('div');
            captionOverlay.className = 'caption-overlay';
            captionOverlay.style.position = 'absolute';
            captionOverlay.style.bottom = '0';
            captionOverlay.style.left = '0';
            captionOverlay.style.right = '0';
            captionOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
            captionOverlay.style.color = 'white';
            captionOverlay.style.padding = '0.5rem';
            captionOverlay.style.fontSize = '0.875rem';
            captionOverlay.style.opacity = '0';
            captionOverlay.style.transition = 'opacity 0.3s ease';
            captionOverlay.textContent = image.caption;
            
            imgContainer.addEventListener('mouseenter', () => {
                captionOverlay.style.opacity = '1';
            });
            
            imgContainer.addEventListener('mouseleave', () => {
                captionOverlay.style.opacity = '0';
            });
            
            if (config.aspectRatio === 'original') {
                captionOverlay.style.position = 'relative';
                captionOverlay.style.opacity = '1';
            }
            
            imgContainer.appendChild(captionOverlay);
        }
        
        // Configurar el lightbox al hacer clic
        imgContainer.addEventListener('click', function() {
            // Crear el contenedor del lightbox
            const lightbox = document.createElement('div');
            lightbox.className = config.lightboxClass;
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.flexDirection = 'column';
            lightbox.style.justifyContent = 'center';
            lightbox.style.alignItems = 'center';
            lightbox.style.zIndex = '1000';
            lightbox.style.opacity = '0';
            lightbox.style.transition = 'opacity 0.3s ease';
            
            // Contenedor principal para la imagen y controles
            const contentContainer = document.createElement('div');
            contentContainer.style.position = 'relative';
            contentContainer.style.width = '100%';
            contentContainer.style.height = '100%';
            contentContainer.style.display = 'flex';
            contentContainer.style.flexDirection = 'column';
            contentContainer.style.justifyContent = 'center';
            contentContainer.style.alignItems = 'center';
            
            // Crear la imagen ampliada
            const imgClone = document.createElement('img');
            imgClone.src = image.src;
            imgClone.style.maxWidth = '90%';
            imgClone.style.maxHeight = '80%';
            imgClone.style.objectFit = 'contain';
            imgClone.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            imgClone.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
            
            // Añadir leyenda si existe
            let caption;
            if (image.caption) {
                caption = document.createElement('div');
                caption.className = config.captionClass;
                caption.textContent = image.caption;
                caption.style.color = 'white';
                caption.style.textAlign = 'center';
                caption.style.padding = '1rem';
                caption.style.maxWidth = '80%';
                caption.style.margin = '1rem auto';
            }
            
            // Barra superior con controles
            const topBar = document.createElement('div');
            topBar.style.position = 'absolute';
            topBar.style.top = '0';
            topBar.style.left = '0';
            topBar.style.right = '0';
            topBar.style.display = 'flex';
            topBar.style.justifyContent = 'space-between';
            topBar.style.padding = '1rem';
            topBar.style.backgroundColor = 'rgba(0,0,0,0.5)';
            topBar.style.zIndex = '1010';
            
            // Contador de imágenes
            if (config.showCount && images.length > 1) {
                const counter = document.createElement('div');
                counter.textContent = `${index + 1} / ${images.length}`;
                counter.style.color = 'white';
                counter.style.padding = '0.5rem 1rem';
                counter.style.borderRadius = '4px';
                counter.style.backgroundColor = 'rgba(0,0,0,0.5)';
                topBar.appendChild(counter);
            } else {
                // Espacio vacío para mantener el layout
                const spacer = document.createElement('div');
                topBar.appendChild(spacer);
            }
            
            // Contenedor de botones de acción
            const actionButtons = document.createElement('div');
            actionButtons.style.display = 'flex';
            actionButtons.style.gap = '0.5rem';
            
            // Botón de pantalla completa
            if (config.enableFullscreen) {
                const fullscreenButton = createActionButton('Pantalla completa', '⛶', () => {
                    if (!document.fullscreenElement) {
                        lightbox.requestFullscreen().catch(err => {
                            console.error(`Error al intentar mostrar en pantalla completa: ${err.message}`);
                        });
                    } else {
                        document.exitFullscreen();
                    }
                });
                actionButtons.appendChild(fullscreenButton);
            }
            
            // Botón de descarga
            if (config.enableDownload) {
                const downloadButton = createActionButton('Descargar', '↓', () => {
                    const link = document.createElement('a');
                    link.href = imgClone.src;
                    link.download = image.alt || `imagen-${index + 1}`;
                    link.click();
                });
                actionButtons.appendChild(downloadButton);
            }
            
            // Botón de cierre
            const closeButton = createActionButton('Cerrar', '×', () => {
                closeLightbox(lightbox);
            });
            closeButton.style.marginLeft = '1rem';
            actionButtons.appendChild(closeButton);
            
            topBar.appendChild(actionButtons);
            
            // Añadir elementos al lightbox
            contentContainer.appendChild(imgClone);
            if (caption) contentContainer.appendChild(caption);
            
            // Función para cerrar el lightbox con animación
            function closeLightbox(lb) {
                lb.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(lb)) {
                        // Disparar evento personalizado antes de eliminar
                        lb.dispatchEvent(new CustomEvent('close'));
                        document.body.removeChild(lb);
                    }
                    // Restaurar el scroll del body
                    document.body.style.overflow = '';
                }, 300);
            }
            
            // Añadir controles de navegación si hay más de una imagen
            if (images.length > 1) {
                // Contenedor de navegación
                const navContainer = document.createElement('div');
                navContainer.style.position = 'absolute';
                navContainer.style.top = '50%';
                navContainer.style.left = '0';
                navContainer.style.right = '0';
                navContainer.style.transform = 'translateY(-50%)';
                navContainer.style.display = 'flex';
                navContainer.style.justifyContent = 'space-between';
                navContainer.style.padding = '0 2rem';
                navContainer.style.pointerEvents = 'none'; // Para que los clics pasen a través del contenedor
                
                // Botón anterior
                const prevButton = createNavigationButton('←', () => {
                    navigateToImage((index - 1 + images.length) % images.length);
                });
                prevButton.style.pointerEvents = 'auto'; // Habilitar clics en el botón
                
                // Botón siguiente
                const nextButton = createNavigationButton('→', () => {
                    navigateToImage((index + 1) % images.length);
                });
                nextButton.style.pointerEvents = 'auto'; // Habilitar clics en el botón
                
                navContainer.appendChild(prevButton);
                navContainer.appendChild(nextButton);
                contentContainer.appendChild(navContainer);
                
                // Función para navegar a una imagen específica
                function navigateToImage(newIndex) {
                    // Animación de salida
                    imgClone.style.opacity = '0';
                    imgClone.style.transform = 'scale(0.9)';
                    
                    setTimeout(() => {
                        // Cambiar la imagen
                        imgClone.src = images[newIndex].src;
                        
                        // Actualizar contador
                        if (config.showCount) {
                            const counter = topBar.querySelector('div');
                            counter.textContent = `${newIndex + 1} / ${images.length}`;
                        }
                        
                        // Actualizar leyenda
                        if (caption) {
                            if (images[newIndex].caption) {
                                caption.textContent = images[newIndex].caption;
                                caption.style.display = 'block';
                            } else {
                                caption.style.display = 'none';
                            }
                        } else if (images[newIndex].caption) {
                            const newCaption = document.createElement('div');
                            newCaption.className = config.captionClass;
                            newCaption.textContent = images[newIndex].caption;
                            newCaption.style.color = 'white';
                            newCaption.style.textAlign = 'center';
                            newCaption.style.padding = '1rem';
                            newCaption.style.maxWidth = '80%';
                            newCaption.style.margin = '1rem auto';
                            caption = newCaption;
                            contentContainer.appendChild(caption);
                        }
                        
                        // Animación de entrada
                        setTimeout(() => {
                            imgClone.style.opacity = '1';
                            imgClone.style.transform = 'scale(1)';
                        }, 50);
                        
                        // Actualizar índice actual
                        index = newIndex;
                    }, 200);
                }
                
                // Configurar navegación por teclado
                if (config.enableKeyboardNavigation) {
                    const handleKeyDown = (e) => {
                        switch(e.key) {
                            case 'ArrowLeft':
                                e.preventDefault();
                                navigateToImage((index - 1 + images.length) % images.length);
                                break;
                            case 'ArrowRight':
                                e.preventDefault();
                                navigateToImage((index + 1) % images.length);
                                break;
                            case 'Escape':
                                e.preventDefault();
                                closeLightbox(lightbox);
                                break;
                            case '+':
                            case '=':
                                if (config.enableZoom) {
                                    e.preventDefault();
                                    zoomImage(0.1);
                                }
                                break;
                            case '-':
                                if (config.enableZoom) {
                                    e.preventDefault();
                                    zoomImage(-0.1);
                                }
                                break;
                            case '0':
                                if (config.enableZoom) {
                                    e.preventDefault();
                                    resetZoom();
                                }
                                break;
                        }
                    };
                    
                    document.addEventListener('keydown', handleKeyDown);
                    
                    // Limpiar eventos al cerrar
                    lightbox.addEventListener('close', () => {
                        document.removeEventListener('keydown', handleKeyDown);
                    });
                }
                
                // Configurar presentación automática si está habilitada
                let slideshowInterval;
                if (config.autoplaySlideshow) {
                    const startSlideshow = () => {
                        slideshowInterval = setInterval(() => {
                            navigateToImage((index + 1) % images.length);
                        }, config.slideshowSpeed);
                    };
                    
                    startSlideshow();
                    
                    // Pausar al interactuar
                    lightbox.addEventListener('mousemove', () => {
                        clearInterval(slideshowInterval);
                        // Reiniciar después de 3 segundos de inactividad
                        setTimeout(startSlideshow, 3000);
                    });
                    
                    // Limpiar intervalo al cerrar
                    lightbox.addEventListener('close', () => {
                        clearInterval(slideshowInterval);
                    });
                }
            }
            
            // Funciones de zoom si está habilitado
            if (config.enableZoom) {
                let currentZoom = 1;
                const minZoom = 0.5;
                const maxZoom = 3;
                
                function zoomImage(delta) {
                    currentZoom = Math.min(maxZoom, Math.max(minZoom, currentZoom + delta));
                    imgClone.style.transform = `scale(${currentZoom})`;
                }
                
                function resetZoom() {
                    currentZoom = 1;
                    imgClone.style.transform = 'scale(1)';
                }
                
                // Manejar zoom con rueda del ratón
                imgClone.addEventListener('wheel', (e) => {
                    e.preventDefault();
                    const delta = e.deltaY > 0 ? -0.1 : 0.1;
                    zoomImage(delta);
                });
                
                // Soporte para gestos de pinch to zoom en dispositivos táctiles
                let initialDistance = 0;
                
                imgClone.addEventListener('touchstart', (e) => {
                    if (e.touches.length === 2) {
                        e.preventDefault();
                        initialDistance = Math.hypot(
                            e.touches[0].pageX - e.touches[1].pageX,
                            e.touches[0].pageY - e.touches[1].pageY
                        );
                    }
                }, { passive: false });
                
                imgClone.addEventListener('touchmove', (e) => {
                    if (e.touches.length === 2) {
                        e.preventDefault();
                        const currentDistance = Math.hypot(
                            e.touches[0].pageX - e.touches[1].pageX,
                            e.touches[0].pageY - e.touches[1].pageY
                        );
                        
                        if (initialDistance > 0) {
                            const delta = (currentDistance - initialDistance) / 100;
                            zoomImage(delta);
                            initialDistance = currentDistance;
                        }
                    }
                }, { passive: false });
            }
            
            // Evitar scroll en el body mientras el lightbox está abierto
            document.body.style.overflow = 'hidden';
            
            // Añadir elementos al DOM
            lightbox.appendChild(topBar);
            lightbox.appendChild(contentContainer);
            document.body.appendChild(lightbox);
            
            // Animar entrada
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Cerrar al hacer clic fuera de la imagen
            lightbox.addEventListener('click', function(e) {
                if (e.target === this || e.target === contentContainer) {
                    closeLightbox(lightbox);
                }
            });
        });
        
        // Añadir elementos al DOM
        imgContainer.appendChild(img);
        container.appendChild(imgContainer);
    });
    
    return container;
}

/**
 * Inserta un componente de galería en el DOM
 * @param {HTMLElement|string} container - Contenedor donde insertar la galería
 * @param {Object[]} images - Array de objetos con src, alt y opcionalmente caption para cada imagen
 * @param {Object} options - Opciones de configuración
 * @returns {HTMLElement} - El elemento galería insertado
 */
export function mountGallery(container, images = [], options = {}) {
    const targetContainer = typeof container === 'string' 
        ? document.querySelector(container) 
        : container;
    
    if (!targetContainer) {
        console.error('Contenedor de galería no encontrado');
        return null;
    }
    
    const gallery = createGallery(images, options);
    targetContainer.appendChild(gallery);
    
    return gallery;
}

// Exportar funciones auxiliares para uso externo si es necesario
export { createNavigationButton, createActionButton };
