/**
 * Tabs.js - Componente de pestañas reutilizable
 * Parte de la modernización gradual del proyecto Planificación Revés
 */

/**
 * Crea un componente de pestañas con múltiples paneles
 * @param {Object[]} items - Array de objetos con título y contenido para cada pestaña
 * @param {Object} options - Opciones de configuración
 * @returns {HTMLElement} - El elemento contenedor de pestañas configurado
 */
export function createTabs(items = [], options = {}) {
    const defaultOptions = {
        containerId: '',
        containerClass: '',
        tabsContainerClass: 'tabs',
        tabButtonClass: 'tablink',
        tabContentClass: 'tabcontent',
        activeClass: 'active',
        hiddenClass: 'hidden',
        initialActiveIndex: 0 // Índice de la pestaña activa inicialmente
    };

    const config = { ...defaultOptions, ...options };
    
    // Crear el contenedor principal
    const container = document.createElement('div');
    if (config.containerId) container.id = config.containerId;
    if (config.containerClass) container.className = config.containerClass;
    
    // Crear el contenedor de botones de pestañas
    const tabsContainer = document.createElement('div');
    tabsContainer.className = config.tabsContainerClass;
    
    // Crear los botones de pestañas y los contenidos
    const tabContents = [];
    
    items.forEach((item, index) => {
        // Crear el botón de la pestaña
        const tabButton = document.createElement('button');
        tabButton.className = config.tabButtonClass;
        tabButton.textContent = item.title;
        tabButton.setAttribute('data-tab', `tab-${index}`);
        
        // Crear el contenido de la pestaña
        const tabContent = document.createElement('div');
        tabContent.id = `tab-${index}`;
        tabContent.className = config.tabContentClass;
        
        // Si es HTML, usar innerHTML, de lo contrario usar textContent
        if (typeof item.content === 'string' && item.content.trim().startsWith('<')) {
            tabContent.innerHTML = item.content;
        } else if (typeof item.content === 'string') {
            tabContent.textContent = item.content;
        } else if (item.content instanceof HTMLElement) {
            tabContent.appendChild(item.content);
        }
        
        // Configurar estado inicial (activo/oculto)
        if (index === config.initialActiveIndex) {
            tabButton.classList.add(config.activeClass);
        } else {
            tabContent.classList.add(config.hiddenClass);
        }
        
        // Configurar el evento click para cambiar de pestaña
        tabButton.addEventListener('click', function() {
            // Desactivar todas las pestañas
            const allButtons = tabsContainer.querySelectorAll(`.${config.tabButtonClass}`);
            allButtons.forEach(btn => btn.classList.remove(config.activeClass));
            
            // Ocultar todos los contenidos
            tabContents.forEach(content => content.classList.add(config.hiddenClass));
            
            // Activar la pestaña actual
            this.classList.add(config.activeClass);
            tabContent.classList.remove(config.hiddenClass);
        });
        
        // Añadir elementos a sus contenedores
        tabsContainer.appendChild(tabButton);
        tabContents.push(tabContent);
    });
    
    // Ensamblar el componente
    container.appendChild(tabsContainer);
    tabContents.forEach(content => container.appendChild(content));
    
    return container;
}

/**
 * Inserta un componente de pestañas en el DOM
 * @param {HTMLElement|string} container - Contenedor donde insertar las pestañas
 * @param {Object[]} items - Array de objetos con título y contenido para cada pestaña
 * @param {Object} options - Opciones de configuración
 * @returns {HTMLElement} - El elemento de pestañas insertado
 */
export function mountTabs(container, items = [], options = {}) {
    const targetContainer = typeof container === 'string' 
        ? document.querySelector(container) 
        : container;
    
    if (!targetContainer) {
        console.error('Contenedor de pestañas no encontrado');
        return null;
    }
    
    const tabs = createTabs(items, options);
    targetContainer.appendChild(tabs);
    
    return tabs;
}
