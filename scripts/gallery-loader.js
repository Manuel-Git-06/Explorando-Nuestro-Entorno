/**
 * gallery-loader.js - Script para cargar dinámicamente las imágenes en la galería
 */

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el contenedor de la galería
    const galleryContainer = document.getElementById('dynamic-gallery');
    
    // Si no existe el contenedor, salir
    if (!galleryContainer) return;
    
    // Array con las rutas de las imágenes de estudiantes trabajando
    const studentImages = [
        'assets/images/imagenestudiantetrabajando (1).jpg',
        'assets/images/imagenestudiantetrabajando (2).jpg',
        'assets/images/imagenestudiantetrabajando (3).jpg',
        'assets/images/imagenestudiantetrabajando (4).jpg',
        'assets/images/imagenestudiantetrabajando (5).jpg',
        'assets/images/imagenestudiantetrabajando (6).jpg',
        'assets/images/imagenestudiantetrabajando (7).jpg'
    ];
    
    // Mezclar aleatoriamente el array de imágenes para mostrarlas en orden aleatorio
    shuffleArray(studentImages);
    
    // Cargar las imágenes en la galería
    loadGalleryImages(galleryContainer, studentImages);
    
    // Configurar el visor de imágenes al hacer clic
    setupImageViewer();
});

/**
 * Mezcla aleatoriamente los elementos de un array
 * @param {Array} array - El array a mezclar
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Carga las imágenes en el contenedor de la galería
 * @param {HTMLElement} container - El contenedor de la galería
 * @param {Array} images - Array con las rutas de las imágenes
 */
function loadGalleryImages(container, images) {
    // Limpiar el contenedor
    container.innerHTML = '';
    
    // Cargar cada imagen
    images.forEach((imagePath, index) => {
        // Crear el contenedor de la imagen
        const imageContainer = document.createElement('div');
        imageContainer.className = 'aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition';
        imageContainer.setAttribute('data-aos', 'fade-up');
        imageContainer.setAttribute('data-aos-delay', (index * 100).toString());
        
        // Crear la imagen
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `Estudiante trabajando ${index + 1}`;
        img.className = 'w-full h-full object-cover gallery-img cursor-pointer hover:scale-105 transition';
        
        // Manejar errores de carga de la imagen
        img.onerror = function() {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" font-family="Arial" font-size="14" text-anchor="middle" fill="%23666">Imagen no disponible</text></svg>';
            this.alt = 'Imagen no disponible';
        };
        
        // Añadir la imagen al contenedor
        imageContainer.appendChild(img);
        
        // Añadir el contenedor al contenedor de la galería
        container.appendChild(imageContainer);
    });
}

/**
 * Configura el visor de imágenes al hacer clic
 */
function setupImageViewer() {
    // Obtener todas las imágenes de la galería
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    // Añadir evento de clic a cada imagen
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Crear el visor de imágenes
            const viewer = document.createElement('div');
            viewer.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50';
            
            // Crear la imagen ampliada
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.alt = this.alt;
            enlargedImg.className = 'max-h-[80vh] max-w-[80vw] object-contain';
            
            // Crear el botón de cerrar
            const closeBtn = document.createElement('button');
            closeBtn.className = 'absolute top-4 right-4 text-white text-3xl';
            closeBtn.innerHTML = '&times;';
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(viewer);
            });
            
            // Añadir la imagen y el botón de cerrar al visor
            viewer.appendChild(enlargedImg);
            viewer.appendChild(closeBtn);
            
            // Añadir evento para cerrar al hacer clic fuera de la imagen
            viewer.addEventListener('click', function(e) {
                if (e.target === viewer) {
                    document.body.removeChild(viewer);
                }
            });
            
            // Añadir el visor al body
            document.body.appendChild(viewer);
        });
    });
}
