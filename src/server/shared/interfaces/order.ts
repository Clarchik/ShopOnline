import {Product as IProduct} from './product';
import {OrderStatus} from '../../../shared/interfaces/order-status';

export interface Order {
    _id: string;
    city: string;
    address: string;
    products?: Array<IProduct>;
    fio: string;
    orderNumber: number;
    totalSum: number;
    orderStatus: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}
