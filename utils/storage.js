/**
 * storage.js - Utilidades para gestión de almacenamiento local
 * Parte de la modernización gradual del proyecto Planificación Revés
 */

/**
 * Guarda un valor en el almacenamiento local
 * @param {string} key - Clave para almacenar el valor
 * @param {any} value - Valor a almacenar (será convertido a JSON)
 * @returns {boolean} - Éxito de la operación
 */
export function saveToLocalStorage(key, value) {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
        return true;
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
        return false;
    }
}

/**
 * Recupera un valor del almacenamiento local
 * @param {string} key - Clave del valor a recuperar
 * @param {any} defaultValue - Valor por defecto si no existe la clave
 * @returns {any} - Valor recuperado o valor por defecto
 */
export function getFromLocalStorage(key, defaultValue = null) {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
            return defaultValue;
        }
        return JSON.parse(serializedValue);
    } catch (error) {
        console.error('Error al recuperar de localStorage:', error);
        return defaultValue;
    }
}

/**
 * Elimina un valor del almacenamiento local
 * @param {string} key - Clave del valor a eliminar
 * @returns {boolean} - Éxito de la operación
 */
export function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error al eliminar de localStorage:', error);
        return false;
    }
}

/**
 * Configura el almacenamiento para checkboxes
 * @param {string} formSelector - Selector para el formulario que contiene los checkboxes
 * @param {string} checkboxSelector - Selector para los checkboxes dentro del formulario
 * @param {string} keyPrefix - Prefijo para las claves en localStorage
 */
export function setupCheckboxStorage(formSelector = '#evaluacionChecklist', checkboxSelector = 'input[type="checkbox"]', keyPrefix = 'checkbox_') {
    const checkboxes = document.querySelectorAll(`${formSelector} ${checkboxSelector}`);
    
    checkboxes.forEach((checkbox, index) => {
        const key = `${keyPrefix}${index}`;
        
        // Cargar estado guardado
        const savedState = getFromLocalStorage(key, false);
        checkbox.checked = savedState;
        
        // Guardar estado al cambiar
        checkbox.addEventListener('change', function() {
            saveToLocalStorage(key, this.checked);
        });
    });
}
