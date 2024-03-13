import { Router } from "express";
import { getProductosMasVendidos, search } from "./buscarPor.controller.js";
import { validateJWT } from "../middlewares/validar-jwt.js";
const routerSearchBy = Router();

routerSearchBy.get(
    '/:colection/:termino',
    search
)

routerSearchBy.get(
    '/productos-mas-vendidos',
    [
        validateJWT,
        // isClientRole,
        // validarCampos
    ],
    getProductosMasVendidos
)

export default routerSearchBy;