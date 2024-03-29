import mongoose, { Schema } from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, '||The name|| is required']
    },
    email: {
        type: String,
        required: [true, '||The email|| is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, '||The password|| is required']
    },
    role: {
        type: String, 
        default: 'CLIENT_ROL'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    cart: [{
        type: Array,
        default: []
    }]
});

UserSchema.methods.toJSON = function(){
    const { __v, _id, ...usera} = this.toObject();
    usera.uid = _id;
    return usera;
}

export default mongoose.model('User', UserSchema);
