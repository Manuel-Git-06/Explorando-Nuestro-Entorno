/**
 * sequence-animation.js
 * Script para añadir animaciones y funcionalidades dinámicas a la página de secuencia didáctica
 */

class SequenceAnimator {
  constructor() {
    // Referencias a elementos del DOM
    this.diagramElements = document.querySelectorAll('.proceso-diseno .fase');
    this.tabButtons = document.querySelectorAll('.tablink');
    this.tabContents = document.querySelectorAll('.tabcontent');
    this.accordionButtons = document.querySelectorAll('.accordion');
    
    // Estado actual
    this.currentPhase = 1;
    this.isAnimating = false;
    this.autoPlayEnabled = false;
    this.autoPlayInterval = null;
    
    // Inicializar
    this.init();
  }
  
  init() {
    // Inicializar pestañas
    this.setupTabs();
    
    // Inicializar acordeón mejorado
    this.setupAccordion();
    
    // Inicializar animaciones del diagrama
    this.setupDiagramAnimations();
    
    // Inicializar controles de reproducción automática
    this.setupAutoPlayControls();
    
    // Inicializar efectos de desplazamiento
    this.setupScrollEffects();
    
    // Mostrar la primera fase por defecto
    this.showPhase(1);
    
    console.log('Animador de secuencia didáctica inicializado');
  }
  
  setupTabs() {
    // Mejorar las pestañas con animaciones
    this.tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const tabId = button.getAttribute('data-tab');
        const phaseNumber = parseInt(tabId.replace('fase', ''));
        
        this.animatePhaseTransition(phaseNumber);
        
        // Actualizar clases activas
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Actualizar fase actual
        this.currentPhase = phaseNumber;
      });
    });
    
    // Activar la primera pestaña por defecto
    if (this.tabButtons.length > 0) {
      this.tabButtons[0].classList.add('active');
    }
  }
  
  setupAccordion() {
    // Mejorar el acordeón con animaciones suaves
    this.accordionButtons.forEach(button => {
      button.addEventListener('click', function() {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        
        if (panel.classList.contains('show')) {
          // Animación de cierre
          panel.style.maxHeight = panel.scrollHeight + 'px';
          setTimeout(() => {
            panel.style.maxHeight = '0px';
            setTimeout(() => {
              panel.classList.remove('show');
              panel.style.maxHeight = '';
            }, 300);
          }, 10);
        } else {
          // Animación de apertura
          panel.classList.add('show');
          panel.style.maxHeight = '0px';
          setTimeout(() => {
            panel.style.maxHeight = panel.scrollHeight + 'px';
            setTimeout(() => {
              panel.style.maxHeight = '';
            }, 300);
          }, 10);
        }
      });
    });
  }
  
  setupDiagramAnimations() {
    // Añadir clases para animación a los elementos del diagrama
    if (this.diagramElements.length > 0) {
      this.diagramElements.forEach((element, index) => {
        element.classList.add('transition-all', 'duration-500');
        element.setAttribute('data-phase', index + 1);
        
        // Añadir efecto de hover
        element.addEventListener('mouseenter', () => {
          if (!this.isAnimating) {
            element.classList.add('transform', 'scale-110');
          }
        });
        
        element.addEventListener('mouseleave', () => {
          element.classList.remove('transform', 'scale-110');
        });
        
        // Hacer clic en un elemento del diagrama muestra esa fase
        element.addEventListener('click', () => {
          if (!this.isAnimating) {
            const phase = parseInt(element.getAttribute('data-phase'));
            this.showPhase(phase);
          }
        });
      });
    } else {
      // Si no existen los elementos, crearlos dinámicamente
      this.createDiagramElements();
    }
  }
  
  createDiagramElements() {
    // Buscar el contenedor del diagrama
    const diagramContainer = document.querySelector('.proceso-diseno');
    
    if (!diagramContainer) {
      // Crear el contenedor si no existe
      const sequenceSection = document.querySelector('#secuencia .max-w-5xl');
      
      if (sequenceSection) {
        const diagramSection = document.createElement('div');
        diagramSection.className = 'bg-white rounded-lg shadow-lg p-6 mb-8 proceso-diseno';
        diagramSection.innerHTML = `
          <h3 class="text-xl font-semibold mb-4 text-center">Proceso de Diseño Instruccional</h3>
          
          <div class="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div class="fase bg-indigo-100 p-4 rounded-lg shadow-sm w-full md:w-1/3 cursor-pointer hover:shadow-md transition-all" data-phase="1">
              <div class="bg-indigo-200 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <i class="fas fa-bullseye text-indigo-700"></i>
              </div>
              <h4 class="font-semibold">Fase 1</h4>
              <p class="text-sm">Identificar resultados deseados</p>
            </div>
            
            <div class="hidden md:block">
              <i class="fas fa-arrow-right text-gray-400 text-xl"></i>
            </div>
            <div class="md:hidden">
              <i class="fas fa-arrow-down text-gray-400 text-xl"></i>
            </div>
            
            <div class="fase bg-indigo-100 p-4 rounded-lg shadow-sm w-full md:w-1/3 cursor-pointer hover:shadow-md transition-all" data-phase="2">
              <div class="bg-indigo-200 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <i class="fas fa-clipboard-check text-indigo-700"></i>
              </div>
              <h4 class="font-semibold">Fase 2</h4>
              <p class="text-sm">Determinar evidencias aceptables</p>
            </div>
            
            <div class="hidden md:block">
              <i class="fas fa-arrow-right text-gray-400 text-xl"></i>
            </div>
            <div class="md:hidden">
              <i class="fas fa-arrow-down text-gray-400 text-xl"></i>
            </div>
            
            <div class="fase bg-indigo-100 p-4 rounded-lg shadow-sm w-full md:w-1/3 cursor-pointer hover:shadow-md transition-all" data-phase="3">
              <div class="bg-indigo-200 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <i class="fas fa-chalkboard-teacher text-indigo-700"></i>
              </div>
              <h4 class="font-semibold">Fase 3</h4>
              <p class="text-sm">Planificar experiencias de aprendizaje</p>
            </div>
          </div>
          
          <div class="mt-4 flex justify-center">
            <button id="autoplay-btn" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 mt-4">
              <i class="fas fa-play"></i> Reproducir secuencia
            </button>
          </div>
        `;
        
        // Insertar después del título
        const titleSection = sequenceSection.querySelector('div[data-aos="fade-down"]');
        if (titleSection) {
          titleSection.insertAdjacentElement('afterend', diagramSection);
          
          // Actualizar referencias
          this.diagramElements = document.querySelectorAll('.proceso-diseno .fase');
          this.setupDiagramAnimations();
        }
      }
    }
  }
  
  // Función vacía para mantener compatibilidad con el código existente
  setupAutoPlayControls() {
    // Funcionalidad eliminada
  }
  
  showPhase(phaseNumber) {
    if (this.isAnimating) return;
    
    // Actualizar pestañas
    this.tabButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-tab') === `fase${phaseNumber}`) {
        btn.classList.add('active');
      }
    });
    
    // Animar transición
    this.animatePhaseTransition(phaseNumber);
    
    // Resaltar fase en el diagrama
    this.highlightDiagramPhase(phaseNumber);
    
    // Actualizar fase actual
    this.currentPhase = phaseNumber;
  }
  
  animatePhaseTransition(phaseNumber) {
    this.isAnimating = true;
    
    // Ocultar todos los contenidos con animación
    this.tabContents.forEach(content => {
      if (!content.classList.contains('hidden')) {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
        
        // Animación de salida
        setTimeout(() => {
          content.style.opacity = '0';
          content.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            content.classList.add('hidden');
            
            // Mostrar el contenido seleccionado con animación
            const targetContent = document.getElementById(`fase${phaseNumber}`);
            if (targetContent) {
              targetContent.classList.remove('hidden');
              targetContent.style.opacity = '0';
              targetContent.style.transform = 'translateY(-20px)';
              
              setTimeout(() => {
                targetContent.style.opacity = '1';
                targetContent.style.transform = 'translateY(0)';
                
                setTimeout(() => {
                  this.isAnimating = false;
                }, 300);
              }, 50);
            } else {
              this.isAnimating = false;
            }
          }, 300);
        }, 50);
      }
    });
    
    // Si no hay contenido visible, mostrar directamente el seleccionado
    if (document.querySelectorAll('.tabcontent:not(.hidden)').length === 0) {
      const targetContent = document.getElementById(`fase${phaseNumber}`);
      if (targetContent) {
        targetContent.classList.remove('hidden');
        targetContent.style.opacity = '0';
        targetContent.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
          targetContent.style.opacity = '1';
          targetContent.style.transform = 'translateY(0)';
          
          setTimeout(() => {
            this.isAnimating = false;
          }, 300);
        }, 50);
      } else {
        this.isAnimating = false;
      }
    }
  }
  
  highlightDiagramPhase(phaseNumber) {
    // Resaltar la fase actual en el diagrama
    this.diagramElements.forEach(element => {
      const elementPhase = parseInt(element.getAttribute('data-phase'));
      
      if (elementPhase === phaseNumber) {
        element.classList.add('bg-indigo-200', 'scale-105', 'shadow-md');
        element.classList.remove('bg-indigo-100');
      } else {
        element.classList.remove('bg-indigo-200', 'scale-105', 'shadow-md');
        element.classList.add('bg-indigo-100');
      }
    });
  }
  
  setupScrollEffects() {
    // Añadir efectos de desplazamiento a los elementos
    const scrollElements = document.querySelectorAll('.scroll-effect');
    
    if (scrollElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });
      
      scrollElements.forEach(element => {
        observer.observe(element);
      });
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Crear instancia del animador de secuencia
  window.sequenceAnimator = new SequenceAnimator();
  
  // Añadir clases de animación a elementos existentes
  document.querySelectorAll('.accordion').forEach(el => {
    el.classList.add('hover:bg-green-100', 'transition-colors');
  });
  
  // Mejorar estilos de los paneles
  document.querySelectorAll('.panel').forEach(panel => {
    panel.style.transition = 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out';
    panel.style.overflow = 'hidden';
  });
  
  console.log('Mejoras de secuencia didáctica aplicadas');
});
