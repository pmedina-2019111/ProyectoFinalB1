import mongoose, {Schema} from "mongoose";
import User from "../users/users.model.js";


const CategorySchema = mongoose.Schema({
    nameCategory: {
        type: String,
        required: [true, '| The nameCategory is required |'],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

export default mongoose.model('Category', CategorySchema);