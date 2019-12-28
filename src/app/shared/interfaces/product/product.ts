import { ProductSize } from './size';

export interface Product {
    _id: string;
    title: string;
    sizes: Array<ProductSize>;
    category: string;
    price: number;
    sale: boolean;
    slides: Array<{ imageUrl: string }>;
    'sale-price': number;
    'main-image': string;
    'hidden-image': string;
}

