import express from "express";
import {
    guardarExperiencias, paginaDetallesProductos,
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
//los 2 puntos son un comodin para no repetir las paginas
router.get("/productos/:slug", paginaDetallesProductos);


export default router;
