import {OrderStatus} from '../../../../shared/interfaces/order-status';
import {Product as IProduct} from '../product/product';

export interface Order {
    _id: string;
    country: string;
    state: string;
    city: string;
    address: string;
    index: number;
    phone: number;
    products?: Array<IProduct>;
    name: string;
    surname: string;
    orderNumber: number;
    orderStatus: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}
