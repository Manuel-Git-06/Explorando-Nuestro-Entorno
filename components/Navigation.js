/**
 * Navigation.js - Componente de navegación reutilizable
 * Parte de la modernización gradual del proyecto Planificación Revés
 */

/**
 * Crea y configura el componente de navegación
 * @param {Object} options - Opciones de configuración
 * @returns {HTMLElement} - El elemento de navegación configurado
 */
export function createNavigation(options = {}) {
    const defaultOptions = {
        logoSrc: 'assets/images/logo.png',
        title: 'Explorando Nuestro Entorno',
        links: [
            { href: '#portada', text: 'Portada' },
            { href: '#datos', text: 'Datos' },
            { href: '#situacion', text: 'Situación' },
            { href: '#competencias', text: 'Competencias' },
            { href: '#contenidos', text: 'Contenidos' },
            { href: '#indicadores', text: 'Indicadores' },
            { href: '#secuencia', text: 'Secuencia' },
            { href: '#evaluacion', text: 'Evaluación' },
            { href: '#anexos', text: 'Anexos' }
        ],
        containerId: 'navbar',
        activeClass: 'active'
    };

    const config = { ...defaultOptions, ...options };
    
    // Crear el elemento de navegación
    const nav = document.createElement('nav');
    nav.id = config.containerId;
    nav.className = 'fixed top-0 left-0 w-full bg-white shadow z-50';
    
    // Crear el contenido interno
    nav.innerHTML = `
        <div class="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
            <div class="flex items-center gap-2">
                <img src="${config.logoSrc}" alt="Logo" class="h-10 w-10 rounded-full" />
                <span class="font-bold text-lg">${config.title}</span>
            </div>
            <button class="mobile-menu-btn p-2 rounded bg-gray-100 lg:hidden" aria-label="Menú de navegación" title="Abrir menú de navegación">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                <span class="sr-only">Abrir menú</span>
            </button>
            <ul class="flex gap-4" id="nav-links">
                ${config.links.map(link => `
                    <li><a href="${link.href}" class="nav-link">${link.text}</a></li>
                `).join('')}
            </ul>
        </div>
    `;
    
    // Configurar el comportamiento del menú móvil
    const mobileMenuBtn = nav.querySelector('.mobile-menu-btn');
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('expanded');
    });
    
    // Configurar el scroll-spy para los enlaces
    const navLinks = nav.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100; // Offset para mejor detección
        
        // Encontrar todas las secciones referenciadas en los enlaces
        const sections = Array.from(navLinks).map(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const section = document.querySelector(href);
                return section ? { id: href.substring(1), element: section, link } : null;
            }
            return null;
        }).filter(Boolean);
        
        // Determinar qué sección está actualmente visible
        let currentSection = null;
        
        for (const section of sections) {
            const sectionTop = section.element.offsetTop;
            const sectionBottom = sectionTop + section.element.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section;
                break;
            }
        }
        
        // Si no hay sección visible y estamos al inicio, seleccionar la primera
        if (!currentSection && scrollPosition < sections[0]?.element.offsetTop) {
            currentSection = sections[0];
        }
        
        // Actualizar clases activas
        navLinks.forEach(link => link.classList.remove(config.activeClass));
        if (currentSection) {
            currentSection.link.classList.add(config.activeClass);
        }
    }
    
    // Inicializar y configurar eventos
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);
    
    return nav;
}

/**
 * Inserta el componente de navegación en el DOM
 * @param {HTMLElement|string} container - Contenedor donde insertar la navegación
 * @param {Object} options - Opciones de configuración
 * @returns {HTMLElement} - El elemento de navegación insertado
 */
export function mountNavigation(container, options = {}) {
    const targetContainer = typeof container === 'string' 
        ? document.querySelector(container) 
        : container;
    
    if (!targetContainer) {
        console.error('Contenedor de navegación no encontrado');
        return null;
    }
    
    const nav = createNavigation(options);
    
    // Insertar al inicio del contenedor
    if (targetContainer.firstChild) {
        targetContainer.insertBefore(nav, targetContainer.firstChild);
    } else {
        targetContainer.appendChild(nav);
    }
    
    return nav;
}
