import { Router } from "express";
import { check } from "express-validator";
const routerCategory = Router();
import { deleteCategory, getCategories, postCategory, putCategory } from "./category.controller.js";
import { validarCampos } from "../helpers/validarCampos.js";
import { validateJWT } from "../middlewares/validar-jwt.js";
import { isAdminRole } from "../middlewares/validar-roles.js";

routerCategory.get("/", getCategories);

routerCategory.post(
    "/",
    [
        validateJWT,
        isAdminRole,
        //check("nameCategory", "| nameCategory is required |").not().isEmpty(),
       // check("user", "| user is required |").isMongoId(),
        validarCampos
    ],
    postCategory
);

routerCategory.put(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "| id is required |").isMongoId(),
        validarCampos
    ],
    putCategory
);

routerCategory.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "| id is required |").isMongoId(),
        validarCampos
    ],
    deleteCategory
);

export default routerCategory;