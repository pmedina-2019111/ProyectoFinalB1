import { Router } from "express";
import { check } from "express-validator";
import { loginUserProgamin } from "./auth.controller.js";
import { validarCampos } from "../helpers/validarCampos.js";

const routerLogin = Router();

routerLogin.post(
    '/',
    [
        check('email', 'The email is NOT VALID').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        validarCampos,
    ], 
    loginUserProgamin
);

export default routerLogin;