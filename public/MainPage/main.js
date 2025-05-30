import { contactDatabase, createTaskBar, createFooter } from "../functions.js";

function createButtonTaskBar() {
    const headerBottom = document.createElement("nav");
    headerBottom.className = "nav";

    [
        "Inicio",
        "Categorías",
        "Recetas populares",
        "Recetas rápidas",
        "Cocina internacional",
        "Postres",
        "Saludable"
    ].forEach(text => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = text;
        headerBottom.appendChild(link);
    });

    document.body.appendChild(headerBottom);
}

function createHeroSection() {
    const hero = document.createElement("section");
    hero.className = "hero";

    const backgroundImg = document.createElement("img");
    backgroundImg.src = "/resources/background_image.jpg";
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

    buttons.appendChild(explorar);
    buttons.appendChild(crearCuenta);

    content.appendChild(buttons);
    hero.appendChild(content);

    document.body.appendChild(hero);
}

function createCategories() {
    const container = document.createElement("div");

    const titulo = document.createElement("h2");
    titulo.className = "categorias-titulo";
    titulo.textContent = "Categorías populares";
    container.appendChild(titulo);

    const lista = document.createElement("div");
    lista.className = "categorias-lista";

    const categorias = [
        { nombre: "Pasta", imagen: "/resources/pastas.jpg" },
        { nombre: "Postres", imagen: "/resources/postres.jpg" },
        { nombre: "Ensaladas", imagen: "/resources/ensaladas.jpg" },
        { nombre: "Carnes", imagen: "/resources/carnes.jpg" },
        { nombre: "Pescados", imagen: "/resources/mariscos.jpg" },
        { nombre: "Vegetariano", imagen: "/resources/vegetariano.jpg" }
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
            // Codificamos la categoría para la URL y redirigimos
            const categoriaCodificada = encodeURIComponent(cat.nombre);
            window.location.href = `../searchPage/index.html?category=${categoriaCodificada}`;
        };

        card.appendChild(img);
        card.appendChild(overlay);
        lista.appendChild(card);
    });

    container.appendChild(lista);
    document.body.appendChild(container);
}

createTaskBar();
createButtonTaskBar();
createHeroSection();
createCategories();
createFooter();

