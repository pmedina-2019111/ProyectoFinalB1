import { request, response } from "express";
import Product from "./products.model.js";

export const getProducts = async (req = request, res = response) => {
    const query = { estado: true };
    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
    ]);

    res.status(200).json({
        total,
        products
    });
}


export const postProduct = async (req = request, res = response) => {
    const { estado, user, ...body} = req.body;
    const productoDBB = await Product.findOne({nameProductos: body.nameProductos});

    if (productoDBB) {
        return res.status(400).json({
            msg: `|-- El producto ${productoDBB.nameProductos}, ya existe --|`
        });
    }

    // Generar la data a guardar
    const data = {...body, nameProductos: body.nameProductos.toUpperCase(), user: req.userino._id};  

    const product = new Product(data);
    await product.save();

    res.status(200).json({
        msg: '|-- Producto creado exitosamente --|',
        product
    });


}

export const putProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, user, ...restoData } = req.body;

    if ( restoData.nameProductos ) {
        restoData.nameProductos = restoData.nameProductos.toUpperCase();
        restoData.user = req.user._id;
    }
    const productoUpdate = await Product.findByIdAndUpdate(id, restoData, { new: true });

    res.status(201).json({
        msg: '|-- product updated --|',
        productoUpdate
    })
}


export const deleteProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const productDeleted = await Product.findByIdAndUpdate( id, { estado: false}, { new: true } );

   res.json({
        msg: '|-- Product Removed --|',
        productDeleted
   })
}