import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User'
    },
    email: String,
    index: String,
    fio: String,
    city: String,
    products: [
        {
            title: String,
            qunatity: Number,
            price: Number,
            size: Number
        }
    ]
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
