/* «Ver captura real»: abre la imagen original de cada búsqueda.
   El botón solo aparece si la captura existe, así nunca hay enlaces rotos. */
(function () {
  "use strict";
  var visor = document.getElementById("visor");
  if (!visor) return;
  var img = visor.querySelector("img"), pie = visor.querySelector(".visor-pie");

  document.querySelectorAll("[data-captura]").forEach(function (b) {
    var prueba = new Image();
    prueba.onload = function () { b.hidden = false; };
    prueba.src = b.getAttribute("data-captura");
    b.addEventListener("click", function () {
      img.src = b.getAttribute("data-captura");
      img.alt = b.getAttribute("data-pie");
      pie.textContent = b.getAttribute("data-pie");
      if (visor.showModal) visor.showModal(); else window.open(img.src, "_blank");
    });
  });
  // Cerrar al pulsar fuera de la imagen
  visor.addEventListener("click", function (e) { if (e.target === visor) visor.close(); });
})();
