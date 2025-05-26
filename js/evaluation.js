/**
 * JavaScript específico para la página de evaluación
 * Complementa el sistema de diseño unificado
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animaciones y componentes
    initProgressBars();
    initAccordions();
    initTabSystem();
    
    // Integrar con el sistema de diseño global
    if (typeof window.designSystem !== 'undefined' && window.designSystem.init) {
        window.designSystem.init();
    }
});

/**
 * Inicializa las barras de progreso con animación
 */
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const fill = bar.querySelector('.progress-fill');
        const targetWidth = fill.getAttribute('data-width') || '0%';
        
        // Inicialmente establecer a 0 para la animación
        fill.style.width = '0%';
        
        // Usar setTimeout para permitir que el navegador renderice primero
        setTimeout(() => {
            fill.style.width = targetWidth;
        }, 300);
    });
}

/**
 * Inicializa el sistema de acordeón para criterios de evaluación
 */
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Obtener el contenido del acordeón
            const content = this.nextElementSibling;
            
            // Alternar la clase activa en el encabezado
            this.classList.toggle('active');
            
            // Alternar la visibilidad del contenido
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.opacity = '0';
                this.querySelector('.accordion-icon').classList.remove('rotate');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                this.querySelector('.accordion-icon').classList.add('rotate');
            }
        });
    });
}

/**
 * Inicializa el sistema de pestañas para diferentes secciones de evaluación
 */
function initTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover la clase activa de todos los botones
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir la clase activa al botón actual
            this.classList.add('active');
            
            // Obtener el ID del contenido de la pestaña
            const tabId = this.getAttribute('data-tab');
            
            // Ocultar todos los contenidos de pestañas
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // Mostrar el contenido de la pestaña seleccionada
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
                activeTab.style.display = 'block';
                
                // Reiniciar las animaciones AOS en el contenido visible
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            }
        });
    });
    
    // Activar la primera pestaña por defecto
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
}

/**
 * Actualiza las barras de progreso basadas en datos dinámicos
 * @param {string} selector - Selector CSS para la barra de progreso
 * @param {number} value - Valor de progreso (0-100)
 */
function updateProgressBar(selector, value) {
    const progressBar = document.querySelector(selector);
    if (!progressBar) return;
    
    const fill = progressBar.querySelector('.progress-fill');
    const valueDisplay = progressBar.parentElement.querySelector('.progress-value');
    
    // Actualizar la barra de progreso
    fill.style.width = `${value}%`;
    
    // Actualizar el texto de valor si existe
    if (valueDisplay) {
        valueDisplay.textContent = `${value}%`;
    }
}

/**
 * Crea una animación de conteo para números
 * @param {string} selector - Selector CSS para el elemento
 * @param {number} target - Número objetivo
 * @param {number} duration - Duración en milisegundos
 */
function animateCounter(selector, target, duration = 1500) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            return;
        }
        
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
    }
    
    updateCounter();
}

// Exportar funciones para uso externo
window.evaluationSystem = {
    updateProgressBar,
    animateCounter,
    initProgressBars,
    initAccordions,
    initTabSystem
};
