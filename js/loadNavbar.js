fetch('components/navbar.html')
  .then(response => response.text())
  .then(html => {
    document.body.insertAdjacentHTML('afterbegin', html);
    // Notificar que la navegación ha sido cargada para permitir la inicialización
    document.dispatchEvent(new CustomEvent('navbarLoaded'));
  })
  .catch(err => console.error('Error cargando la navegación:', err));
