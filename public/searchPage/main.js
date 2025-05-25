import { contactDatabase, createTaskBar, createFooter, convertData } from "../functions.js";

function renderRecetas(data) {
    const container = document.createElement('div'); // Cambio importante aquí
    container.className = "recetas-grid";

    data.forEach(receta => {
        const card = document.createElement('div');
        card.className = 'receta-card';

        const imagen = JSON.parse(receta.fotos)[0] || 'placeholder.jpg';

        card.innerHTML = `
            <img src="${imagen}" alt="${receta.titulo}">
            <div class="receta-info">
                <div class="receta-titulo">${receta.titulo}</div>
                <div class="receta-tiempo">🕒 ${receta.tiempo_preparacion}</div>
                <div class="receta-personas">👥 ${receta.personas} personas</div>
            </div>
        `;

        container.appendChild(card);
    });

    document.body.appendChild(container);
}

createTaskBar();

const params = new URLSearchParams(window.location.search);

let url;

if (params.has('id')) {
    const id = params.get('id');
    url = "/api/database?id=" + encodeURIComponent(id);
} else if (params.has('name')) {
    const nombre = params.get('name');
    url = "/api/database?name=" + encodeURIComponent(nombre);
} else if (params.has('category')) {
    const categoria = params.get('category');
    url = "/api/database?category=" + encodeURIComponent(categoria);
} else {
    url = "/api/database";
}

await contactDatabase(url)
    .then(data => {
        if (!data || data.length === 0) {
            mostrarNoRecetas();
        } else {
            renderRecetas(data);
        }
    })
    .catch(err => {
        if (err.message && err.message.includes('404')) {
            // Error 404: No se encontraron recetas en esa categoría
            mostrarNoRecetas();
        } else {
            console.error("Error al cargar recetas:", err);
        }
    });

function mostrarNoRecetas() {
    const noRecetasDiv = document.createElement('div');
    noRecetasDiv.className = 'no-recetas';
    noRecetasDiv.textContent = 'No se han encontrado recetas.';
    Object.assign(noRecetasDiv.style, {
        color: 'black',
        fontWeight: 'bold',
        fontFamily: '"Tsukimi Rounded", serif',
        textAlign: 'center',
        marginTop: '100px',
        marginBottom: '125px',
        fontSize: '1.2rem',
        padding: '20px',
    });

    const footer = document.querySelector('.footer');
    if (footer) {
        footer.parentNode.insertBefore(noRecetasDiv, footer);
    } else {
        document.body.appendChild(noRecetasDiv);
    }
}



createFooter();