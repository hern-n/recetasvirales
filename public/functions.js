export function createTaskBar(info) {
    const header = document.createElement("header");
    header.className = "header";

    // --- PARTE SUPERIOR (logo, búsqueda, cuenta) ---
    const headerTop = document.createElement("div");
    headerTop.className = "header-top";

    const logo = document.createElement("div");
    logo.className = "logo";
    const logoImg = document.createElement("img");
    logoImg.src = info.logo.src;
    logoImg.alt = info.logo.alt;
    logo.appendChild(logoImg);
    headerTop.appendChild(logo);

    const searchForm = document.createElement("form");
    searchForm.className = "search-form";
    searchForm.onsubmit = e => e.preventDefault();
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = info.search.placeholder;
    searchInput.className = "search-input";
    searchForm.appendChild(searchInput);
    headerTop.appendChild(searchForm);

    const userArea = document.createElement("div");
    userArea.className = "user-area";

    const cuenta = document.createElement("button");
    cuenta.textContent = info.user.cuenta;
    cuenta.className = "cuenta-btn";

    const login = document.createElement("button");
    login.textContent = info.user.login;
    login.className = "login-btn";

    userArea.appendChild(cuenta);
    userArea.appendChild(login);
    headerTop.appendChild(userArea);

    header.appendChild(headerTop);

    document.body.appendChild(header);
}

export function contactDatabase(parametrer) {
    fetch(parametrer)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // Mostrar receta en la página
    })
    .catch(err => console.error(err));
}