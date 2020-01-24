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
    products: [
        {
            title: String,
            qunatity: Number,
            price: Number,
            size: Number,
            slides: [
                { imageUrl: String }
            ]
        }
    ]
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
