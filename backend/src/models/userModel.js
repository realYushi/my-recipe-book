const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');



const userSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4(), unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});
userSchema.pre('save', function (next) {
    if (!this.id) {
        this.id = uuidv4();
    }
    next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
