/**
 * JavaScript específico para la página de portada
 * Complementa el sistema de diseño unificado
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando cover-page.js');
    // Inicializar animaciones y componentes
    initCoverAnimations();
    initProjectCards();
    initSmoothScroll();
    initParallaxEffect();
    
    // Integrar con el sistema de diseño global
    if (typeof window.designSystem !== 'undefined' && window.designSystem.init) {
        window.designSystem.init();
    }
});

/**
 * Inicializa las animaciones de la portada
 */
function initCoverAnimations() {
    console.log('Aplicando animaciones a la portada');
    
    // Animación del título principal (en el index.html aparece como un h1 dentro de hero-content)
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        heroTitle.setAttribute('data-aos', 'fade-up');
        heroTitle.setAttribute('data-aos-duration', '1000');
    }
    
    // Animación del párrafo dentro de hero-content
    const heroDescription = document.querySelector('.hero-content p');
    if (heroDescription) {
        heroDescription.setAttribute('data-aos', 'fade-up');
        heroDescription.setAttribute('data-aos-duration', '1000');
        heroDescription.setAttribute('data-aos-delay', '400');
    }
    
    // Animación de los botones en el hero-content
    const buttonsContainer = document.querySelector('.hero-content .flex');
    if (buttonsContainer) {
        buttonsContainer.setAttribute('data-aos', 'fade-up');
        buttonsContainer.setAttribute('data-aos-duration', '1000');
        buttonsContainer.setAttribute('data-aos-delay', '600');
    }
    
    // Animación de las tarjetas de estadísticas
    const statCards = document.querySelectorAll('.hero-content .grid > div');
    statCards.forEach((card, index) => {
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-duration', '800');
        card.setAttribute('data-aos-delay', `${200 * (index + 1)}`);
    });
    
    // Aplicar animaciones a elementos del collage
    const collageItems = document.querySelectorAll('.collage-item');
    collageItems.forEach((item, index) => {
        item.setAttribute('data-aos', 'zoom-in');
        item.setAttribute('data-aos-duration', '1000');
        item.setAttribute('data-aos-delay', `${150 * index}`);
    });
    
    // Animación de palabras clave educativas en la portada
    const keywords = [
      'Impacto humano y salud',
      'Conciencia ambiental',
      'Educación transformadora',
      'Cambio positivo',
      'Futuro sostenible'
    ];
    let currentKeyword = 0;
    const keywordSpan = document.getElementById('animated-keywords');
    if (keywordSpan) {
      setInterval(() => {
        // Fade out
        keywordSpan.style.opacity = 0;
        setTimeout(() => {
          currentKeyword = (currentKeyword + 1) % keywords.length;
          keywordSpan.textContent = keywords[currentKeyword];
          // Fade in
          keywordSpan.style.opacity = 1;
        }, 400);
      }, 2000);
      // Inicializar opacidad
      keywordSpan.style.transition = 'opacity 0.4s';
    }
    
    // Añadir animaciones a cualquier card de navegación presente
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach((card, index) => {
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-duration', '800');
        card.setAttribute('data-aos-delay', `${150 * (index + 1)}`);
    });
}

/**
 * Inicializa las tarjetas de proyecto con efectos interactivos
 */
function initProjectCards() {
    const navCards = document.querySelectorAll('.nav-card');
    
    navCards.forEach(card => {
        // Efecto de hover 3D
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calcular la distancia desde el centro
            const distanceX = mouseX - cardCenterX;
            const distanceY = mouseY - cardCenterY;
            
            // Calcular el ángulo de rotación (limitado a 10 grados)
            const rotateY = Math.min(10, Math.max(-10, distanceX / 10));
            const rotateX = Math.min(10, Math.max(-10, -distanceY / 10));
            
            // Aplicar la transformación
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        // Restablecer la transformación al salir
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/**
 * Crea una animación de desplazamiento suave para los enlaces internos
 */
function initSmoothScroll() {
    console.log('Configurando smooth scroll para enlaces internos');
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    if (internalLinks.length === 0) {
        console.log('No se encontraron enlaces internos para smooth scroll');
        return;
    }
    
    console.log(`Configurando ${internalLinks.length} enlaces para smooth scroll`);
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Añadir compensación para la barra de navegación fija
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log(`Desplazamiento a ${targetId} completado`);
            } else {
                console.warn(`Elemento destino ${targetId} no encontrado`);
            }
        });
    });
}

/**
 * Inicializa el efecto de paralaje para el fondo
 */
function initParallaxEffect() {
    console.log('Configurando efecto parallax');
    // Intentar con diferentes selectores para encontrar el elemento de portada
    const coverSection = document.querySelector('.environmental-collage, #portada, .cover-section');
    
    if (!coverSection) {
        console.log('No se encontró la sección de portada para el efecto parallax');
        return;
    }
    
    console.log('Aplicando efecto parallax a la sección de portada');
    
    // Aplicar efecto parallax a los elementos del collage
    const collageItems = document.querySelectorAll('.collage-item');
    
    if (collageItems.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            collageItems.forEach((item, index) => {
                // Diferentes velocidades para crear profundidad
                const parallaxSpeed = 0.2 + (index * 0.05);
                const yOffset = scrollPosition * parallaxSpeed;
                
                // Aplicar transformación para mejor rendimiento
                item.style.transform = `translateY(${yOffset}px)`;
            });
        });
        
        console.log(`Efecto parallax aplicado a ${collageItems.length} elementos del collage`);
    } else {
        // Fallback para aplicar parallax a la sección completa
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const parallaxSpeed = 0.5;
            
            // Aplicar el efecto de paralaje al fondo
            coverSection.style.backgroundPositionY = `${scrollPosition * parallaxSpeed}px`;
        });
        
        console.log('Aplicando efecto parallax al fondo de la sección de portada');
    }
}

// Exportar funciones para uso externo
window.coverPage = {
    initCoverAnimations,
    initProjectCards,
    initSmoothScroll,
    initParallaxEffect
};
