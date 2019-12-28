import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sale: {
        type: Boolean,
        required: true
    },
    sizes: {
        type: Array,
        require: true
    },
    'sale-price': {
        type: Number,
        required: true
    },
    'main-image': {
        type: String,
        required: true
    },
    'hidden-image': {
        type: String,
        required: true
    },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
