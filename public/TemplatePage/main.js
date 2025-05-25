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
    botonCompartir.src = "../MainPage/resources/logo.png"; // Cambia la ruta si es necesario
    botonCompartir.alt = "Compartir receta";


    // Burbuja flotante
    const burbuja = document.createElement("div");
    burbuja.className = "burbuja-compartir oculto"; // Oculto por defecto

    const enlacePagina = window.location.href;

    burbuja.innerHTML = `
    <a href="https://wa.me/?text=${encodeURIComponent(enlacePagina)}" target="_blank">📱 WhatsApp</a>
    <a href="https://www.instagram.com/" target="_blank">📸 Instagram</a>
    <button id="copiar-enlace">🔗 Copiar enlace</button>
    <a href="mailto:?subject=Receta&body=${encodeURIComponent(enlacePagina)}">✉️ Correo</a>
`;

    // Mostrar/ocultar burbuja al hacer clic
    botonCompartir.addEventListener("click", () => {
        burbuja.classList.toggle("oculto");
    });

    document.addEventListener("click", (e) => {
        if (!burbuja.contains(e.target) && e.target !== botonCompartir) {
            burbuja.classList.add("oculto");
        }
    });


    // Función copiar enlace
    burbuja.querySelector("#copiar-enlace").addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(enlacePagina);
            alert("¡Enlace copiado!");
        } catch (err) {
            alert("No se pudo copiar el enlace.");
        }
    });

    info.appendChild(botonCompartir);
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

// Receta de demostración si no se encuentra ninguna válida
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
    url = "/api/database?id=" + encodeURIComponent(id);
    console.log(`Id: ${id}`);
}

await contactDatabase(url)
    .then(receta => {
        console.log("Receta:", receta);

        // Si es un array, tomamos el primer elemento
        if (Array.isArray(receta)) {
            receta = receta[0];
        }

        if (!receta || !receta.titulo) {
            crearPaginaReceta(recetaDemo);
        } else {
            // Si algún campo viene como string, lo parseamos
            if (typeof receta.ingredientes === "string") {
                receta.ingredientes = JSON.parse(receta.ingredientes);
            }
            if (typeof receta.pasos === "string") {
                receta.pasos = JSON.parse(receta.pasos);
            }
            if (typeof receta.fotos === "string") {
                receta.fotos = JSON.parse(receta.fotos);
            }

            crearPaginaReceta(receta);
        }
    })
    .catch(err => {
        console.error("Error al cargar receta:", err);
        crearPaginaReceta(recetaDemo); // Carga demo por si acaso
    });

createFooter();
