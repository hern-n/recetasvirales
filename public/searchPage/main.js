import { contactDatabase, createTaskBar, createFooter } from "../functions.js";

function renderRecetas(data) {
    const container = document.createElement('div');
    container.className = "recetas-grid";

    data.forEach(receta => {
        const card = document.createElement('div');
        card.className = 'receta-card';

        // Fotos vienen directamente como array JSON
        const fotos = Array.isArray(receta.fotos) ? receta.fotos : [];

        // Buscar la primera URL válida que no sea 'place_holder'
        let imagenSrc = fotos.find(foto => foto !== 'place_holder');

        // Si no hay ninguna foto válida, usar placeholder
        if (!imagenSrc) {
            imagenSrc = 'placeholder.jpg';
        }

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
        personasDiv.textContent = `👥 ${receta.personas} personas`;

        infoDiv.appendChild(tituloDiv);
        infoDiv.appendChild(tiempoDiv);
        infoDiv.appendChild(personasDiv);

        card.appendChild(img);
        card.appendChild(infoDiv);

        card.onclick = () => {
            const idCodificado = encodeURIComponent(receta.id);
            window.location.href = `../TemplatePage/index.html?id=${idCodificado}`;
        };

        container.appendChild(card);
    });

    document.body.appendChild(container);
}

createTaskBar();

const params = new URLSearchParams(window.location.search);
let url;

if (params.has('id')) {
    const id = params.get('id');
    url = `/api/database?id=${encodeURIComponent(id)}`;
} else if (params.has('name')) {
    const nombre = params.get('name');
    url = `/api/database?name=${encodeURIComponent(nombre)}`;
} else if (params.has('category')) {
    const categoria = params.get('category');
    url = `/api/database?category=${encodeURIComponent(categoria)}`;
} else {
    url = "/api/database";
}

await contactDatabase(url)
    .then(data => {
        console.log("Recetas recibidas:", data);
        if (!data || data.length === 0) {
            mostrarNoRecetas();
        } else {
            renderRecetas(data);
        }
    })
    .catch(err => {
        if (err.message && err.message.includes('404')) {
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