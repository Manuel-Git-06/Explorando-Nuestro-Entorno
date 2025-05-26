/**
 * navigation.js - Utilidades para navegación y componentes interactivos
 * Parte de la modernización gradual del proyecto Planificación Revés
 */

/**
 * Configura la navegación con scroll-spy
 * @param {string} navSelector - Selector para el elemento de navegación
 * @param {string} linkSelector - Selector para los enlaces de navegación
 * @param {string} activeClass - Clase CSS para marcar el enlace activo
 */
export function setupScrollSpy(navSelector = '#navbar', linkSelector = '.nav-link', activeClass = 'active') {
    const navLinks = document.querySelectorAll(linkSelector);
    const sections = [];
    
    // Recopilar todas las secciones referenciadas en los enlaces
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const section = document.querySelector(href);
            if (section) {
                sections.push({ id: href.substring(1), element: section, link });
            }
        }
    });
    
    // Función para verificar qué sección está en la vista
    function checkSections() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.element.offsetTop;
            const sectionBottom = sectionTop + section.element.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove(activeClass));
                section.link.classList.add(activeClass);
            }
        });
    }
    
    // Verificar al cargar y al hacer scroll
    window.addEventListener('load', checkSections);
    window.addEventListener('scroll', checkSections);
}

/**
 * Configura el menú móvil
 * @param {string} buttonSelector - Selector para el botón del menú móvil
 * @param {string} navbarSelector - Selector para el elemento de navegación
 * @param {string} expandedClass - Clase CSS para marcar el menú expandido
 */
export function setupMobileMenu(buttonSelector = '.mobile-menu-btn', navbarSelector = '#navbar', expandedClass = 'expanded') {
    const mobileMenuBtn = document.querySelector(buttonSelector);
    const navbar = document.querySelector(navbarSelector);
    
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', () => {
            navbar.classList.toggle(expandedClass);
        });
    }
}

/**
 * Configura el sistema de acordeón
 * @param {string} accordionSelector - Selector para los botones de acordeón
 * @param {string} activeClass - Clase CSS para marcar el acordeón activo
 */
export function setupAccordion(accordionSelector = '.accordion', activeClass = 'active') {
    const accordions = document.querySelectorAll(accordionSelector);
    
    accordions.forEach((btn) => {
        btn.addEventListener('click', function () {
            this.classList.toggle(activeClass);
            const panel = this.nextElementSibling;
            
            if (panel.style.display === 'block') {
                panel.style.display = 'none';
            } else {
                panel.style.display = 'block';
                panel.classList.add('show');
            }
        });
    });
}

/**
 * Configura el sistema de pestañas
 * @param {string} tablinkSelector - Selector para los botones de pestañas
 * @param {string} tabcontentSelector - Selector para los contenidos de pestañas
 * @param {string} activeClass - Clase CSS para marcar la pestaña activa
 * @param {string} hiddenClass - Clase CSS para ocultar contenido
 */
export function setupTabs(tablinkSelector = '.tablink', tabcontentSelector = '.tabcontent', activeClass = 'active', hiddenClass = 'hidden') {
    const tablinks = document.querySelectorAll(tablinkSelector);
    const tabcontents = document.querySelectorAll(tabcontentSelector);
    
    tablinks.forEach((btn) => {
        btn.addEventListener('click', function () {
            tablinks.forEach(l => l.classList.remove(activeClass));
            this.classList.add(activeClass);
            
            const tab = this.getAttribute('data-tab');
            tabcontents.forEach(tc => {
                tc.classList.add(hiddenClass);
                if (tc.id === tab) tc.classList.remove(hiddenClass);
            });
        });
    });
    
    // Mostrar la primera pestaña por defecto
    if (tablinks.length && tabcontents.length) {
        tablinks[0].classList.add(activeClass);
        tabcontents[0].classList.remove(hiddenClass);
    }
}
