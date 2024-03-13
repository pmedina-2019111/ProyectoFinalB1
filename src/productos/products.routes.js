import { Router } from "express";
import { check } from "express-validator";
import { validateJWT } from "../middlewares/validar-jwt.js";
import { isAdminRole } from "../middlewares/validar-roles.js";
import { deleteProducto, getProducts, postProduct, putProducto } from "./products.controller.js";
import { validarCampos } from "../helpers/validarCampos.js";
import { existProductById } from "../middlewares/db-valid.js";
const routerProducto = Router();

routerProducto.get(
    '/',
    getProducts
)


routerProducto.post(
    '/',
    [
        validateJWT,
        isAdminRole,
        check('nameProductos', '|-- the name products ir required --|'),
        validarCampos
    ],
    postProduct  
);


routerProducto.put(
    '/:id',
    [
        validateJWT,
        isAdminRole,
        check('id', 'id is not valid').isMongoId(),
        check('id').custom(existProductById),
        validarCampos
    ],
    putProducto
);

routerProducto.delete(
    '/:id',
    [
        validateJWT,
        isAdminRole,
        check('id', 'not valid id').isMongoId(),
        check('id').custom( existProductById ),
        validarCampos
    ],
    deleteProducto
);

export default routerProducto;