// Importación del conector a la BDD
const pool = require("../config/db.js");

const getCursosMatematicas = async (req, res) => {
    try {
        // Filtramos por categoria 'matematicas'
        const respuesta = await pool.query("SELECT * FROM cursos WHERE categoria = 'matematicas'");
        res.json(respuesta.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno");
    }
};

const getCursosMatematicasLenguaje = async (req, res) => {
    const lenguaje = req.params.lenguaje;
    try {
        // Consulta segura con parámetro $1
        const respuesta = await pool.query(
            "SELECT * FROM cursos WHERE categoria = 'matematicas' AND lenguaje = $1",
            [lenguaje]
        );

        if (respuesta.rows.length > 0) {
            res.json(respuesta.rows);
        } else {
            res.status(404).send("No encontrado");
        }
    } catch (error) {
        res.status(500).send("Error interno");
    }
};

const postCursoMatematicas = async (req, res) => {
    const { titulo, lenguaje, vistas, nivel } = req.body;
    try {
        // Insertamos hardcodeando la categoría 'matematicas'
        const respuesta = await pool.query(
            "INSERT INTO cursos (titulo, lenguaje, vistas, nivel, categoria) VALUES ($1, $2, $3, $4, 'matematicas') RETURNING *",
            [titulo, lenguaje, vistas, nivel]
        );
        res.json(respuesta.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al crear curso");
    }
};

const putCursoMatematicas = async (req, res) => {
    const id = req.params.id;
    const { titulo, lenguaje, vistas, nivel } = req.body;
    try {
        const respuesta = await pool.query(
            "UPDATE cursos SET titulo = $1, lenguaje = $2, vistas = $3, nivel = $4 WHERE id = $5 AND categoria = 'matematicas' RETURNING *",
            [titulo, lenguaje, vistas, nivel, id]
        );
        if (respuesta.rowCount > 0) res.json(respuesta.rows[0]);
        else res.status(404).send("No encontrado");
    } catch (error) {
        res.status(500).send("Error al actualizar");
    }
};

const patchCursoMatematicas = async (req, res) => {
    const id = req.params.id;
    const { titulo, lenguaje, vistas, nivel } = req.body;
    try {
        // Uso de COALESCE para mantener el valor previo si el nuevo es null/undefined
        const respuesta = await pool.query(
            `UPDATE cursos SET 
                titulo = COALESCE($1, titulo), 
                lenguaje = COALESCE($2, lenguaje), 
                vistas = COALESCE($3, vistas), 
                nivel = COALESCE($4, nivel) 
            WHERE id = $5 AND categoria = 'matematicas' RETURNING *`,
            [titulo, lenguaje, vistas, nivel, id]
        );
        if (respuesta.rowCount > 0) res.json(respuesta.rows[0]);
        else res.status(404).send("No encontrado");
    } catch (error) {
        res.status(500).send("Error al parchear");
    }
};

const deleteCursoMatematicas = async (req, res) => {
    const id = req.params.id;
    try {
        const respuesta = await pool.query(
            "DELETE FROM cursos WHERE id = $1 AND categoria = 'matematicas' RETURNING *",
            [id]
        );
        if (respuesta.rowCount > 0) res.json(respuesta.rows[0]);
        else res.status(404).send("No encontrado");
    } catch (error) {
        res.status(500).send("Error al eliminar");
    }
};

module.exports = {
    getCursosMatematicas,
    getCursosMatematicasLenguaje,
    postCursoMatematicas,
    putCursoMatematicas,
    patchCursoMatematicas,
    deleteCursoMatematicas
};
