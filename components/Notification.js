/**
 * Notification.js - Componente de notificaciones para feedback al usuario
 * Parte de la modernización gradual del proyecto Planificación Revés
 */

/**
 * Crea una notificación que se muestra temporalmente y luego desaparece
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación: 'success', 'error', 'info', 'warning'
 * @param {Object} options - Opciones adicionales
 * @returns {HTMLElement} - El elemento de notificación
 */
export function createNotification(message, type = 'info', options = {}) {
  const defaultOptions = {
    duration: 3000,               // Duración en milisegundos
    position: 'top-right',        // 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'
    showProgressBar: true,        // Mostrar barra de progreso
    closeButton: true,            // Mostrar botón de cierre
    animationIn: 'fadeIn',        // Animación de entrada
    animationOut: 'fadeOut',      // Animación de salida
    onClose: null,                // Callback al cerrar
    onClick: null,                // Callback al hacer clic
    zIndex: 1000,                 // Z-index de la notificación
    width: '300px',               // Ancho de la notificación
    icon: true,                   // Mostrar icono según el tipo
    pauseOnHover: true,           // Pausar temporizador al pasar el ratón
  };

  const config = { ...defaultOptions, ...options };
  
  // Crear contenedor si no existe
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    container.style.position = 'fixed';
    container.style.zIndex = config.zIndex;
    
    // Posicionar el contenedor según la opción
    switch (config.position) {
      case 'top-right':
        container.style.top = '20px';
        container.style.right = '20px';
        break;
      case 'top-left':
        container.style.top = '20px';
        container.style.left = '20px';
        break;
      case 'bottom-right':
        container.style.bottom = '20px';
        container.style.right = '20px';
        break;
      case 'bottom-left':
        container.style.bottom = '20px';
        container.style.left = '20px';
        break;
      case 'top-center':
        container.style.top = '20px';
        container.style.left = '50%';
        container.style.transform = 'translateX(-50%)';
        break;
      case 'bottom-center':
        container.style.bottom = '20px';
        container.style.left = '50%';
        container.style.transform = 'translateX(-50%)';
        break;
    }
    
    document.body.appendChild(container);
  }
  
  // Crear la notificación
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.width = config.width;
  notification.style.padding = '12px';
  notification.style.marginBottom = '10px';
  notification.style.borderRadius = '4px';
  notification.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16)';
  notification.style.display = 'flex';
  notification.style.flexDirection = 'column';
  notification.style.position = 'relative';
  notification.style.opacity = '0';
  notification.style.transform = 'translateY(-20px)';
  notification.style.transition = 'opacity 0.3s, transform 0.3s';
  
  // Aplicar colores según el tipo
  switch (type) {
    case 'success':
      notification.style.backgroundColor = '#4CAF50';
      notification.style.color = 'white';
      break;
    case 'error':
      notification.style.backgroundColor = '#F44336';
      notification.style.color = 'white';
      break;
    case 'warning':
      notification.style.backgroundColor = '#FF9800';
      notification.style.color = 'white';
      break;
    case 'info':
    default:
      notification.style.backgroundColor = '#2196F3';
      notification.style.color = 'white';
      break;
  }
  
  // Contenedor para el contenido
  const contentContainer = document.createElement('div');
  contentContainer.style.display = 'flex';
  contentContainer.style.alignItems = 'center';
  
  // Añadir icono si está habilitado
  if (config.icon) {
    const icon = document.createElement('div');
    icon.style.marginRight = '10px';
    icon.style.display = 'flex';
    icon.style.alignItems = 'center';
    icon.style.justifyContent = 'center';
    
    // Definir icono según el tipo
    switch (type) {
      case 'success':
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
        break;
      case 'error':
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
        break;
      case 'warning':
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
        break;
      case 'info':
      default:
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
        break;
    }
    
    contentContainer.appendChild(icon);
  }
  
  // Añadir mensaje
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.style.flex = '1';
  contentContainer.appendChild(messageElement);
  
  // Añadir botón de cierre si está habilitado
  if (config.closeButton) {
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.background = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.color = 'inherit';
    closeButton.style.fontSize = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.marginLeft = '10px';
    closeButton.style.padding = '0';
    closeButton.style.lineHeight = '1';
    closeButton.style.opacity = '0.7';
    closeButton.style.transition = 'opacity 0.2s';
    
    closeButton.addEventListener('mouseover', () => {
      closeButton.style.opacity = '1';
    });
    
    closeButton.addEventListener('mouseout', () => {
      closeButton.style.opacity = '0.7';
    });
    
    closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      closeNotification();
    });
    
    contentContainer.appendChild(closeButton);
  }
  
  notification.appendChild(contentContainer);
  
  // Añadir barra de progreso si está habilitada
  let progressBar;
  if (config.showProgressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'notification-progress';
    progressBar.style.position = 'absolute';
    progressBar.style.bottom = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.width = '100%';
    progressBar.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    progressBar.style.transformOrigin = 'left';
    progressBar.style.transform = 'scaleX(1)';
    progressBar.style.transition = `transform ${config.duration}ms linear`;
    
    notification.appendChild(progressBar);
  }
  
  // Añadir la notificación al contenedor
  container.appendChild(notification);
  
  // Animar entrada
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
    
    if (progressBar) {
      progressBar.style.transform = 'scaleX(0)';
    }
  }, 10);
  
  // Configurar temporizador para cerrar
  let timer;
  
  const startTimer = () => {
    if (config.duration > 0) {
      timer = setTimeout(closeNotification, config.duration);
    }
  };
  
  const pauseTimer = () => {
    clearTimeout(timer);
    if (progressBar) {
      progressBar.style.transition = 'none';
    }
  };
  
  const resumeTimer = () => {
    if (config.duration > 0) {
      const remainingTime = parseFloat(getComputedStyle(progressBar).transform.split(',')[0].split('(')[1]) * config.duration;
      if (progressBar) {
        progressBar.style.transition = `transform ${remainingTime}ms linear`;
        progressBar.style.transform = 'scaleX(0)';
      }
      timer = setTimeout(closeNotification, remainingTime);
    }
  };
  
  // Pausar temporizador al pasar el ratón si está habilitado
  if (config.pauseOnHover) {
    notification.addEventListener('mouseenter', pauseTimer);
    notification.addEventListener('mouseleave', resumeTimer);
  }
  
  // Manejar clic en la notificación
  if (config.onClick) {
    notification.style.cursor = 'pointer';
    notification.addEventListener('click', (e) => {
      if (e.target !== closeButton) {
        config.onClick(e);
      }
    });
  }
  
  // Función para cerrar la notificación
  function closeNotification() {
    clearTimeout(timer);
    
    // Animar salida
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    
    // Eliminar del DOM después de la animación
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
        
        // Eliminar contenedor si está vacío
        if (container.children.length === 0) {
          container.parentNode.removeChild(container);
        }
        
        // Ejecutar callback si existe
        if (typeof config.onClose === 'function') {
          config.onClose();
        }
      }
    }, 300);
  }
  
  // Iniciar temporizador
  startTimer();
  
  // Retornar objeto con métodos para controlar la notificación
  return {
    element: notification,
    close: closeNotification
  };
}

/**
 * Muestra una notificación de éxito
 * @param {string} message - Mensaje a mostrar
 * @param {Object} options - Opciones adicionales
 * @returns {Object} - Objeto con la notificación y métodos para controlarla
 */
export function showSuccess(message, options = {}) {
  return createNotification(message, 'success', options);
}

/**
 * Muestra una notificación de error
 * @param {string} message - Mensaje a mostrar
 * @param {Object} options - Opciones adicionales
 * @returns {Object} - Objeto con la notificación y métodos para controlarla
 */
export function showError(message, options = {}) {
  return createNotification(message, 'error', options);
}

/**
 * Muestra una notificación de advertencia
 * @param {string} message - Mensaje a mostrar
 * @param {Object} options - Opciones adicionales
 * @returns {Object} - Objeto con la notificación y métodos para controlarla
 */
export function showWarning(message, options = {}) {
  return createNotification(message, 'warning', options);
}

/**
 * Muestra una notificación informativa
 * @param {string} message - Mensaje a mostrar
 * @param {Object} options - Opciones adicionales
 * @returns {Object} - Objeto con la notificación y métodos para controlarla
 */
export function showInfo(message, options = {}) {
  return createNotification(message, 'info', options);
}
