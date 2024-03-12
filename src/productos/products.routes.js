import { Router } from "express";
import { check } from "express-validator";
import { validateJWT } from "../middlewares/validar-jwt";
import { isAdminRole } from "../middlewares/validar-roles.js";