
import User from '../users/users.model.js';
import { generateJWT } from '../middlewares/generar-jwt.js';
import bcryptjs from 'bcryptjs';

export const loginUserProgamin = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const usuario = await User.findOne({ email });
        if ( !usuario ) {
            return res.status(400).json({
                msg: '|-- THE EMAIL DOES NOT EXISTS --|'
            });
        }

        if ( !usuario.isActive ) {
            return res.status(400).json({
                msg: '|-- THE USER IS NOT ACTIVE --|'
            });
        }
        
        const validarPassword = bcryptjs.compare( password, usuario.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                msg: '|-- THE PASSWORD IS INCORRECT --|'
            });
        }

        const token = await generateJWT( usuario.id, usuario.name, usuario.cart );
        
        res.json({
            msg: '|-- LOGIN SUCCESSFUL --|',
            email, 
            password,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '|-- Contact administrator --|'
        });
    }



}