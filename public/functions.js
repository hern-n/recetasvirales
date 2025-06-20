export function createTaskBar(container) {
    const header = document.createElement("header");
    header.className = "header";

    const headerTop = document.createElement("div");
    headerTop.className = "header-top";

    const logo = document.createElement("button");
    logo.className = "logo";
    logo.style.border = "none";
    logo.style.background = "none";
    logo.style.cursor = "pointer";
    logo.onclick = () => {
        window.location.href = "../MainPage/index.html";
    };

    const logoImg = document.createElement("img");
    logoImg.src = "/resources/logos/logo.png";
    logoImg.alt = "Logo";
    logo.appendChild(logoImg);
    headerTop.appendChild(logo);

    const searchForm = document.createElement("form");
    searchForm.className = "search-form";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Buscar recetas, ingredientes...";
    searchInput.className = "search-input";

    // Manejo del envío solo si hay texto
    searchForm.onsubmit = (e) => {
        e.preventDefault();
        const searchValue = searchInput.value.trim();
        if (searchValue.length > 0) {
            const encoded = encodeURIComponent(searchValue);
            window.location.href = `../searchPage/index.html?name=${encoded}`;
        }
    };

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

    (container ? container : document.body).appendChild(header);
}

export function createFooter() {
    const footer = document.createElement("footer");
    footer.className = "footer";

    const top = document.createElement("div");
    top.className = "footer-top";

    const logoSection = document.createElement("div");
    logoSection.className = "footer-logo-section";

    const logo = document.createElement("h2");
    logo.textContent = "RecetasVirales";
    logo.className = "footer-logo";
    logoSection.appendChild(logo);

    const description = document.createElement("p");
    description.textContent = "Tu portal de recetas favorito para descubrir, compartir y disfrutar de la mejor gastronomía.";
    logoSection.appendChild(description);

    top.appendChild(logoSection);

    // Aquí defines los enlaces con su id o URL
    const enlacesConDestino = {
        "Inicio": null,
        "Categorías": "/MainPage/index.html#categorias",
        "Recetas populares": "#recetas_destacadas",
        "Recetas rápidas": null,
        "Subir receta": null,
        "Desayunos": "/MainPage/index.html#categorias",
        "Comidas": "/MainPage/index.html#categorias",
        "Cenas": "/MainPage/index.html#categorias",
        "Postres": "/MainPage/index.html#categorias",
        "Bebidas": "/MainPage/index.html#categorias",
        "Centro de ayuda": null,
        "Contacto": null,
        "Política de privacidad": null,
        "Términos y condiciones": null,
        "Política de cookies": null
    };

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
            a.textContent = item;
            a.href = "#"; // Por defecto

            // Si tiene destino definido y no es null, añade el listener para evitar el salto y cambiar URL
            const destino = enlacesConDestino[item];
            if (destino) {
                a.addEventListener("click", e => {
                    e.preventDefault();
                    window.location.href = destino;
                });
            }

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
    copy.innerHTML = "© 2025 <a href=\"#\">RecetasVirales</a>. Todos los derechos reservados.";
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

export async function contactDatabase(parameter) {
    try {
        const res = await fetch(parameter);
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Error ${res.status}: ${text}`);
        }
        const json = await res.json();
        return json; // ✅ Devuelve directamente el array de recetas
    } catch (err) {
        console.error("Error en contactDatabase:", err);
        throw err;
    }
}

export async function showLoader() {
    // Cargar el CSS
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "./resources/loader.css"; // Asegúrate de que loader.css esté en la misma carpeta o ajusta la ruta
    document.head.appendChild(cssLink);

    // Crear el HTML del loader directamente
    const wrapper = document.createElement("div");
    wrapper.className = "loadingio-spinner-dual-ring-nq4q5u6dq7r";

    const innerDiv = document.createElement("div");
    innerDiv.className = "ldio-x2uulkbinbj";

    const circle1 = document.createElement("div");

    const circle2 = document.createElement("div");
    const mini = document.createElement("div");

    circle2.appendChild(mini);
    innerDiv.appendChild(circle1);
    innerDiv.appendChild(circle2);
    wrapper.appendChild(innerDiv);

    wrapper.id = "loader-wrapper";
    document.body.appendChild(wrapper);
}

export function hideLoader() {
    const el = document.getElementById("loader-wrapper");
    if (el) el.remove();
}
