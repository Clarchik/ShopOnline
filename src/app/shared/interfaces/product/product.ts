import { ProductSize } from './size';

export interface Product {
    _id: string;
    title: string;
    sizes: Array<ProductSize>;
    category: string;
    gender: string;
    price: number;
    sale: boolean;
    slides: Array<{ imageUrl: string }>;
    salePrice: number;
    mainImage: string;
}

