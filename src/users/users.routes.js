import { Router } from "express";
import { check } from "express-validator";
const routerUSer = Router();
import { getUsers, postUser, putUser } from "./users.controller.js";
import { validarCampos } from "../helpers/validarCampos.js";
routerUSer.get("/", getUsers);

routerUSer.post(
    "/",
    [
        check("name", "| name is required |").not().isEmpty(),
        check("email", "| email is required |").isEmail(),
        check("password", "| password is required |").isLength({ min: 6 }),
        validarCampos
    ],
    postUser
);

routerUSer.put(
    '/:id',
    [
        check('id', '| id is required |').isMongoId(),
        validarCampos
    ],
    putUser
);

export default routerUSer;