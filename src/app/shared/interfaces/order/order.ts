import {OrderStatus} from '../../../../shared/interfaces/order-status';
import {Product as IProduct} from '../product/product';

export interface Order {
    _id: string;
    city: string;
    address: string;
    index: string;
    products?: Array<IProduct>;
    fio: string;
    orderNumber: number;
    orderStatus: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}
