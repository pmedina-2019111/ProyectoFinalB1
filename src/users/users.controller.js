import { response, request } from 'express';
import bcryptjs from 'bcryptjs'; 
import User from './users.model.js';

export const getUsers = async (req = request, res = response) => {
    const query = { isActive: true };

    const userList = await Promise.all([
        User.countDocuments(query),
        User.find(query)
    ]);

    res.status(200).json({
        msg: '|-- list of users --|',
        userList
    });
}

export const postUser = async (req = request, res = response) => {
    const {name, email, password, role} = req.body;
    const userNew = new User({name, email, password, role});

    const salt = bcryptjs.genSaltSync();
    userNew.password = bcryptjs.hashSync(password, salt);

    await userNew.save();

    res.status(200).json({
        msg: '|-- users add --|',
        userNew
    });
}

export const putUser = async (req = request, res = response) => {
    const { id } = req.params;
    const { password, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const userUpdate = await User.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        msg: '|-- User updated --|',
        userUpdate
    });
}

export const deleteUser = async (req = request, res = response) => {
    const { id } = req.params;
    const userDelete = await User.findByIdAndUpdate(id, {isActive: false});

    res.status(200).json({
        msg: '|-- user deleted --|',
        userDelete
    });
}

