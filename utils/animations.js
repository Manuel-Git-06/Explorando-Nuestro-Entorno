/**
 * animations.js - Utilidades para animaciones y efectos visuales
 * Parte de la modernización gradual del proyecto Planificación Revés
 */

/**
 * Configura las animaciones de aparición al hacer scroll
 * @param {string} selector - Selector CSS para los elementos a animar
 * @param {Object} options - Opciones para el IntersectionObserver
 */
export function setupFadeInAnimations(selector = '.fade-in', options = { threshold: 0.1 }) {
    const fadeElements = document.querySelectorAll(selector);
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);
        
        fadeElements.forEach(el => {
            observer.observe(el);
        });
    }
}

/**
 * Crea un lightbox para visualizar imágenes
 * @param {HTMLElement} imageElement - Elemento de imagen que activó el lightbox
 */
export function createLightbox(imageElement) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';
    lightbox.style.display = 'flex';
    lightbox.style.justifyContent = 'center';
    lightbox.style.alignItems = 'center';
    lightbox.style.zIndex = '1000';
    
    const imgClone = document.createElement('img');
    imgClone.src = imageElement.src;
    imgClone.style.maxWidth = '90%';
    imgClone.style.maxHeight = '90%';
    imgClone.style.objectFit = 'contain';
    
    lightbox.appendChild(imgClone);
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
}

/**
 * Inicializa la biblioteca AOS si está disponible
 * @param {Object} options - Opciones de configuración para AOS
 */
export function initAOS(options = {}) {
    const defaultOptions = {
        duration: 800,
        easing: 'ease-in-out',
        once: true
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    if (typeof AOS !== 'undefined') {
        AOS.init(mergedOptions);
    }
}
