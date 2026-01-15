// Importamos el "pool" de conexiones que configuramos en db.js
// Esto nos permite "hablar" con la base de datos PostgreSQL.
const pool = require("../config/db.js");

// Definimos la función como 'async' (asíncrona) porque las consultas a base de datos toman tiempo
// y no queremos bloquear el resto del servidor mientras esperamos la respuesta.
const getCursosProgramacion = async (req, res) => {
    try {
        // Ejecutamos una consulta SQL (query) usando 'await' (esperar).
        // Le pedimos a la base de datos: "Selecciona todo (*) de la tabla 'cursos' donde la categoría sea 'programacion'".
        const respuesta = await pool.query("SELECT * FROM cursos WHERE categoria = 'programacion'");

        // La base de datos nos devuelve un objeto gigante, pero los datos reales están en la propiedad .rows (filas).
        // Enviamos esas filas al cliente (navegador/postman) en formato JSON.
        res.json(respuesta.rows);
    } catch (error) {
        // Si algo falla (ej: base de datos caída), capturamos el error aquí.
        console.error(error);
        res.status(500).send("Error al obtener los cursos");
    }
};

const getCursosProgramacionLenguaje = async (req, res) => {
    // Obtenemos el parámetro de la URL (ej: /programacion/python -> lenguaje = "python")
    const lenguaje = req.params.lenguaje;

    try {
        // CONSULTAS PARAMETRIZADAS (Seguridad):
        // En lugar de pegar el texto directamente ("... lenguaje = '" + lenguaje + "'"), usamos $1.
        // El driver 'pg' sustituye $1 por el primer valor del array que pasamos como segundo argumento.
        // Esto evita ataques de Hackers llamados "Inyección SQL".
        // Usamos ILIKE (Insensitive LIKE) para que no importen las mayúsculas/minúsculas
        // Asi 'python' encuentra 'Python', 'PYTHON', etc.
        const respuesta = await pool.query(
            "SELECT * FROM cursos WHERE categoria = 'programacion' AND lenguaje ILIKE $1",
            [lenguaje]
        );

        // Verificamos si la base de datos encontró alguna fila.
        if (respuesta.rows.length > 0) {
            res.json(respuesta.rows);
        } else {
            res.status(404).send("No se encontraron cursos de ese lenguaje");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
};

const postCursoProgramacion = async (req, res) => {
    // Obtenemos los datos que el usuario envió en el cuerpo (body) de la petición.
    // Usamos desestructuración para sacar las variables individuales.
    const { titulo, lenguaje, vistas, nivel } = req.body;

    try {
        // INSERTAMOS un nuevo registro.
        // RETURNING *: Sirve para que PostgreSQL nos devuelva el dato recién creado (incluyendo el ID automático).
        const respuesta = await pool.query(
            "INSERT INTO cursos (titulo, lenguaje, vistas, nivel, categoria) VALUES ($1, $2, $3, $4, 'programacion') RETURNING *",
            [titulo, lenguaje, vistas, nivel]
        );

        // Devolvemos el curso creado (que está en la posición 0 del array rows).
        res.json(respuesta.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al crear el curso");
    }
};

const putCursoProgramacion = async (req, res) => {
    const id = req.params.id;
    const { titulo, lenguaje, vistas, nivel } = req.body;

    try {
        // ACTUALIZAMOS todos los campos del curso con ese ID.
        const respuesta = await pool.query(
            "UPDATE cursos SET titulo = $1, lenguaje = $2, vistas = $3, nivel = $4 WHERE id = $5 AND categoria = 'programacion' RETURNING *",
            [titulo, lenguaje, vistas, nivel, id]
        );

        // rowCount nos dice cuántas filas fueron afectadas. Si es 0, es que el ID no existía.
        if (respuesta.rowCount > 0) {
            res.json(respuesta.rows[0]);
        } else {
            res.status(404).send("Curso no encontrado para actualizar");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar el curso");
    }
};

const patchCursoProgramacion = async (req, res) => {
    // PATCH es más complejo en SQL puro porque solo queremos actualizar ALGUNOS campos.
    // Para simplificar en este nivel, haremos lo mismo que PUT pero asumiendo que el cliente envía lo que quiere cambiar.
    // (Nota: En un entorno pro, haríamos una query dinámica construyendo el string SQL según qué campos vengan).

    // Por simplicidad educativa, reutilizaremos la lógica de actualización completa,
    // asumiendo que el frontend envía los datos necesarios.
    // Una implementación real de PATCH requeriría construir la query dinámicamente: "UPDATE cursos SET " + ...
    const id = req.params.id;
    const { titulo, lenguaje, vistas, nivel } = req.body;

    // A modo de ejercicio, intentaremos una actualización segura verificando nulos con COALESCE en SQL
    // COALESCE(val1, val2) usa val1, pero si es null, usa val2 (el valor original de la columna).
    try {
        const respuesta = await pool.query(
            `UPDATE cursos SET 
                titulo = COALESCE($1, titulo), 
                lenguaje = COALESCE($2, lenguaje), 
                vistas = COALESCE($3, vistas), 
                nivel = COALESCE($4, nivel) 
            WHERE id = $5 AND categoria = 'programacion' RETURNING *`,
            [titulo, lenguaje, vistas, nivel, id]
        );

        if (respuesta.rowCount > 0) {
            res.json(respuesta.rows[0]);
        } else {
            res.status(404).send("Curso no encontrado para parchear");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al ejecutar PATCH");
    }
};

const deleteCursoProgramacion = async (req, res) => {
    const id = req.params.id;

    try {
        const respuesta = await pool.query(
            "DELETE FROM cursos WHERE id = $1 AND categoria = 'programacion' RETURNING *",
            [id]
        );

        if (respuesta.rowCount > 0) {
            // Devolvemos el objeto eliminado para confirmar qué se borró
            res.json(respuesta.rows[0]);
        } else {
            res.status(404).send("Curso no encontrado para eliminar");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar");
    }
};

module.exports = {
    getCursosProgramacion,
    getCursosProgramacionLenguaje,
    postCursoProgramacion,
    putCursoProgramacion,
    patchCursoProgramacion,
    deleteCursoProgramacion
};
