/* Reproducción de las búsquedas reales en la IA de Google: escribe la pregunta,
   «piensa» y muestra la respuesta. Sin JS o con movimiento reducido se ven los tres casos. */
(function () {
  "use strict";
  var raiz = document.getElementById("reproductor");
  if (!raiz || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var casos = raiz.querySelectorAll(".rp-caso");
  var pestanas = raiz.querySelectorAll("[data-caso]");
  var pies = raiz.querySelectorAll("[data-pie]");
  var pausa = raiz.querySelector(".rp-pausa");
  var preguntas = [].map.call(casos, function (c) { return c.querySelector("[data-escribir]").textContent; });
  var LECTURA = 7000; // tiempo con la respuesta entera a la vista
  var actual = 0, temporizadores = [], enPausa = false, visible = false, inicio = 0, duracion = 0, marco = 0;

  raiz.classList.add("activo");

  function limpiar() { temporizadores.forEach(clearTimeout); temporizadores = []; cancelAnimationFrame(marco); }
  function luego(fn, ms) { temporizadores.push(setTimeout(fn, ms)); }

  function progreso() {
    var p = Math.min(1, (Date.now() - inicio) / duracion);
    pestanas[actual].style.setProperty("--progreso", (p * 100) + "%");
    if (p < 1) marco = requestAnimationFrame(progreso);
  }

  function mostrar(i) {
    limpiar();
    actual = i;
    casos.forEach(function (c, j) {
      c.classList.toggle("visible", j === i);
      c.classList.add("esperando");
      c.classList.remove("pensando");
      c.querySelectorAll(".mostrado").forEach(function (b) { b.classList.remove("mostrado"); });
    });
    pestanas.forEach(function (b, j) {
      b.setAttribute("aria-selected", String(j === i));
      b.style.setProperty("--progreso", j < i ? "100%" : "0%");
    });
    pies.forEach(function (p, j) { p.hidden = j !== i; });

    var caso = casos[i], hueco = caso.querySelector("[data-escribir]"), frase = preguntas[i];
    var bloques = caso.querySelectorAll(".rp-respuesta > *");
    var cursor = document.createElement("span");
    cursor.className = "rp-cursor";
    hueco.textContent = "";
    hueco.after(cursor);

    var t = 300, paso = 42;
    for (var k = 1; k <= frase.length; k++) {
      (function (k) { luego(function () { hueco.textContent = frase.slice(0, k); }, t + k * paso); })(k);
    }
    t += frase.length * paso + 350;
    luego(function () { cursor.remove(); caso.classList.add("pensando"); }, t);
    t += 1300;
    luego(function () { caso.classList.remove("pensando"); }, t);
    // Cada bloque de la respuesta aparece un poco después del anterior
    [].forEach.call(bloques, function (b, j) { luego(function () { b.classList.add("mostrado"); }, t + j * 450); });
    t += bloques.length * 450 + LECTURA;

    inicio = Date.now(); duracion = t;
    if (enPausa) return terminar(caso, cursor, frase, hueco);
    marco = requestAnimationFrame(progreso);
    luego(function () { mostrar((actual + 1) % casos.length); }, t);
  }

  // En pausa se ve el caso completo, sin animación
  function terminar(caso, cursor, frase, hueco) {
    limpiar();
    if (cursor && cursor.parentNode) cursor.remove();
    hueco.textContent = frase;
    caso.classList.remove("pensando", "esperando");
    caso.querySelectorAll(".rp-respuesta > *").forEach(function (b) { b.classList.add("mostrado"); });
    pestanas[actual].style.setProperty("--progreso", "100%");
  }

  pestanas.forEach(function (b) {
    b.addEventListener("click", function () { mostrar(Number(b.getAttribute("data-caso"))); });
    b.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var n = (actual + (e.key === "ArrowRight" ? 1 : casos.length - 1)) % casos.length;
      mostrar(n); pestanas[n].focus();
    });
  });

  pausa.addEventListener("click", function () {
    enPausa = !enPausa;
    pausa.setAttribute("aria-pressed", String(enPausa));
    pausa.setAttribute("aria-label", enPausa ? "Reanudar la reproducción" : "Pausar la reproducción");
    if (enPausa) {
      var caso = casos[actual];
      terminar(caso, caso.querySelector(".rp-cursor"), preguntas[actual], caso.querySelector("[data-escribir]"));
    } else mostrar((actual + 1) % casos.length);
  });

  // Solo se reproduce cuando está a la vista
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entradas) {
      var ahora = entradas[0].isIntersecting;
      if (ahora && !visible) { visible = true; if (!enPausa) mostrar(actual); }
      if (!ahora && visible) { visible = false; if (!enPausa) terminar(casos[actual], casos[actual].querySelector(".rp-cursor"), preguntas[actual], casos[actual].querySelector("[data-escribir]")); }
    }, { threshold: 0.35 }).observe(raiz);
  } else mostrar(0);

  // Estado inicial: primer caso entero (por si se ve antes de que arranque)
  casos[0].classList.add("visible");
})();
