export function createTaskBar() {
    const header = document.createElement("header");
    header.className = "header";

    // --- PARTE SUPERIOR (logo, búsqueda, cuenta) ---
    const headerTop = document.createElement("div");
    headerTop.className = "header-top";

    const logo = document.createElement("div");
    logo.className = "logo";
    const logoImg = document.createElement("img");
    logoImg.src = "/MainPage/resources/logo.png";
    logoImg.alt = "Logo";
    logo.appendChild(logoImg);
    headerTop.appendChild(logo);

    const searchForm = document.createElement("form");
    searchForm.className = "search-form";
    searchForm.onsubmit = e => e.preventDefault();
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Buscar recetas, ingredientes...";
    searchInput.className = "search-input";
    searchForm.appendChild(searchInput);
    headerTop.appendChild(searchForm);

    const userArea = document.createElement("div");
    userArea.className = "user-area";

    const cuenta = document.createElement("button");
    cuenta.textContent = "Mi cuenta ▽";
    cuenta.className = "cuenta-btn";

    const login = document.createElement("button");
    login.textContent = "Iniciar sesión";
    login.className = "login-btn";

    userArea.appendChild(cuenta);
    userArea.appendChild(login);
    headerTop.appendChild(userArea);

    header.appendChild(headerTop);

    document.body.appendChild(header);
}


export function createFooter() {
    const footer = document.createElement("footer");
    footer.className = "footer";

    const top = document.createElement("div");
    top.className = "footer-top";

    const logoSection = document.createElement("div");
    logoSection.className = "footer-logo-section";

    const logo = document.createElement("h2");
    logo.textContent = "CocinaFácil";
    logo.className = "footer-logo";
    logoSection.appendChild(logo);

    const description = document.createElement("p");
    description.textContent = "Tu portal de recetas favorito para descubrir, compartir y disfrutar de la mejor gastronomía.";
    logoSection.appendChild(description);

    const social = document.createElement("div");
    social.className = "footer-social";
    ["fa-facebook-f", "fa-instagram", "fa-x-twitter", "fa-youtube"].forEach(icon => {
        const i = document.createElement("i");
        i.className = `fab ${icon}`;
        social.appendChild(i);
    });
    logoSection.appendChild(social);
    top.appendChild(logoSection);

    [
        {
            titulo: "Enlaces rápidos",
            enlaces: ["Inicio", "Categorías", "Recetas populares", "Recetas rápidas", "Subir receta"]
        },
        {
            titulo: "Categorías",
            enlaces: ["Desayunos", "Comidas", "Cenas", "Postres", "Bebidas"]
        },
        {
            titulo: "Soporte",
            enlaces: ["Centro de ayuda", "Contacto", "Política de privacidad", "Términos y condiciones", "Política de cookies"]
        }
    ].forEach(section => {
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
    copy.innerHTML = "© 2025 <a href=\"#\">CocinaFácil</a>. Todos los derechos reservados.";
    legal.appendChild(copy);

    const links = document.createElement("div");
    links.className = "legal-links";
    ["Política de privacidad", "Términos y condiciones", "Política de cookies"].forEach(txt => {
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = txt;
        links.appendChild(a);
    });
    legal.appendChild(links);

    bottom.appendChild(legal);

    const payments = document.createElement("div");
    payments.className = "footer-payments";
    ["fa-cc-visa", "fa-cc-mastercard", "fa-cc-paypal", "fa-apple-pay"].forEach(icon => {
        const i = document.createElement("i");
        i.className = `fab ${icon}`;
        payments.appendChild(i);
    });

    bottom.appendChild(payments);
    footer.appendChild(bottom);

    document.body.appendChild(footer);
}


export function contactDatabase(parametrer) {
    fetch(parametrer)
    .then(res => res.json())
    .then(data => {
        return data;
        // Mostrar receta en la página
    })
    .catch(err => console.error(err));
}

export function convertData(rawData) {
    return rawData.map(receta => {
        return {
            ...receta,
            ingredientes: JSON.parse(receta.ingredientes),
            pasos: JSON.parse(receta.pasos),
            fotos: JSON.parse(receta.fotos)
        };
    });
}
