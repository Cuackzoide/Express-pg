const pool = require("../config/db.js");

const getCursos = async (req, res) => {
    try {
        // Seleccionamos absolutamente todo de la tabla cursos
        const respuesta = await pool.query("SELECT * FROM cursos");

        // Creamos un objeto para estructurarlo como lo tenías antes (separado por categorías)
        // aunque comúnmente en REST se devuelve una lista plana.
        // Simularemos la estructura anterior:
        const cursos = {
            programacion: respuesta.rows.filter(c => c.categoria === 'programacion'),
            matematicas: respuesta.rows.filter(c => c.categoria === 'matematicas')
        };

        res.json(cursos);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
};

module.exports = {
    getCursos
};