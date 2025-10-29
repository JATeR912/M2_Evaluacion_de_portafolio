document.addEventListener("DOMContentLoaded", () => {
  const proyecto = [
    {
      id: 1,
      nombre: "Proyecto modulo 2",
      modulo: "Fundamentos del desarrollo Front-End",
      programa: "HTML, CSS y JavaScript",
      descripcion: "Pagina sobre ciber seguridad.",
      url: "",
    },
    {
      id: 2,
      nombre: "Proyecto modulo 3",
      modulo: "Fundamentos de programación en Python",
      programa: "Python",
      descripcion: "Gestor de tareas que permite crear, editar y eliminar tareas.",
      url: "",
    },
    {
      id: 3,
      nombre: "Proyecto modulo 4",
      modulo: "Programación avanzada en Python",
      programa: "Python",
      descripcion: "Gestor de biblioteca con manejo de inventario.",
      url: "",
    },
  ];

  const busqueda = document.getElementById("busqueda");
  const sinResultados = document.getElementById("sinResultados");
  const totalResultados = document.getElementById("totalResultados");
  const borrar = document.getElementById("borrar");
  const listaProyectos = document.getElementById("listaProyectos");
  const verTodos = document.getElementById("verTodos");

  // Función para mostrar proyectos
  const buscarProyectos = (archivo) => {
    listaProyectos.innerHTML = "";
    totalResultados.textContent = `Se encontraron ${archivo.length} proyecto(s).`;

    if (archivo.length === 0) {
      sinResultados.style.display = "block";
    } else {
      archivo.forEach((proyecto) => {
        const content = document.createElement("div");
        content.classList.add("Proyecto");
        content.innerHTML = `
          <h5><strong>${proyecto.nombre}</strong></h5>
          <p><strong>Modulo:</strong> ${proyecto.modulo}</p>
          <p><strong>Programa(s):</strong> ${proyecto.programa}</p>
          <p><strong>Descripcion:</strong> ${proyecto.descripcion}</p>
          <a href="${proyecto.url}" target="_blank">Ver Proyecto en GitHub</a>
        `;
        listaProyectos.appendChild(content);
      });
      sinResultados.style.display = "none";
    }
  };

  // Función para búsqueda de texto
  const buscandoProyectos = () => {
    const searchTerm = busqueda.value.toLowerCase().trim();
    const filtrados = proyecto.filter(
      (p) =>
        p.nombre.toLowerCase().includes(searchTerm) ||
        p.modulo.toLowerCase().includes(searchTerm) ||
        p.programa.toLowerCase().includes(searchTerm)
    );
    buscarProyectos(filtrados);
  };

  // Mostrar todos al cargar la página
  buscarProyectos(proyecto);

  // Inicialmente ocultar los botones borrar y verTodos
  borrar.style.display = "none";
  verTodos.style.display = "none";

  // Evento input para búsqueda por texto
  busqueda.addEventListener("input", () => {
    const tieneTexto = busqueda.value.trim() !== "";

    // Mostrar u ocultar botón borrar según si hay texto
    borrar.style.display = tieneTexto ? "inline-block" : "none";

    // Ocultar botón "verTodos" cuando se escribe en búsqueda
    verTodos.style.display = "none";

    // Ejecutar filtro por texto
    buscandoProyectos();
  });

  // Botón borrar para limpiar búsqueda
  borrar.addEventListener("click", () => {
    busqueda.value = "";
    borrar.style.display = "none";

    // Ocultar botón "verTodos" al borrar
    verTodos.style.display = "none";

    // Mostrar todos los proyectos
    buscarProyectos(proyecto);
  });

  // Eventos para áreas del mapa - filtro por modulo
  document.querySelectorAll("area").forEach((area) => {
    area.addEventListener("click", (e) => {
      e.preventDefault();
      const moduloSeleccionado = area.dataset.modulo;

      // Filtrar proyectos según módulo seleccionado
      const filtrados = proyecto.filter(
        (p) => p.modulo === moduloSeleccionado
      );

      buscarProyectos(filtrados);

      // Mostrar botón "verTodos" SOLO cuando se filtra por mapa
      verTodos.style.display = "inline-block";

      // Limpiar campo de búsqueda y ocultar botón borrar
      busqueda.value = "";
      borrar.style.display = "none";
    });
  });

  // Botón "Ver todos" para mostrar todos los proyectos
  verTodos.addEventListener("click", () => {
    buscarProyectos(proyecto);

    // Limpiar campo de búsqueda
    busqueda.value = "";

    // Ocultar botones borrar y verTodos
    borrar.style.display = "none";
    verTodos.style.display = "none";

    sinResultados.style.display = "none";
  });

  // Ajuste automático del mapa para que quede responsivo
  window.addEventListener('load', () => {
    if(typeof imageMapResize === "function"){
      imageMapResize();
    }
  });
});


// Función para mostrar svg color escalones
document.addEventListener("DOMContentLoaded", function() {
  const svgOverlay = document.getElementById("overlayMapa");
  const imagen = document.getElementById("imagenEscalera");
  const areas = document.querySelectorAll("area");

  const colores = {
     "Orientación al perfil y metodología del curso": "rgba(255, 99, 71, 0.35)",
    "Fundamentos del desarrollo Front-End": "rgba(255, 165, 0, 0.35)",
    "Fundamentos de programación en Python": "rgba(255, 215, 0, 0.35)",
    "Programación avanzada en Python": "rgba(144, 238, 144, 0.35)",
    "Fundamentos de bases de datos relacionales": "rgba(173, 216, 230, 0.35)",
    "Desarrollo de aplicaciones web con Python y Django": "rgba(186, 85, 211, 0.35)",
    "Acceso a datos en aplicaciones Python y Django": "rgba(255, 182, 193, 0.35)",
    "Desarrollo de portafolio de un producto digital": "rgba(135, 206, 250, 0.35)",
    "Desarrollo de empleabilidad en la industria digital": "rgba(255, 228, 181, 0.35)"
  };

function ajustarTamañoSVG() {
  const imagen = document.getElementById("imagenEscalera");
  const svgOverlay = document.getElementById("overlayMapa");
  const rect = imagen.getBoundingClientRect();
  svgOverlay.setAttribute("width", rect.width);
  svgOverlay.setAttribute("height", rect.height);
}

window.addEventListener("resize", ajustarTamañoSVG);
document.getElementById("imagenEscalera").addEventListener("load", ajustarTamañoSVG);
ajustarTamañoSVG();

  areas.forEach(area => {
    area.addEventListener("mouseenter", () => {
      const coords = area.coords.split(",").map(Number);
      const puntos = [];
      for (let i = 0; i < coords.length; i += 2) {
        puntos.push(coords[i] + "," + coords[i + 1]);
      }

      const color = colores[area.dataset.modulo] || "rgba(255,0,0,0.35)";
      svgOverlay.innerHTML = `
        <polygon points="${puntos.join(" ")}"
                 fill="${color}">
        </polygon>
      `;
    });

    area.addEventListener("mouseleave", () => {
      svgOverlay.innerHTML = "";
    });
  });
});

//Ventana AboutMe
function actualizarCielo() {
  const hora = new Date().getHours();
  const ventanas = document.querySelectorAll('.ventana');
  let color;

  if (hora >= 6 && hora < 9) color = 'url(#amanecer)';
  else if (hora >= 9 && hora < 17) color = 'url(#dia)';
  else if (hora >= 17 && hora < 20) color = 'url(#atardecer)';
  else color = 'url(#noche)';

  ventanas.forEach(v => v.setAttribute('fill', color));
}

// Añadimos gradientes al SVG
const svg = document.getElementById('escena');
const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
defs.innerHTML = `
  <linearGradient id="amanecer" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FFD580"/>
    <stop offset="100%" stop-color="#FFFAE3"/>
  </linearGradient>
  <linearGradient id="dia" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#87CEEB"/>
    <stop offset="100%" stop-color="#ffffff"/>
  </linearGradient>
  <linearGradient id="atardecer" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FF8C00"/>
    <stop offset="100%" stop-color="#FFD580"/>
  </linearGradient>
  <linearGradient id="noche" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#001848"/>
    <stop offset="100%" stop-color="#0A043C"/>
  </linearGradient>
`;
svg.prepend(defs);

actualizarCielo();
setInterval(actualizarCielo, 60000);

/// Gracias por venir, bueno mi nombre es Johana Torres y estoy trabajando para ser desarrolladora web full stack.
                    
//Me considero una persona un poco terca y autodidacta sobre todo cuando deseo aprender algo nuevo, como por ejemplo... programación. 

//Ingrese a este bootcamp porque me pareció un buen paso para iniciar en este campo, y que de ser posible me gustaría fuera mi profesión algún día, no solo por el hecho de que el poder visualizar algo que creaste desde 0 me ha aparecido siempre una de las sensaciones más gratificantes del mundo, sino que también el tema de programar 
                   // siempre ha llamado mi atención y después de meditarlo bastante, decidí postular y 
                    //ahora estoy aquí, ahora solo queda ver hasta donde llegaré.

//Caja de texto aboutMe

document.addEventListener("DOMContentLoaded", function () {
  const historiaTexto = `Hola!`;

  const historiaTextContainer = document.getElementById("historiaText");

  let i = 0;
  const velocidad = 30; // milisegundos por letra

  function escribirTexto() {
    if (i < historiaTexto.length) {
      historiaTextContainer.innerHTML += historiaTexto.charAt(i);
      historiaTextContainer.scrollTop = historiaTextContainer.scrollHeight;
      i++;
      setTimeout(escribirTexto, velocidad);
    }
  }

  function scrollHistoria(cantidad) {
    historiaTextContainer.scrollBy({
      top: cantidad,
      behavior: 'smooth'
    });
  }

  // Iniciar animación al cargar
  escribirTexto();

  // Hacer la función global para que los botones la encuentren
  window.scrollHistoria = scrollHistoria;
});