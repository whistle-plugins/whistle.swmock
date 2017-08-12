if (location.protocol === 'https:' || location.hostname === '127.0.0.1' || location.hostname === 'localhost') {
  navigator.serviceWorker
  .register('/sw.js', {
      scope: '/'
  })
  .then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
  })
  .catch(function(error) {
      console.log('ServiceWorker registration failed: ', error)
  })
}