const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
        }, 
        email: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        payed: {
            type: Boolean,
            required: true,
            default: false
        },
        article: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        manager: {
            type: String,
            required: true,
            default: "null",
        },
        track: {
            type: String,
            required: true,
            default: "null",
        },
        delivered: {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    {
        timestamps: true
    }
);


const OrderSchema = mongoose.model("order", orderSchema);

module.exports = OrderSchema;