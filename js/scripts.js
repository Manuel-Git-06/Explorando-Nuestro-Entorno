/**
 * scripts.js: Funcionalidad JS principal para el sitio web "Explorando Nuestro Entorno"
 * Versión optimizada que consolida todas las funcionalidades comunes
 */

// Definir funciones básicas para la funcionalidad del sitio
const setupFadeInAnimations = () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (fadeElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });
};

const setupScrollSpy = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') && link.getAttribute('href').includes('#') && 
          link.getAttribute('href').substring(link.getAttribute('href').indexOf('#') + 1) === current) {
        link.classList.add('active');
      }
    });
  });
};

const setupMobileMenu = () => {
  // Adaptar a la estructura de la plantilla actual
  const mobileMenuBtn = document.getElementById('mobile-menu-button');
  const navLinks = document.getElementById('mobile-menu');

  if (!mobileMenuBtn || !navLinks) return;

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
    navLinks.classList.toggle('block');
  });
};

// Funciones para el acordeón
const setupAccordion = () => {
  const accordionButtons = document.querySelectorAll('.accordion');
  
  if (accordionButtons.length === 0) return;
  
  accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('active');
      const panel = this.nextElementSibling;
      if (panel && panel.classList.contains('panel')) {
        if (panel.classList.contains('show')) {
          panel.classList.remove('show');
        } else {
          panel.classList.add('show');
        }
      }
    });
  });
  
  // Activar el primer acordeón por defecto si existe
  if (accordionButtons.length > 0) {
    accordionButtons[0].click();
  }
};

// Funciones para las pestañas
const setupTabs = () => {
  // Buscar pestañas con clase tablink o modern-tab
  const tabButtons = document.querySelectorAll('.tablink, .modern-tab');
  
  if (tabButtons.length === 0) return;
  
  // Ocultar todos los contenidos de pestañas
  const tabContents = document.querySelectorAll('.tabcontent, .tab-content');
  tabContents.forEach(content => {
    content.classList.add('hidden');
  });
  
  // Activar la primera pestaña por defecto
  const firstTab = tabButtons[0];
  firstTab.classList.add('active');
  
  // Mostrar el contenido de la primera pestaña
  const firstTabId = firstTab.getAttribute('data-tab');
  if (firstTabId) {
    const firstTabContent = document.getElementById(firstTabId);
    if (firstTabContent) {
      firstTabContent.classList.remove('hidden');
    }
  }
  
  // Añadir event listeners a todas las pestañas
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Ocultar todos los contenidos de pestañas
      tabContents.forEach(content => {
        content.classList.add('hidden');
      });
      
      // Mostrar el contenido de la pestaña seleccionada
      const selectedContent = document.getElementById(tabId);
      if (selectedContent) {
        selectedContent.classList.remove('hidden');
      }
      
      // Actualizar clases activas
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
};

// Inicializar tooltips personalizados
const setupTooltips = () => {
  const tooltips = document.querySelectorAll('.tooltip');
  
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
};

// Inicializar barras de progreso con animación
const setupProgressBars = () => {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  if (progressBars.length === 0) return;
  
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
    
    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars(); // Ejecutar una vez al cargar
  }
};

// Función para manejar el efecto de transparencia en la barra de navegación
const setupNavbarTransparency = () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Manejar el scroll
  let ticking = false;
  const scrollThreshold = 100; // Píxeles a desplazar antes de mostrar la barra

  const updateNavbar = () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Usar requestAnimationFrame para un scroll más suave
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateNavbar();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Actualizar una vez al cargar
  updateNavbar();
};

// Función para resaltar el enlace activo en la navegación
const setupActiveNavLink = () => {
  // Obtener la ruta actual
  let currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  // Si estamos en la raíz, establecer como index.html
  if (currentPath === '') currentPath = 'index.html';
  
  // Buscar todos los enlaces de navegación
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Remover clase active de todos los enlaces
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      link.classList.remove('active');
      // Para menú móvil, asegurarse de que el enlace correspondiente también se actualice
      const mobileLink = document.querySelector(`#mobile-menu a[href="${href}"]`);
      if (mobileLink) {
        mobileLink.classList.remove('active');
      }
    }
  });
  
  // Función para marcar un enlace como activo
  const markLinkAsActive = (path) => {
    // Buscar enlaces que coincidan exactamente con la ruta
    const links = document.querySelectorAll(`.nav-link[href="${path}"]`);
    links.forEach(link => {
      link.classList.add('active');
      // También resaltar el enlace correspondiente en el menú móvil
      const mobileLink = document.querySelector(`#mobile-menu a[href="${path}"]`);
      if (mobileLink) {
        mobileLink.classList.add('active');
      }
    });
  };
  
  // Marcar el enlace actual como activo
  markLinkAsActive(currentPath);
  
  // Si estamos en la página de inicio, también verificar la ruta raíz
  if (currentPath === 'index.html') {
    markLinkAsActive('');
  } else if (currentPath === '') {
    markLinkAsActive('index.html');
  }
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function () {
  try {
    console.log('DOM cargado, inicializando componentes...');
    
    // Configurar la transparencia de la barra de navegación
    setupNavbarTransparency();
    
    // Configurar el enlace activo en la navegación
    setupActiveNavLink();
    
    // Configurar funcionalidades básicas
    setupScrollSpy();
    setupMobileMenu();
    setupFadeInAnimations();
    setupAccordion();
    setupTabs();
    setupTooltips();
    setupProgressBars();
    
    // Inicializar AOS (Animate On Scroll) si está disponible
    if (typeof AOS !== 'undefined') {
      console.log('Inicializando AOS...');
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
    
    // Añadir clases de animación a elementos para mejorar UX
    document.querySelectorAll('.btn').forEach(btn => {
      btn.classList.add('focus-effect');
    });
    
    // Mejorar accesibilidad de elementos interactivos
    document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
      if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) {
        if (el.textContent.trim()) {
          el.setAttribute('aria-label', el.textContent.trim());
        }
      }
    });
    
    console.log('Sitio web inicializado correctamente');
    
  } catch (error) {
    // Mostrar mensaje de error en la consola
    console.error('Error en la inicialización de la página:', error);
    
    // Crear un mensaje de error básico
    const errorMsg = document.createElement('div');
    errorMsg.style.position = 'fixed';
    errorMsg.style.top = '10px';
    errorMsg.style.left = '50%';
    errorMsg.style.transform = 'translateX(-50%)';
    errorMsg.style.backgroundColor = '#f44336';
    errorMsg.style.color = 'white';
    errorMsg.style.padding = '10px 20px';
    errorMsg.style.borderRadius = '4px';
    errorMsg.style.zIndex = '9999';
    errorMsg.textContent = `Error: ${error.message}`;
    document.body.appendChild(errorMsg);
    
    // Eliminar el mensaje después de 5 segundos
    setTimeout(() => {
      if (errorMsg.parentNode) {
        errorMsg.parentNode.removeChild(errorMsg);
      }
    }, 5000);
    
    // Intentar inicializar componentes básicos a pesar del error
    try {
      // Configuración mínima para que la página sea usable
      setupMobileMenu();
      setupScrollSpy();
    } catch (fallbackError) {
      console.error('Error en la recuperación de errores:', fallbackError);
    }
  }
});
