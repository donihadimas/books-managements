const mongoose = require('mongoose');

const { model, Schema } = mongoose;

const bookSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = model('Book', bookSchema);