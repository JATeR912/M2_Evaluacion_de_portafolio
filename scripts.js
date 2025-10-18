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

  // Mostrar todos al cargar
  buscarProyectos(proyecto);

  // Búsqueda por texto
  busqueda.addEventListener("input", () => {
    borrar.style.display = busqueda.value.trim() ? "inline-block" : "none";
    buscandoProyectos();
  });

  // Botón de borrar
  borrar.addEventListener("click", () => {
    busqueda.value = "";
    borrar.style.display = "none";
    buscarProyectos(proyecto);
  });

  // Filtro por zonas de imagen (áreas del mapa)
  document.querySelectorAll("area").forEach((area) => {
    area.addEventListener("click", (e) => {
      e.preventDefault();
      const moduloSeleccionado = area.dataset.modulo;
      const filtrados = proyecto.filter(
        (p) => p.modulo === moduloSeleccionado
      );
      buscarProyectos(filtrados);
    });
  });

  // Ajuste automático del mapa
  imageMapResize();
});

document.getElementById("verTodos").addEventListener("click", () => {
  busqueda.value = "";                          // limpia el input
  borrar.style.display = "none";               // oculta la X
  sinResultados.style.display = "none";        // oculta mensaje de no resultados
  buscarProyectos(proyecto);                   // muestra todos
});

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