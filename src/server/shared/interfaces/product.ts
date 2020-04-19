import { ProductSize } from '../../../shared/interfaces/size';
import {ProductColor} from '../../../shared/interfaces/color';

export interface Product {
    _id: string;
    title: string;
    sizes: Array<ProductSize>;
    colors: Array<ProductColor>;
    category: string;
    gender: string;
    price: number;
    quantity: number;
    sale: boolean;
    slides: Array<{ imageUrl: string }>;
    salePrice: number;
    mainImage: string;
}

