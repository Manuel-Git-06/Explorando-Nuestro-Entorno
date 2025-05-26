/**
 * Accordion.js - Componente de acordeón reutilizable
 * Parte de la modernización gradual del proyecto Planificación Revés
 */

/**
 * Crea un componente de acordeón con múltiples paneles
 * @param {Object[]} items - Array de objetos con título y contenido para cada panel
 * @param {Object} options - Opciones de configuración
 * @returns {HTMLElement} - El elemento acordeón configurado
 */
export function createAccordion(items = [], options = {}) {
    const defaultOptions = {
        containerId: '',
        containerClass: '',
        headerClass: 'accordion font-semibold',
        panelClass: 'panel',
        activeClass: 'active',
        showClass: 'show',
        initialExpandedIndex: -1 // -1 significa que ninguno está expandido inicialmente
    };

    const config = { ...defaultOptions, ...options };
    
    // Crear el contenedor del acordeón
    const container = document.createElement('div');
    if (config.containerId) container.id = config.containerId;
    if (config.containerClass) container.className = config.containerClass;
    
    // Crear cada elemento del acordeón
    items.forEach((item, index) => {
        // Crear el botón/cabecera
        const button = document.createElement('button');
        button.className = config.headerClass;
        button.textContent = item.title;
        
        // Crear el panel de contenido
        const panel = document.createElement('div');
        panel.className = config.panelClass;
        
        // Si es HTML, usar innerHTML, de lo contrario usar textContent
        if (typeof item.content === 'string' && item.content.trim().startsWith('<')) {
            panel.innerHTML = item.content;
        } else if (typeof item.content === 'string') {
            panel.textContent = item.content;
        } else if (item.content instanceof HTMLElement) {
            panel.appendChild(item.content);
        }
        
        // Expandir inicialmente si es el índice especificado
        if (index === config.initialExpandedIndex) {
            button.classList.add(config.activeClass);
            panel.style.display = 'block';
            panel.classList.add(config.showClass);
        } else {
            panel.style.display = 'none';
        }
        
        // Configurar el comportamiento del acordeón
        button.addEventListener('click', function() {
            this.classList.toggle(config.activeClass);
            
            if (panel.style.display === 'block') {
                panel.style.display = 'none';
                setTimeout(() => {
                    panel.classList.remove(config.showClass);
                }, 10);
            } else {
                panel.style.display = 'block';
                setTimeout(() => {
                    panel.classList.add(config.showClass);
                }, 10);
            }
        });
        
        // Añadir elementos al contenedor
        container.appendChild(button);
        container.appendChild(panel);
    });
    
    return container;
}

/**
 * Inserta un componente de acordeón en el DOM
 * @param {HTMLElement|string} container - Contenedor donde insertar el acordeón
 * @param {Object[]} items - Array de objetos con título y contenido para cada panel
 * @param {Object} options - Opciones de configuración
 * @returns {HTMLElement} - El elemento acordeón insertado
 */
export function mountAccordion(container, items = [], options = {}) {
    const targetContainer = typeof container === 'string' 
        ? document.querySelector(container) 
        : container;
    
    if (!targetContainer) {
        console.error('Contenedor de acordeón no encontrado');
        return null;
    }
    
    const accordion = createAccordion(items, options);
    targetContainer.appendChild(accordion);
    
    return accordion;
}
