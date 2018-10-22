/* Register serviceworker */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(reg => {
      console.log("Registration of ServiceWorker successful: " + reg.scope);
    })
    .catch(error => {
      console.log("Registration of ServiceWorker failed: " + error);
    });
}