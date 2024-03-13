import { Router } from "express";
import { check } from "express-validator";
import { validateJWT } from "../middlewares/validar-jwt.js";
import { deleteCart, getCart, postCart, putCart } from "./carrito.controller.js";
import { validarCampos } from "../helpers/validarCampos.js";
import { isClientRole } from "../middlewares/validar-roles.js";
const routerCarrito = Router();

routerCarrito.get(
    '/',
    [
        validateJWT,
        isClientRole
    ],
    getCart
);

routerCarrito.post(
    '/:itemId',
    [
        validateJWT,
        isClientRole,
        check('itemId', '|-- id is required --|').isMongoId(),
        validarCampos
    ],
    postCart
);

routerCarrito.put(
    '/:itemId',
    [
        validateJWT,
        isClientRole,
        check('itemId', '|-- id is required --|').isMongoId(),
        validarCampos
    ],
    putCart
);

routerCarrito.delete(
    '/:itemId',
    [
        validateJWT,
        isClientRole,
        check('itemId', '|-- id is required --|').isMongoId(),
        validarCampos
    ],
    deleteCart
);

export default routerCarrito;