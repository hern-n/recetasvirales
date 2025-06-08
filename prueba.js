import { contactDatabase } from "./public/functions.js";

await contactDatabase("/api/database?random=2")
    .then(receta => {
        console.log("Receta:", receta);
    })
    .catch(err => {
        console.error("Error al cargar receta:", err);
    });