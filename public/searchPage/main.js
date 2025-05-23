import { contactDatabase, createTaskBar, createFooter, convertData } from "../functions.js";

const recetas = [
    {
        "id": 1,
        "titulo": "Tortilla de patatas",
        "tiempo_preparacion": "30 minutos",
        "personas": 4,
        "ingredientes": "[\"4 patatas medianas\",\"6 huevos\",\"Sal al gusto\",\"Aceite de oliva\"]",
        "pasos": "[\"Pelar y cortar las patatas en rodajas finas.\",\"Freírlas en abundante aceite hasta que estén tiernas.\",\"Batir los huevos y mezclarlos con las patatas.\",\"Cocinar la mezcla en una sartén hasta que cuaje por ambos lados.\"]",
        "categoria": "platos_completos",
        "fotos": "[\"/images/tortilla.jpg\"]"
    },
    {
        "id": 2,
        "titulo": "Cocido",
        "tiempo_preparacion": "30 minutos",
        "personas": 4,
        "ingredientes": "[\"100g de garbanzos\", \"200ml de agua\"]",
        "pasos": "[\"place holder\", \"place holder\"]",
        "categoria": "platos_completos",
        "fotos": "[\"/images/cocidgo.jpg\"]"
    }
];

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

async function init() {
    const rawData = await contactDatabase("/api/database?category=platos_completos");
    const data = convertData(rawData);
    createTaskBar();
    renderRecetas(data);
    createFooter();
}

//init();

console.log(contactDatabase("/api/database?category=platos_completos"))
