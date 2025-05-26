/**
 * fix-profile-images.js
 * Script para manejar errores de carga de imágenes de perfil y aplicar fallbacks
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando manejo de errores de imágenes de perfil');
    
    // Lista de perfiles conocidos con sus colores asociados
    const profileDefaults = {
        'manuelbrito': { initials: 'MB', bgColor: '#4f46e5' },
        'nathalysantana': { initials: 'NS', bgColor: '#7c3aed' },
        'juancarlosmendes': { initials: 'JCM', bgColor: '#0891b2' }
    };
    
    // Seleccionar todas las imágenes de perfil
    const profileImages = document.querySelectorAll('.profile-image, img[src*="assets/images/"]');
    
    profileImages.forEach(img => {
        // Verificar si la imagen ya cargó incorrectamente
        if (img.complete && img.naturalHeight === 0) {
            applyProfileFallback(img);
        }
        
        // Manejar futuros errores de carga
        img.addEventListener('error', function() {
            applyProfileFallback(this);
        });
    });
    
    /**
     * Aplica el fallback a una imagen de perfil que falló al cargar
     * @param {HTMLImageElement} imgElement - El elemento de imagen que falló
     */
    function applyProfileFallback(imgElement) {
        console.log(`Aplicando fallback para imagen: ${imgElement.src}`);
        
        // Extraer el nombre del perfil de la ruta de la imagen
        const src = imgElement.src;
        const fileName = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'));
        
        // Crear un contenedor para el fallback
        const container = document.createElement('div');
        container.className = 'profile-fallback';
        
        // Aplicar estilos al contenedor
        Object.assign(container.style, {
            width: `${imgElement.width || 50}px`,
            height: `${imgElement.height || 50}px`,
            backgroundColor: profileDefaults[fileName]?.bgColor || '#6b7280',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: `${(imgElement.width || 50) / 3}px`
        });
        
        // Agregar las iniciales
        container.textContent = profileDefaults[fileName]?.initials || fileName.substring(0, 2).toUpperCase();
        
        // Reemplazar la imagen con el fallback
        if (imgElement.parentNode) {
            imgElement.parentNode.insertBefore(container, imgElement);
            imgElement.style.display = 'none';
        }
        
        console.log(`Fallback aplicado para ${fileName} con iniciales: ${container.textContent}`);
    }
    
    console.log(`Se han configurado ${profileImages.length} imágenes de perfil con manejo de errores`);
});
