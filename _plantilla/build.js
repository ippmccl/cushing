// Genera las páginas HTML de la web a partir de la plantilla común.
// Uso (desde la carpeta del proyecto): node _plantilla/build.js _plantilla/paginas .
// Edita los textos en _plantilla/paginas/*.html y vuelve a ejecutar este script.
const fs = require('fs');
const path = require('path');
const [, , SRC, OUT] = process.argv;

const ico = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8.5V6.8c0-.8.5-1 1-1h2.3V2.1L14.2 2C10.9 2 10 4.4 10 6.4v2.1H7.6V12H10v10h4V12h2.9l.5-3.5H14z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 2.5h3.1l-6.8 7.8 8 10.7h-6.3l-4.9-6.4-5.6 6.4H2.2l7.3-8.3L1.8 2.5h6.4l4.4 5.9 5.2-5.9zm-1.1 16.6h1.7L7.4 4.3H5.6l11.1 14.8z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="3"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.7 4.3 3.8 1.6.7 2.2.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.5-.4z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  corazon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  manos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="M7 20l1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8l-4.2 3.9"/><path d="M2 15l6 6"/></svg>',
  ojo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  estetoscopio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3v6a5 5 0 0 0 10 0V3"/><path d="M10 14v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="12" r="2"/></svg>',
  escudo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
  megafono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14"/></svg>',
  personas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6"/></svg>',
  reloj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  libro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
  foto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="15" rx="3"/><circle cx="12" cy="12.5" r="3.5"/><path d="M8 5l1.5-2h5L16 5"/></svg>',
  cerebro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/></svg>',
  hoja: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 4 13c0-6 7-10 16-10 0 9-4 16-10 16"/><path d="M4 21c3-5 6-8 10-10"/></svg>',
  paleta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22a10 10 0 1 1 10-10c0 2.8-2.2 3-4 3h-2a2 2 0 0 0-1 3.7A2 2 0 0 1 12 22z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="11" cy="7" r="1.2"/><circle cx="16" cy="8" r="1.2"/></svg>',
  calendario: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  flecha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  descarga: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
  estrella: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
  enlace: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',
  luz: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>'
};

const REDES = {
  instagram: 'https://www.instagram.com/juntosanteelcushing',
  facebook: 'https://www.facebook.com/share/17VocVd75p/?mibextid=wwXIfr',
  x: 'https://x.com/juntoscushing',
  email: 'juntosanteelcushing@gmail.com'
};


const URL_BASE = "https://juntosanteelcushing.org/";
const ORG = {
  "@context": "https://schema.org",
  "@type": ["NGO", "MedicalOrganization"],
  "@id": URL_BASE + "#organizacion",
  "name": "Juntos ante el Cushing",
  "legalName": "JUNTOS ANTE EL CUSHING, Asociación de Pacientes con Síndrome de Cushing",
  "alternateName": ["Asociación Juntos ante el Cushing", "Asociación de Pacientes con Síndrome de Cushing", "Juntos ante el Cushing, asociación de pacientes de Cushing"],
  "url": URL_BASE,
  "logo": URL_BASE + "assets/img/logo-oficial.png",
  "image": URL_BASE + "assets/img/logo-oficial.png",
  "description": "Asociación de pacientes sin ánimo de lucro que acompaña a personas con síndrome de Cushing y enfermedad de Cushing y a sus familias en España y Latinoamérica: información, apoyo emocional, comunidad y visibilidad de esta enfermedad rara.",
  "slogan": "Porque nadie debería recorrer este camino en soledad",
  "taxID": "G27583731",
  "nonprofitStatus": "NonprofitType",
  "email": "juntosanteelcushing@gmail.com",
  "telephone": "+34648524836",
  "address": { "@type": "PostalAddress", "streetAddress": "Calle Mur, 128, planta 2, puerta 2", "postalCode": "08760", "addressLocality": "Martorell", "addressRegion": "Barcelona", "addressCountry": "ES" },
  "areaServed": [{ "@type": "Country", "name": "España" }, { "@type": "Place", "name": "Latinoamérica" }],
  "knowsAbout": ["Síndrome de Cushing", "Enfermedad de Cushing", "Hipercortisolismo", "Cushing hipofisario", "Cushing suprarrenal", "Cushing ectópico", "Cushing iatrogénico", "Enfermedades raras", "Apoyo a pacientes"],
  "sameAs": ["https://www.instagram.com/juntosanteelcushing", "https://www.facebook.com/share/17VocVd75p/", "https://x.com/juntoscushing"]
};

const MENU = [
  ['index.html', 'Inicio'],
  ['proceso.html', 'Proceso'],
  ['apoyo.html', 'Apoyo'],
  ['guias.html', 'Guías'],
  ['eventos.html', 'Eventos'],
  ['contacto.html', 'Contacto']
];

function layout(meta, body) {
  const nav = MENU.map(([href, txt]) =>
    `<li><a href="${href}"${meta.activo === href ? ' aria-current="page"' : ''}>${txt}</a></li>`).join('\n        ');
  return `<!DOCTYPE html>
<html lang="es-ES">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${meta.titulo}</title>
<meta name="description" content="${meta.descripcion}">
<link rel="canonical" href="${URL_BASE}${meta.ruta}">
<meta property="og:site_name" content="Juntos ante el Cushing">
<meta property="og:locale" content="es_ES">
<meta property="og:title" content="${meta.titulo}">
<meta property="og:description" content="${meta.descripcion}">
<meta property="og:type" content="website">
<meta property="og:url" content="${URL_BASE}${meta.ruta}">
<meta property="og:image" content="${URL_BASE}assets/img/logo-oficial.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@JuntosCushing">
<meta name="theme-color" content="#5e2a86">
<script type="application/ld+json">${JSON.stringify(ORG)}</script>
${meta.jsonld ? "<script type=\"application/ld+json\">" + JSON.stringify(meta.jsonld) + "</script>\n" : ""}<link rel="icon" type="image/png" href="assets/img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Mulish:wght@400;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<a class="salto" href="#contenido">Saltar al contenido</a>

<header class="cabecera">
  <div class="contenedor">
    <a class="marca" href="index.html" aria-label="Juntos ante el Cushing, ir al inicio">
      <img src="assets/img/logo-oficial.png" alt="Logo de Juntos ante el Cushing" width="1200" height="738">
    </a>
    <nav aria-label="Menú principal">
      <button class="boton-menu" aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menú">${ico.menu}</button>
      <ul class="menu" id="menu-principal">
        ${nav}
      </ul>
    </nav>
  </div>
</header>

<main id="contenido">
${body}
</main>

<footer class="pie">
  <div class="contenedor">
    <div class="pie-rejilla">
      <div>
        <div class="pie-logo"><img src="assets/img/logo-oficial.png" alt="Juntos ante el Cushing" width="1200" height="738"></div>
        <p class="pie-frase">Porque nadie debería recorrer este camino en soledad.</p>
        <div class="pie-redes">
          <a href="${REDES.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ico.instagram}</a>
          <a href="${REDES.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ico.facebook}</a>
          <a href="${REDES.x}" target="_blank" rel="noopener" aria-label="X (antes Twitter)">${ico.x}</a>
          <a href="mailto:${REDES.email}" aria-label="Correo electrónico">${ico.mail}</a>
        </div>
      </div>
      <div>
        <h4>La web</h4>
        <ul>
          ${MENU.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('\n          ')}
        </ul>
      </div>
      <div>
        <h4>Participa</h4>
        <ul>
          <li><a href="apoyo.html#unete">Únete a la asociación</a></li>
          <li><a href="apoyo.html#whatsapp">Comunidad de WhatsApp</a></li>
          <li><a href="proceso.html#testimonios">Testimonios</a></li>
          <li><a href="eventos.html">8 de abril, Día Mundial</a></li>
        </ul>
      </div>
      <div>
        <h4>Contacto</h4>
        <ul>
          <li><a href="mailto:${REDES.email}">${REDES.email}</a></li>
          <li><a href="tel:+34648524836">648 524 836</a> (Aina)</li>
          <li><a href="tel:+34622664156">622 664 156</a> (Leticia)</li>
        </ul>
      </div>
    </div>
    <div class="pie-aviso">
      <p>© <span id="anio">2026</span> Asociación Juntos ante el Cushing · Entidad sin ánimo de lucro</p>
      <p><a href="aviso-legal.html">Aviso legal</a> · <a href="politica-privacidad.html">Privacidad</a> · <a href="politica-cookies.html">Cookies</a></p>
    </div>
    <p class="pie-aviso" style="border:0;margin-top:10px;padding-top:0">La información de esta web es divulgativa y no sustituye la valoración, el diagnóstico ni el tratamiento de un profesional sanitario.</p>
  </div>
</footer>

<script src="assets/js/main.js"></script>
</body>
</html>
`;
}

for (const f of fs.readdirSync(SRC).filter(f => f.endsWith('.html'))) {
  const txt = fs.readFileSync(path.join(SRC, f), 'utf8');
  const nl = txt.indexOf('\n');
  const meta = JSON.parse(txt.slice(0, nl));
  meta.ruta = f === "index.html" ? "" : f;
  let body = txt.slice(nl + 1)
    .replace(/\{\{ico:(\w+)\}\}/g, (_, k) => { if (!ico[k]) throw new Error('icono ' + k); return ico[k]; })
    .replace(/\{\{red:(\w+)\}\}/g, (_, k) => REDES[k]);
  fs.writeFileSync(path.join(OUT, f), layout(meta, body));
  console.log('ok', f);
}
