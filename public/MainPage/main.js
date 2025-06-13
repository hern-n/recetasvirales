import { contactDatabase, createTaskBar, createFooter, showLoader, hideLoader } from "../functions.js";

function createButtonTaskBar(container) {
    const headerBottom = document.createElement("nav");
    headerBottom.className = "nav";

    // Diccionario con el texto del enlace como clave y el ID como valor
    const secciones = {
        "Categorías": "categorias",
        "Recetas populares": "recetas_destacadas",
        "Recetas rápidas": null,
        "Cocina internacional": null,
        "Postres": null,
        "Saludable": null,
        "Inicio": null
    };

    // Recorremos el diccionario
    Object.entries(secciones).forEach(([texto, idDestino]) => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = texto;

        // Solo añadimos evento si tiene un ID asociado
        if (idDestino) {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = "#" + idDestino;
            });
        }

        headerBottom.appendChild(link);
    });

    container.appendChild(headerBottom);
}

function createHeroSection(container) {
    const hero = document.createElement("section");
    hero.className = "hero";

    const backgroundImg = document.createElement("img");
    backgroundImg.src = "../resources/categories/background_image.jpg";
    backgroundImg.alt = "Fondo de Hero";
    hero.appendChild(backgroundImg);

    const content = document.createElement("div");
    content.className = "hero-content";

    const h1 = document.createElement("h1");
    h1.textContent = "Descubre y comparte las mejores recetas del mundo";
    content.appendChild(h1);

    const p = document.createElement("p");
    p.textContent = "Explora miles de recetas, guarda tus favoritas y comparte tus creaciones culinarias con nuestra comunidad.";
    content.appendChild(p);

    const buttons = document.createElement("div");
    buttons.className = "hero-buttons";

    const explorar = document.createElement("button");
    explorar.textContent = "Explorar recetas";
    explorar.className = "explorar-btn";

    const crearCuenta = document.createElement("button");
    crearCuenta.textContent = "Crear cuenta";
    crearCuenta.className = "crear-cuenta-btn";
    crearCuenta.id = "categorias";

    buttons.appendChild(explorar);
    buttons.appendChild(crearCuenta);

    content.appendChild(buttons);
    hero.appendChild(content);

    container.appendChild(hero);
}

function createCategories(container) {
    const cont = document.createElement("div");

    const titulo = document.createElement("h2");
    titulo.className = "categorias-titulo";
    titulo.textContent = "Categorías populares";
    cont.appendChild(titulo);

    const lista = document.createElement("div");
    lista.className = "categorias-lista";

    const categorias = [
        { nombre: "Entrantes", imagen: "../resources/categories/entrantes.jpg" },
        { nombre: "Platos fuertes", imagen: "../resources/categories/platos_fuertes.jpg" },
        { nombre: "Vegetariano", imagen: "../resources/categories/vegetariano.jpg" },
        { nombre: "Carnes", imagen: "../resources/categories/carnes.jpg" },
        { nombre: "Pescados", imagen: "../resources/categories/pescados.jpg" },
        { nombre: "Dulces", imagen: "../resources/categories/dulces.jpg" }
    ];

    categorias.forEach(cat => {
        const card = document.createElement("div");
        card.className = "categoria-card";

        const img = document.createElement("img");
        img.src = cat.imagen;
        img.alt = cat.nombre;

        const overlay = document.createElement("div");
        overlay.className = "categoria-overlay";
        overlay.textContent = cat.nombre;

        card.onclick = () => {
            const categoriaCodificada = encodeURIComponent(cat.nombre);
            window.location.href = `../searchPage/index.html?category=${categoriaCodificada}`;
        };

        card.appendChild(img);
        card.appendChild(overlay);
        lista.appendChild(card);
    });
    lista.id = "recetas_destacadas"; 
    cont.appendChild(lista);
    container.appendChild(cont);
}

function renderRecetas(container, data) {
    const grid = document.createElement('div');
    grid.className = "recetas-grid";

    data.forEach(receta => {
        const card = document.createElement('div');
        card.className = 'receta-card';

        const fotos = Array.isArray(receta.fotos) ? receta.fotos : [];
        let imagenSrc = fotos.find(foto => foto !== 'place_holder') || 'placeholder.jpg';

        const img = document.createElement('img');
        img.src = imagenSrc;
        img.alt = receta.titulo;

        const infoDiv = document.createElement('div');
        infoDiv.className = 'receta-info';

        const tituloDiv = document.createElement('div');
        tituloDiv.className = 'receta-titulo';
        tituloDiv.textContent = receta.titulo;

        const tiempoDiv = document.createElement('div');
        tiempoDiv.className = 'receta-tiempo';
        tiempoDiv.textContent = `🕒 ${receta.tiempo_preparacion}`;

        const personasDiv = document.createElement('div');
        personasDiv.className = 'receta-personas';
        personasDiv.textContent = `👥 ${receta.raciones} raciones`;

        infoDiv.appendChild(tituloDiv);
        infoDiv.appendChild(tiempoDiv);
        infoDiv.appendChild(personasDiv);

        card.appendChild(img);
        card.appendChild(infoDiv);

        card.onclick = () => {
            const idCodificado = encodeURIComponent(receta.id);
            window.location.href = `../TemplatePage/index.html?id=${idCodificado}`;
        };

        grid.appendChild(card);
    });

    container.appendChild(grid);
}

async function createFeaturedRecepies(container) {
    const mainContainer = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = "Recetas destacadas";
    title.className = "categorias-titulo";
    mainContainer.appendChild(title);
    container.appendChild(mainContainer);

    const receta = await contactDatabase("/api/database?random=2");
    renderRecetas(container, receta);
}

function waitForImagesToLoad() {
    const images = Array.from(document.images);
    const promises = images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
            img.onload = img.onerror = resolve;
        });
    });
    return Promise.all(promises);
}

async function renderPage() {
    // Crear el contenedor principal
    const mainContent = document.createElement('div');
    mainContent.style.display = 'none';
    document.body.insertBefore(mainContent, document.body.firstChild);

    showLoader();

    createTaskBar(mainContent);
    createButtonTaskBar(mainContent);
    createHeroSection(mainContent);
    createCategories(mainContent);
    await createFeaturedRecepies(mainContent);
    await waitForImagesToLoad();
    createFooter(mainContent);

    hideLoader();
    mainContent.style.display = 'block';

    // 👇 Scroll suave al elemento si hay hash en la URL
    const hash = window.location.hash;
    if (hash) {
        const el = document.querySelector(hash);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    }
}


window.addEventListener('DOMContentLoaded', renderPage);
