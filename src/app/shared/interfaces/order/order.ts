import {OrderStatus} from './order-status';
import {Product as IProduct} from '../product/product';

export interface Order {
    _id: string;
    city: string;
    address: string;
    products?: Array<IProduct>;
    fio: string;
    orderNumber: number;
    orderStatus: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}
