'use strict'

import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan'; 
import { dbConnection } from './mongo.js';
import routerUSer from "../src/users/users.routes.js";
import categoryRoutes from "../src/categoria/category.routes.js";
import loginRoutes from "../src/auth/auth.routes.js";
import productosRoutes from '../src/productos/products.routes.js'
import searchByRoutes from '../src/productos/searchBy.routes.js';
import carritoROutes from '../src/carrito/carrito.routes.js';
import factRoutes from '../src/factura/factura.routes.js';

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';
        this.categoryPath = '/api/categories';
        this.loginPath = '/api/login';
        this.productsPath = '/api/products';
        this.searchBypath = '/api/search';
        this.carritoPath = '/api/carrito';
        this.factPath = '/api/factura';
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    
    routes(){
        this.app.use(this.userPath, routerUSer);
        this.app.use(this.categoryPath, categoryRoutes);
        this.app.use(this.loginPath, loginRoutes);
        this.app.use(this.productsPath, productosRoutes);
        this.app.use(this.searchBypath, searchByRoutes);
        this.app.use(this.carritoPath, carritoROutes);
        this.app.use(this.factPath, factRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server Running on Port: ', this.port);
        });
    }
}

export default Server;