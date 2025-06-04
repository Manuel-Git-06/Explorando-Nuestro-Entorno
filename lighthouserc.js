module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        'index.html',
        'anexos.html',
        'evaluacion.html',
        'secuencia.html'
      ],
      numberOfRuns: 3,
      settings: {
        // Configuración para simular dispositivos móviles
        preset: 'desktop',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        skipAudits: ['uses-http2'],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      // Umbrales de puntuación mínimos
      assertions: {
        'categories:performance': ['warn', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.9}],
        'categories:best-practices': ['warn', {minScore: 0.9}],
        'categories:seo': ['warn', {minScore: 0.9}],
        
        // Auditorías específicas de accesibilidad
        'aria-required-attr': 'error',
        'aria-valid-attr': 'error',
        'button-name': 'error',
        'color-contrast': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'image-alt': 'error',
        'link-name': 'error',
        'meta-viewport': 'error',
        
        // Auditorías de rendimiento
        'first-contentful-paint': ['warn', {maxNumericValue: 2000}],
        'largest-contentful-paint': ['warn', {maxNumericValue: 2500}],
        'cumulative-layout-shift': ['warn', {maxNumericValue: 0.1}],
        'total-blocking-time': ['warn', {maxNumericValue: 300}],
        
        // Buenas prácticas
        'no-document-write': 'error',
        'no-vulnerable-libraries': 'error',
        'doctype': 'error',
        'charset': 'error',
      },
    },
  },
};
