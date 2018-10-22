/* Register serviceworker */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/js/serviceworker.js")
    .then(reg => {
      console.log("Registration of ServiceWorker successful: " + reg.scope);
    })
    .catch(error => {
      console.log("Registration of ServiceWorker failed: " + error);
    });
}