import User from '../users/users.model.js';
import Producto from '../productos/products.model.js';
import Categoria from '../categoria/category.model.js';
//import Factura from '../factura.model.js/factura.model.js';


export const existsEmail = async (email = '') => {
    const existeEmail = await User.findOne({email});
    if(existeEmail) {
        throw new Error(`|-- The email: ${email} already exists and is registered --|`);
    }
}

export const existsUserById = async (id) => {
    const existeUser = await User.findById(id);
    if(!existeUser) {
        throw new Error(`|-- The id: ${ id } does not exist --|`);
    }
}

export const existProductById = async(id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto ) {
        throw new Error(`|-- The Product with id: ${ id } does not exist --|`);
    }
}

export const existsCategoryById = async(id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria ) {
        throw new Error(`|-- The category with id: ${ id } does not exist --|`);
    }
}

/*export const existsFacturaById = async(id) => {
    const existeFactura = await Factura.findById(id);
    if ( !existeFactura ) {
        throw new Error(`|-- The Bill with id: ${ id } does not exist --|`);
    }
}*/