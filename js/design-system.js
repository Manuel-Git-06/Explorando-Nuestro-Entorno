/**
 * design-system.js
 * Comportamientos interactivos para el sistema de diseño del proyecto "Explorando Nuestro Entorno"
 * 
 * Este archivo implementa efectos visuales y comportamientos interactivos para complementar
 * nuestro sistema de diseño, manteniendo el concepto dinámico, moderno y educativo.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todos los componentes interactivos
    initNavbar();
    initTabs();
    initCards();
    initTooltips();
    initProgressBars();
    initAnimations();
    initScrollEffects();
    initThemeToggle();
});

/**
 * Inicializa el comportamiento de la barra de navegación
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Añadir clase cuando se hace scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Manejar el menú móvil
    const menuToggle = document.querySelector('.navbar-toggle');
    const mobileMenu = document.querySelector('.navbar-collapse');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
            menuToggle.classList.toggle('active');
        });
    }

    // Resaltar el enlace activo basado en la URL actual
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || currentPath.endsWith(href)) {
            link.classList.add('active');
        }
    });
}

/**
 * Inicializa el sistema de pestañas
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab');
    if (!tabButtons.length) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Desactivar todas las pestañas
            const tabsContainer = button.closest('.tabs');
            const tabsContent = document.querySelector(`[data-tabs="${tabsContainer.dataset.tabs}"]`);
            
            if (!tabsContent) return;
            
            const allButtons = tabsContainer.querySelectorAll('.tab');
            const allContents = tabsContent.querySelectorAll('.tab-content');
            
            allButtons.forEach(btn => btn.classList.remove('active'));
            allContents.forEach(content => {
                content.classList.remove('active');
                content.classList.remove('animate-fadeIn');
            });
            
            // Activar la pestaña seleccionada
            button.classList.add('active');
            const targetId = button.dataset.tab;
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.classList.add('animate-fadeIn');
            }
        });
    });

    // Activar la primera pestaña por defecto
    const tabContainers = document.querySelectorAll('.tabs');
    tabContainers.forEach(container => {
        const firstTab = container.querySelector('.tab');
        if (firstTab) {
            firstTab.click();
        }
    });
}

/**
 * Inicializa efectos para las tarjetas
 */
function initCards() {
    const cards = document.querySelectorAll('.card');
    if (!cards.length) return;

    cards.forEach(card => {
        // Efecto de elevación al pasar el mouse
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow-md)';
        });
    });
}

/**
 * Inicializa los tooltips
 */
function initTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    if (!tooltips.length) return;
    
    tooltips.forEach(tooltip => {
        // Asegurarse de que los tooltips no se salgan de la pantalla
        tooltip.addEventListener('mouseenter', () => {
            const tooltipText = tooltip.querySelector('.tooltip-text');
            if (tooltipText) {
                const rect = tooltipText.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                
                if (rect.right > viewportWidth) {
                    tooltipText.style.left = 'auto';
                    tooltipText.style.right = '0';
                    tooltipText.style.transform = 'translateX(0)';
                }
            }
        });
    });
}

/**
 * Inicializa las barras de progreso con animación
 */
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    if (!progressBars.length) return;
    
    // Función para animar las barras de progreso cuando son visibles
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = (
                rect.top >= 0 &&
                rect.bottom <= window.innerHeight
            );
            
            if (isVisible) {
                const targetWidth = bar.getAttribute('data-width') || '0';
                bar.style.width = targetWidth;
            }
        });
    };
    
    // Configurar observador de intersección para las barras de progreso
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-width') || '0';
                    bar.style.width = targetWidth;
                    
                    // Dejar de observar una vez animada
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.2 });
        
        progressBars.forEach(bar => observer.observe(bar));
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        window.addEventListener('scroll', animateProgressBars);
        animateProgressBars(); // Ejecutar una vez al cargar
    }
}

/**
 * Inicializa animaciones basadas en el scroll
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animation]');
    if (!animatedElements.length) return;
    
    // Configurar observador de intersección para elementos animados
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.animation;
                    const delay = element.dataset.delay || '0s';
                    
                    element.style.animationDelay = delay;
                    element.classList.add(`animate-${animation}`);
                    
                    // Dejar de observar una vez animado
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => observer.observe(element));
    }
}

/**
 * Inicializa efectos de scroll
 */
function initScrollEffects() {
    // Desplazamiento suave para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Botón de volver arriba
    const scrollTopButton = document.querySelector('.scroll-top');
    if (scrollTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopButton.classList.add('show');
            } else {
                scrollTopButton.classList.remove('show');
            }
        });
        
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Inicializa el selector de tema (claro/oscuro)
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    // Verificar la preferencia del usuario
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        themeToggle.classList.add('active');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeToggle.classList.toggle('active');
        
        // Guardar la preferencia del usuario
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

/**
 * Crea un elemento con clases
 * @param {string} tag - Etiqueta HTML
 * @param {string[]} classes - Clases CSS
 * @param {string} text - Texto del elemento
 * @returns {HTMLElement}
 */
function createElement(tag, classes = [], text = '') {
    const element = document.createElement(tag);
    
    if (classes.length) {
        element.classList.add(...classes);
    }
    
    if (text) {
        element.textContent = text;
    }
    
    return element;
}

/**
 * Genera un color aleatorio para avatares
 * @returns {string} Color en formato hexadecimal sin #
 */
function getRandomColor() {
    const colors = [
        '3b82f6', // primary
        '10b981', // secondary
        '8b5cf6', // accent
        'f59e0b', // warning
        'ef4444'  // error
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Verifica si un elemento está en el viewport
 * @param {HTMLElement} element - Elemento a verificar
 * @returns {boolean}
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Debounce para mejorar el rendimiento de eventos como scroll o resize
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function}
 */
function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
