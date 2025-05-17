import { contactDatabase, createTaskBar } from "/public/functions.js";

function createHeroSection(info) {
    const hero = document.createElement("section");
    hero.className = "hero";

    const backgroundImg = document.createElement("img");
    backgroundImg.src = info.imagen;
    backgroundImg.alt = info.alt;
    hero.appendChild(backgroundImg);

    const content = document.createElement("div");
    content.className = "hero-content";

    const h1 = document.createElement("h1");
    h1.textContent = info.titulo;
    content.appendChild(h1);

    const p = document.createElement("p");
    p.textContent = info.descripcion;
    content.appendChild(p);

    const buttons = document.createElement("div");
    buttons.className = "hero-buttons";

    const explorar = document.createElement("button");
    explorar.textContent = info.botones.explorar;
    explorar.className = "explorar-btn";

    const crearCuenta = document.createElement("button");
    crearCuenta.textContent = info.botones.crearCuenta;
    crearCuenta.className = "crear-cuenta-btn";

    buttons.appendChild(explorar);
    buttons.appendChild(crearCuenta);

    content.appendChild(buttons);
    hero.appendChild(content);

    document.body.appendChild(hero);
}

function createCategories(info) {
    const container = document.createElement("div");

    const titulo = document.createElement("h2");
    titulo.className = "categorias-titulo";
    titulo.textContent = info.titulo;
    container.appendChild(titulo);

    const lista = document.createElement("div");
    lista.className = "categorias-lista";

    info.lista.forEach(cat => {
        const card = document.createElement("div");
        card.className = "categoria-card";

        const img = document.createElement("img");
        img.src = cat.imagen;
        img.alt = cat.nombre;

        const overlay = document.createElement("div");
        overlay.className = "categoria-overlay";
        overlay.textContent = cat.nombre;

        card.appendChild(img);
        card.appendChild(overlay);
        lista.appendChild(card);
    });

    container.appendChild(lista);
    document.body.appendChild(container);
}

function createFooter(info) {
    const footer = document.createElement("footer");
    footer.className = "footer";

    const top = document.createElement("div");
    top.className = "footer-top";

    const logoSection = document.createElement("div");
    logoSection.className = "footer-logo-section";

    const logo = document.createElement("h2");
    logo.textContent = info.logo;
    logo.className = "footer-logo";
    logoSection.appendChild(logo);

    const description = document.createElement("p");
    description.textContent = info.descripcion;
    logoSection.appendChild(description);

    const social = document.createElement("div");
    social.className = "footer-social";
    info.redes.forEach(icon => {
        const i = document.createElement("i");
        i.className = `fab ${icon}`;
        social.appendChild(i);
    });
    logoSection.appendChild(social);
    top.appendChild(logoSection);

    info.secciones.forEach(section => {
        const div = document.createElement("div");
        div.className = "footer-section";

        const title = document.createElement("h3");
        title.textContent = section.titulo;
        div.appendChild(title);

        section.enlaces.forEach(item => {
            const a = document.createElement("a");
            a.href = "#";
            a.textContent = item;
            div.appendChild(a);
        });

        top.appendChild(div);
    });

    footer.appendChild(top);

    const line = document.createElement("hr");
    line.className = "footer-divider";
    footer.appendChild(line);

    const bottom = document.createElement("div");
    bottom.className = "footer-bottom";

    const legal = document.createElement("div");
    legal.className = "footer-legal";

    const copy = document.createElement("p");
    copy.innerHTML = info.copy;
    legal.appendChild(copy);

    const links = document.createElement("div");
    links.className = "legal-links";
    info.legales.forEach(txt => {
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = txt;
        links.appendChild(a);
    });
    legal.appendChild(links);

    bottom.appendChild(legal);

    const payments = document.createElement("div");
    payments.className = "footer-payments";
    info.pagos.forEach(icon => {
        const i = document.createElement("i");
        i.className = `fab ${icon}`;
        payments.appendChild(i);
    });

    bottom.appendChild(payments);
    footer.appendChild(bottom);

    document.body.appendChild(footer);
}

fetch('/MainPage/data.json')
    .then(res => res.json())
    .then(data => {
        createTaskBar(data.taskBar);
        createHeroSection(data.hero);
        createCategories(data.categorias);
        createFooter(data.footer);
    });

contactDatabase("/api/database?id=1");
contactDatabase("/api/database?name=Tortilla");
contactDatabase("/api/database?categoria=plato");
