import { contactDatabase, createTaskBar, createFooter } from "../functions.js";

function renderRecetas(data) {
    const container = document.createElement('div');
    container.className = "recetas-grid";

    data.forEach(receta => {
        const card = document.createElement('div');
        card.className = 'receta-card';

        // Obtener la imagen
        const imagenSrc = JSON.parse(receta.fotos)[0] || 'placeholder.jpg';
        const img = document.createElement('img');
        img.src = imagenSrc;
        img.alt = receta.titulo;

        // Crear el contenedor de info
        const infoDiv = document.createElement('div');
        infoDiv.className = 'receta-info';

        // Título
        const tituloDiv = document.createElement('div');
        tituloDiv.className = 'receta-titulo';
        tituloDiv.textContent = receta.titulo;

        // Tiempo
        const tiempoDiv = document.createElement('div');
        tiempoDiv.className = 'receta-tiempo';
        tiempoDiv.textContent = `🕒 ${receta.tiempo_preparacion}`;

        // Personas
        const personasDiv = document.createElement('div');
        personasDiv.className = 'receta-personas';
        personasDiv.textContent = `👥 ${receta.personas} personas`;

        // Añadir elementos al infoDiv
        infoDiv.appendChild(tituloDiv);
        infoDiv.appendChild(tiempoDiv);
        infoDiv.appendChild(personasDiv);

        // Añadir imagen e infoDiv a la card
        card.appendChild(img);
        card.appendChild(infoDiv);

        // Evento click para redirigir con el id
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