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
    gender: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    colors: [
        {
            name: String,
            primary: String
        }
    ],
    sale: {
        type: Boolean,
        required: true
    },
    slides: [
        {imageUrl: String}
    ],
    sizes: {
        type: Array,
        require: true
    },
    salePrice: {
        type: Number,
        required: false,
        default: 0
    },
    mainImage: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
