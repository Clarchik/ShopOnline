import mongoose from 'mongoose';
import {OrderStatus} from '../../../../shared/interfaces/order-status';

const OrderSchema = new mongoose.Schema({
    country: {
        required: true,
        trim: true,
        type: String
    },
    state: {
        required: false,
        trim: true,
        type: String
    },
    city: {
        required: false,
        trim: true,
        type: String
    },
    address: {
        required: true,
        trim: true,
        type: String
    },
    index: {
        required: true,
        trim: true,
        type: Number
    },
    name: {
        required: true,
        trim: true,
        type: String
    },
    surname: {
        required: true,
        trim: true,
        type: String
    },
    phone: {
        required: true,
        trim: true,
        type: Number
    },
    userId: {
        type: String,
        ref: 'User'
    },
    totalSum: {
        type: Number,
        required: true
    },
    orderNumber: Number,
    orderStatus: {
        type: String,
        default: OrderStatus[0],
        required: true,
        trim: true,
        unique: false,
    },
    products: [
        {
            title: String,
            quantity: Number,
            price: Number,
            size: Number,
            color: String,
            mainImage: String
        }
    ]
}, {
    timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
