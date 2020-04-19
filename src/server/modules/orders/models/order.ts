import mongoose from 'mongoose';

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
    orderStatus: String,
    products: [
        {
            title: String,
            quantity: Number,
            price: Number,
            size: Number,
            mainImage: String
        }
    ]
}, {
    timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
