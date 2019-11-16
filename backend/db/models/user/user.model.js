const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: false
    },
    surname: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: false
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiriesAt: {
            type: Number,
            required: true
        }
    }]
});

module.exports = {
    UserSchema,
    // validateUser
}


