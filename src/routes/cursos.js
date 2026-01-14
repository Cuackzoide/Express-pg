const express = require("express");
const router = express.Router();

// Importar controladores de sus archivos respectivos
const { getCursos } = require("../controllers/cursosController");
const {
    getCursosProgramacion,
    getCursosProgramacionLenguaje,
    postCursoProgramacion,
    putCursoProgramacion,
    patchCursoProgramacion,
    deleteCursoProgramacion
} = require("../controllers/programacionController");
const {
    getCursosMatematicas,
    getCursosMatematicasLenguaje,
    postCursoMatematicas,
    putCursoMatematicas,
    patchCursoMatematicas,
    deleteCursoMatematicas
} = require("../controllers/matematicasController");

// --- Rutas Generales ---
router.get("/", getCursos);

// --- Rutas Programación ---
router.get("/programacion", getCursosProgramacion);
router.get("/programacion/:lenguaje", getCursosProgramacionLenguaje);
router.post("/programacion", postCursoProgramacion);
router.put("/programacion/:id", putCursoProgramacion);
router.patch("/programacion/:id", patchCursoProgramacion);
router.delete("/programacion/:id", deleteCursoProgramacion);

// --- Rutas Matemáticas ---
router.get("/matematicas", getCursosMatematicas);
router.get("/matematicas/:lenguaje", getCursosMatematicasLenguaje);
router.post("/matematicas", postCursoMatematicas);
router.put("/matematicas/:id", putCursoMatematicas);
router.patch("/matematicas/:id", patchCursoMatematicas);
router.delete("/matematicas/:id", deleteCursoMatematicas);

module.exports = router;
