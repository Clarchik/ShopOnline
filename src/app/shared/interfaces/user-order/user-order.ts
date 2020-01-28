import { Product } from '../product/product';
import { CartProduct } from '../../models/cart-product/cart-product';

export interface UserOrder {
    _id: string;
    address: string;
    city: string;
    fio: string;
    index: string;
    products: Array<CartProduct>;
}
