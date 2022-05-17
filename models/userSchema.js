import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import cart from './cartSchema';

const userSchema = new Schema({
    avatar:{ type: String, required: true },
    email: { type: String, required: true, unique: true },
    direction: { type: String, required: true},
    user: { type: String, required: true},
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true},
    role: {type: Number, required: true},
});

userSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model('User', userSchema);