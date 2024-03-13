import { request, response } from "express";
import { Types } from "mongoose";
import Product from './products.model.js';
import Category from '../categoria/category.model.js';

export const colectionsPerm = [
    'users', 'categories', 'products', 'roles'
];

export const searchProduct = async(termino='', res) => {
    const isID = Types.ObjectId.isValid(termino);

    if(isID){
        const product = await Product.findById(termino);
        return res.json({
            results: (product) ? (product) : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const products = await Product.find({
        $or: [{nameProductos: regex}],
        $and: [{estado:true}]
    });

    res.json({
        msg: "|-- Product find --|",
        results: products
    });
}

export const searchForCategory = async (termino='', res) => {
    const query = {nameCategory: termino.toUpperCase()};
    const categoryFound = await Category.findOne(query);
    const product = await Product.find({category: categoryFound.id});

    return res.json({
        msg: "|-- Category find --|",
        product
    })
}

export const getProductosMasVendidos = async (req, res) => {
    try {

        const productosMasVendidos = await Product.find({})
            .sort({ ventas: -1 })
            .limit(10); 
        
        res.status(200).json({ productosMasVendidos });
    } catch (error) {
        console.error('Error fetching top selling products:', error);
        res.status(500).json({ error: 'Error fetching top selling products' });
    }
}


export const search = (req, res = response) => {
    const {colection, termino} = req.params;

    if(!colectionsPerm.includes(colection)){
        return res.status(400).json({
            msg: `|-- The Colection: ${colection} not exits in the database system
            the conections avaible ${colectionsPerm} --|`
        });
    }

    switch (colection){
        case 'users':
        break;

        case 'categories':
            searchForCategory(termino, res)
        break;
        case 'products':
            searchProduct(termino, res)
        break;
        default:
            res.status(500).json({
                msg: 'Forgot to do this search'
            });
    }
}