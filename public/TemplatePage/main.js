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

    // Info receta
    const info = document.createElement("div");
    info.className = "info-receta";

    // 🔘 Botón de compartir
    const botonCompartir = document.createElement("button");
    botonCompartir.className = "boton-compartir";
    botonCompartir.innerHTML = `<img src="../resources/logos/compartir.png" alt="Compartir" />`;

    // 🧱 Título + botón en línea
    const tituloCompartir = document.createElement("div");
    tituloCompartir.className = "titulo-compartir";

    const titulo = document.createElement("h1");
    titulo.className = "titulo-receta";
    titulo.textContent = receta.titulo;

    tituloCompartir.appendChild(titulo);
    tituloCompartir.appendChild(botonCompartir);

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

    info.appendChild(tituloCompartir);
    info.appendChild(tiempo);
    info.appendChild(personas);
    info.appendChild(ingredientesTitulo);
    info.appendChild(listaIngredientes);

    const encabezado = document.createElement("div");
    encabezado.className = "encabezado-receta";
    encabezado.appendChild(galeria);
    encabezado.appendChild(info);

    contenedor.appendChild(encabezado);

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

    // 🪟 Overlay y modal
    const overlay = document.createElement("div");
    overlay.className = "overlay-compartir";
    overlay.style.display = "none";

    const modal = document.createElement("div");
    modal.className = "modal-compartir";
    modal.innerHTML = `
        <h2>Compartir</h2>
        <div class="opciones-compartir">
            <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}" target="_blank" title="Compartir por WhatsApp">
                <img src="../resources/logos/whatsapp.png" alt="WhatsApp" />
            </a>
            <a href="mailto:?subject=¡Mira esta receta!&body=${encodeURIComponent(window.location.href)}" title="Compartir por correo">
                <img src="../resources/logos/correo.png" alt="Correo" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" title="Compartir en Instagram">
                <img src="../resources/logos/instagram.png" alt="Instagram" />
            </a>
            <button id="copiar-enlace" title="Copiar enlace">
                <img src="../resources/logos/enlace.png" alt="Copiar enlace" />
            </button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // 📋 Copiar enlace
    modal.querySelector("#copiar-enlace").addEventListener("click", () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert("¡Enlace copiado!");
        });
    });

    // ❌ Cerrar al pulsar fuera
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });

    // Abrir modal
    botonCompartir.addEventListener("click", () => {
        overlay.style.display = "flex";
    });
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
