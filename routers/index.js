import express from "express";
import {
    guardarExperiencias,
    paginaEncuentros, paginaExperiencias,
    paginaInicio, paginaProductos, quienesSomos

} from "../controllers/controlador.js";

// Creo los endpoints del get en la web
const router = express.Router();

router.get("/", paginaInicio);
router.get("/encuentros", paginaEncuentros);
router.get("/experiencias", paginaExperiencias);
router.post("/experiencias", guardarExperiencias);
router.get("/productos", paginaProductos);
router.get("/quienesSomos", quienesSomos);

export default router;
