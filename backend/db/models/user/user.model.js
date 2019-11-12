const mongoose = require('mongoose');
// const joi = require('joi');

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

// const validateUser = (user) => {
//     const schema = {
//         email: joi.string().min(1).trim().required,
//         password: joi.string().min(8).trim().required
//     }
//     return joi.validate(user, schema);
// }

module.exports = {
    UserSchema,
    // validateUser
}


