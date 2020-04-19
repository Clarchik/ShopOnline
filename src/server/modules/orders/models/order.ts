import mongoose from 'mongoose';
import {OrderStatus} from '../../../../shared/interfaces/order-status';

const OrderSchema = new mongoose.Schema({
    city: String,
    address: String,
    index: String,
    userId: {
        type: String,
        ref: 'User'
    },
    fio: String,
    orderNumber: Number,
    orderStatus: {
        type: String,
        default: OrderStatus[0],
        required: true,
        trim: true,
        unique: false,
    },
    color: String,
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
