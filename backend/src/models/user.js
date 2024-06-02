"use strict";
const mongoosee = require('mongoose');
const UserSchema = new mongoosee.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
module.exports = mongoosee.model('User', UserSchema);
