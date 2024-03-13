import { request, response } from "express";
import role from "../users/users.model.js";

export const isAdminRole = (req = request, res = response, next) => {
    if(!req.userino) {
        return res.status(500).json({
            msg: '|| you need token to be validate ||'
        });
    }

    const {role, name} = req.userino;

    if(role !== 'ADMIN_ROL'){
        return res.status(500).json({
            msg: `|| ${name} YOU DONT HAVE ACCES TO THIS BECAUSE YOU ARE NOT ADMINISTRATOR ||`
        });
    }

    next();
}

export const isClientRole = (req = request, res = response, next) => {
    if(!req.userino) {
        return res.status(500).json({
            msg: 'It is required to verify the ROLE without validating the TOKEN first'
        });
    }

    const {role, name} = req.userino;

    if(role !== 'CLIENT_ROL'){
        return res.status(500).json({
            msg: `|-- ${name} YOU DONT HAVE ACCES TO THIS BECAUSE YOU ARE NOT A CLIENT --|`
        });
    }

    next();
}