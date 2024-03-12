import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
    roleUsers: {
        type: String,
        required: [true, '|| The rol is an parameter required ||'],
    }
});

export default mongoose.model('Role', RoleSchema);