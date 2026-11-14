// Juntos ante el Cushing — comportamiento básico de la web
(function () {
  // Menú móvil
  var boton = document.querySelector('.boton-menu');
  var menu = document.getElementById('menu-principal');
  if (boton && menu) {
    boton.addEventListener('click', function () {
      var abierto = menu.classList.toggle('abierto');
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('abierto')) {
        menu.classList.remove('abierto');
        boton.setAttribute('aria-expanded', 'false');
        boton.focus();
      }
    });
  }

  // Testimonios largos: «Leer más»
  document.querySelectorAll('.testimonio.largo').forEach(function (t) {
    var b = t.querySelector('.leer-mas');
    if (!b) return;
    b.addEventListener('click', function () {
      var abierto = t.classList.toggle('abierto');
      b.textContent = abierto ? 'Leer menos' : 'Leer el testimonio completo';
      b.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
  });

  // Aparición suave de bloques
  var bloques = document.querySelectorAll('.aparece');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    bloques.forEach(function (b) { obs.observe(b); });
  } else {
    bloques.forEach(function (b) { b.classList.add('visible'); });
  }

  // Formulario de inscripción (se envía a través de FormSubmit)
  var form = document.getElementById('form-inscripcion');
  if (form) {
    var msg = document.getElementById('mensaje-form');
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) { e.preventDefault(); form.reportValidity(); return; }
      var boton = form.querySelector('button[type="submit"]');
      if (boton) { boton.disabled = true; boton.textContent = 'Enviando…'; }
    });
    if (/[?&]enviado=1/.test(location.search) && msg) {
      msg.textContent = '¡Gracias por unirte! Hemos recibido tu inscripción y nos pondremos en contacto contigo muy pronto.';
      msg.classList.add('visible');
    }
  }

  // Visor de fotos de eventos
  var fotos = Array.prototype.slice.call(document.querySelectorAll('.foto-evento'));
  if (fotos.length) {
    var visor = document.createElement('div');
    visor.className = 'visor';
    visor.setAttribute('role', 'dialog');
    visor.setAttribute('aria-modal', 'true');
    visor.setAttribute('aria-label', 'Visor de fotos');
    visor.innerHTML = '<img alt=""><button class="cerrar" aria-label="Cerrar">×</button>' +
      '<button class="anterior" aria-label="Foto anterior">‹</button><button class="siguiente" aria-label="Foto siguiente">›</button>';
    document.body.appendChild(visor);
    var vImg = visor.querySelector('img'), actual = 0, origen = null;
    var mostrar = function (i) {
      actual = (i + fotos.length) % fotos.length;
      vImg.src = fotos[actual].href;
      vImg.alt = fotos[actual].querySelector('img').alt;
    };
    var cerrar = function () { visor.classList.remove('abierto'); if (origen) origen.focus(); };
    fotos.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        e.preventDefault(); origen = a; mostrar(i);
        visor.classList.add('abierto'); visor.querySelector('.cerrar').focus();
      });
    });
    visor.querySelector('.cerrar').addEventListener('click', cerrar);
    visor.querySelector('.anterior').addEventListener('click', function () { mostrar(actual - 1); });
    visor.querySelector('.siguiente').addEventListener('click', function () { mostrar(actual + 1); });
    visor.addEventListener('click', function (e) { if (e.target === visor) cerrar(); });
    document.addEventListener('keydown', function (e) {
      if (!visor.classList.contains('abierto')) return;
      if (e.key === 'Escape') cerrar();
      if (e.key === 'ArrowLeft') mostrar(actual - 1);
      if (e.key === 'ArrowRight') mostrar(actual + 1);
    });
  }

  // Año en el pie
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();
