const mongoose = require('mongoose');

const { model, Schema } = mongoose;

const MemberSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        memberStatus: {
            type: String,
            enum: ['active', 'penalized', 'banned'],
            default: 'active',
        },

        bookId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
                default: null
            }
        ],
        totalBooksBorrowed: {
            type: Number,
            default: 0
        },
        borrowDate: {
            type: Date,
            default: null
        },
        dueDate: {
            type: Date,
            default: null
        },
        returnDate: {
            type: Date,
            default: null
        },
        penaltyDueDate: {
            type: Date,
            default: null
        },
    },
    { timestamps: true }
);

module.exports = model('Member', MemberSchema);