import { request, response } from "express";
import Category from "./category.model.js";
import User from "../users/users.model.js";

export const getCategories = async (req = request, res = response) => {
    const query = { estado: true };
    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
    ]);

    res.status(200).json({
        total,
        categories
    });
};


export const postCategory = async (req = request, res = response) => {
    const { nameCategory } = req.body;
  
    // Verificar si 'nameCategory' está presente y no está vacío
    if (!nameCategory || nameCategory.trim() === '') {
      return res.status(400).json({ error: 'The nameCategory field is required and cannot be empty' });
    }
  
    const name = nameCategory.toUpperCase(); // Convertir a mayúsculas
  
    // Verificar si la categoría ya existe
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ msg: `|-- The Category ${existingCategory.nameCategory}, exists in database --|` });
    }
  
    // Verificar si 'user' está presente en req.userino y tiene un valor
    if (!req.userino || !req.userino._id) {
      return res.status(400).json({ error: 'The user field is required' });
    }
  
    const data = {nameCategory: name, user: req.userino._id};
  
    const category = new Category(data);
  
    try {
      await category.save();
      res.status(200).json({ msg: '|-- Category created successfully --|', category });
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'An error occurred while creating the category' });
    }
  }



export const putCategory = async (req = request, res = response) => {
    const { id } = req.params;
    const { estadoCategory, user, ...resto } = req.body;

    resto.nameCategory = resto.nameCategory.toUpperCase();
    resto.user = req.userino._id;

    const categoryUpdate = await Category.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        msg: '|-- Category updated --|',
        categoryUpdate
    });
}

export const deleteCategory = async (req = request, res = response) => {
    const { id } = req.params;
    const categoryDelete = await Category.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.status(200).json({
        msg: '|-- Category deleted --|',
        categoryDelete
    });
}


export const getCategoryById = async (req = request, res = response) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'nameCategory');

    res.status(200).json({
        msg: '|-- Category specify --|',
        category
    });
}