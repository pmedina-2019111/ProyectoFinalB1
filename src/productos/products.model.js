import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
    nameProductos: {
        type: String,
        required: [true , '| The name is required |'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    precioProductos: {
        type: Number,
        default: 0
    },
    stockProductos: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: { 
        type: String 
    },
    disponible: { 
        type: Boolean,
        default: true 
    },
    ventas: {
        type: Number,
        default: 0
    },
});

export default mongoose.model('Producto', ProductSchema);