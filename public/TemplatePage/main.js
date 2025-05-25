import { createTaskBar, createFooter, contactDatabase } from "../functions.js";

function crearPaginaReceta(receta) {
    const body = document.body;

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor";

    // Galería de imágenes
    const galeria = document.createElement("div");
    galeria.className = "galeria";

    const imagenPrincipal = document.createElement("img");
    imagenPrincipal.className = "imagen-principal";
    imagenPrincipal.src = receta.fotos[0];
    galeria.appendChild(imagenPrincipal);

    const miniaturas = document.createElement("div");
    miniaturas.className = "miniaturas";

    receta.fotos.forEach((foto) => {
        const mini = document.createElement("img");
        mini.src = foto;
        mini.className = "miniatura";
        mini.addEventListener("click", () => {
            imagenPrincipal.src = foto;
        });
        miniaturas.appendChild(mini);
    });

    galeria.appendChild(miniaturas);

    // Datos de receta
    const info = document.createElement("div");
    info.className = "info-receta";

    const titulo = document.createElement("h1");
    titulo.className = "titulo-receta";
    titulo.textContent = receta.titulo;

    const tiempo = document.createElement("p");
    tiempo.innerHTML = `🕒 Tiempo: <strong>${receta.tiempo_preparacion}</strong>`;

    const personas = document.createElement("p");
    personas.innerHTML = `👥 Personas: <strong>${receta.personas}</strong>`;

    const ingredientesTitulo = document.createElement("h3");
    ingredientesTitulo.textContent = "Ingredientes:";

    const listaIngredientes = document.createElement("ul");
    receta.ingredientes.forEach(i => {
        const li = document.createElement("li");
        li.textContent = i;
        listaIngredientes.appendChild(li);
    });

    info.appendChild(titulo);
    info.appendChild(tiempo);
    info.appendChild(personas);
    info.appendChild(ingredientesTitulo);
    info.appendChild(listaIngredientes);

    // Botón de compartir
    const botonCompartir = document.createElement("img");
    botonCompartir.className = "boton-compartir-img";
    botonCompartir.src = "../MainPage/resources/logo.png"; // Cambia la ruta si quieres
    botonCompartir.alt = "Compartir receta";

    // Burbuja flotante con título y logos
    const burbuja = document.createElement("div");
    burbuja.className = "burbuja-compartir oculto";

    // Fondo oscuro para resaltar la burbuja
    const fondoOscuro = document.createElement("div");
    fondoOscuro.className = "fondo-oscuro oculto";

    // Título de la burbuja
    const tituloBurbuja = document.createElement("h2");
    tituloBurbuja.textContent = "Compartir";
    tituloBurbuja.className = "titulo-burbuja";

    // Contenido con enlaces + logos
    const enlacesCompartir = document.createElement("div");
    enlacesCompartir.className = "enlaces-compartir";

    // URL para compartir
    const enlacePagina = window.location.href;

    // Array con los métodos de compartir, texto y logo (cambia las URLs de las imágenes)
    const opcionesCompartir = [
        {
            nombre: "WhatsApp",
            url: `https://wa.me/?text=${encodeURIComponent(enlacePagina)}`,
            logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        },
        {
            nombre: "Instagram",
            url: "https://www.instagram.com/",
            logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
        },
        {
            nombre: "Correo",
            url: `mailto:?subject=Receta&body=${encodeURIComponent(enlacePagina)}`,
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Mail_%28iOS%29.svg"
        }
    ];

    opcionesCompartir.forEach(opcion => {
        const enlace = document.createElement("a");
        enlace.href = opcion.url;
        enlace.target = "_blank";
        enlace.className = "enlace-compartir";

        const imgLogo = document.createElement("img");
        imgLogo.src = opcion.logo;
        imgLogo.alt = opcion.nombre;
        imgLogo.className = "logo-compartir";

        const texto = document.createElement("span");
        texto.textContent = opcion.nombre;

        enlace.appendChild(imgLogo);
        enlace.appendChild(texto);

        enlacesCompartir.appendChild(enlace);
    });

    // Botón copiar enlace
    const botonCopiar = document.createElement("button");
    botonCopiar.id = "copiar-enlace";
    botonCopiar.textContent = "Copiar enlace";

    botonCopiar.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(enlacePagina);
            alert("¡Enlace copiado!");
        } catch (err) {
            alert("No se pudo copiar el enlace.");
        }
    });

    burbuja.appendChild(tituloBurbuja);
    burbuja.appendChild(enlacesCompartir);
    burbuja.appendChild(botonCopiar);

    // Mostrar/ocultar burbuja y fondo al hacer clic
    botonCompartir.addEventListener("click", () => {
        const estaOculto = burbuja.classList.contains("oculto");
        if (estaOculto) {
            burbuja.classList.remove("oculto");
            fondoOscuro.classList.remove("oculto");
            document.body.style.overflow = "hidden"; // Evitar scroll cuando burbuja está abierta
        } else {
            burbuja.classList.add("oculto");
            fondoOscuro.classList.add("oculto");
            document.body.style.overflow = ""; // Recuperar scroll
        }
    });

    // Cerrar burbuja si clicas fuera de ella o del botón
    fondoOscuro.addEventListener("click", () => {
        burbuja.classList.add("oculto");
        fondoOscuro.classList.add("oculto");
        document.body.style.overflow = "";
    });

    // También cerrar si clicas fuera directamente sobre el documento (opcional)
    document.addEventListener("click", (e) => {
        if (!burbuja.contains(e.target) && e.target !== botonCompartir && !fondoOscuro.contains(e.target)) {
            burbuja.classList.add("oculto");
            fondoOscuro.classList.add("oculto");
            document.body.style.overflow = "";
        }
    });

    info.appendChild(botonCompartir);
    body.appendChild(fondoOscuro);
    info.appendChild(burbuja);

    // Encabezado que contiene galería + info
    const encabezado = document.createElement("div");
    encabezado.className = "encabezado-receta";
    encabezado.appendChild(galeria);
    encabezado.appendChild(info);

    contenedor.appendChild(encabezado);

    // Pasos
    const pasos = document.createElement("div");
    pasos.className = "pasos";

    receta.pasos.forEach((pasoTexto, i) => {
        const paso = document.createElement("div");
        paso.className = "paso";

        const numero = document.createElement("div");
        numero.className = "paso-numero";
        numero.textContent = i + 1;

        const contenido = document.createElement("div");
        contenido.className = "paso-contenido";
        const texto = document.createElement("p");
        texto.textContent = pasoTexto;
        contenido.appendChild(texto);

        paso.appendChild(numero);
        paso.appendChild(contenido);
        pasos.appendChild(paso);
    });

    contenedor.appendChild(pasos);
    body.appendChild(contenedor);
}

// Receta demo si no hay válida
const recetaDemo = {
    titulo: "Tortilla de patatas",
    personas: 4,
    tiempo_preparacion: "30 minutos",
    ingredientes: [
        "4 huevos",
        "3 patatas medianas",
        "1 cebolla",
        "Aceite de oliva",
        "Sal"
    ],
    pasos: [
        "Pela y corta las patatas en rodajas finas. Fríelas en aceite caliente.",
        "Agrega la cebolla picada y deja que se dore junto con las patatas.",
        "Bate los huevos, mezcla con las patatas y cebolla, y cuaja en la sartén."
    ],
    fotos: [
        "https://www.recetasderechupete.com/wp-content/uploads/2013/05/tortilla-patata-tradicional.jpg",
        "https://okdiario.com/img/2019/12/09/tortilla-de-patatas-jugosa.jpg",
        "https://cdn.elcocinerocasero.com/imagen/receta/1000/2021-11-29-16-56-18/tortilla-de-patatas-tradicional.jpeg"
    ]
};

createTaskBar();

const params = new URLSearchParams(window.location.search);
let url;

if (params.has('id')) {
    const id = params.get('id');
    url = `../db/recetas/receta_${id}.json`;
    fetch(url)
        .then(resp => resp.json())
        .then(data => crearPaginaReceta(data))
        .catch(() => crearPaginaReceta(recetaDemo));
} else {
    crearPaginaReceta(recetaDemo);
}

createFooter(contactDatabase);
