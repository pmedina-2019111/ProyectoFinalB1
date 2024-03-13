import jwt from 'jsonwebtoken';
import User from '../users/users.model.js';
import { response, request } from 'express';

export const validateJWT = async (req = request, res= response, next) => {
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg: "There is NO TOKEN in the request"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const userino = await User.findById(uid);

        if(!userino){
            return res.status(401).json({
                msg: '| TOKEN INVALID |'
            })
        }

        if(!userino.isActive){
            return res.status(401).json({
                msg: '| USER WITH STATUS FALSE |'
            })
        }

        req.userino = userino;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "|| TOKEN is NOT VALID ||",
        });   
    }
};