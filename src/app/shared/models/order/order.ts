import { CartProduct } from '../cart-product/cart-product';

export class Order {
    public email: string;
    public index: string;
    public city: string;
    public fio: string;
    public products: any;
    public userId: any;
    constructor(
        { email, city, fio, index }: OrderI,
        products: CartProduct[],
        userId: string) {
        this.email = email;
        this.city = city;
        this.fio = fio;
        this.index = index;
        this.products = products;
        this.userId = userId;
    }
}


export interface OrderI {
    email: string;
    city: string;
    fio: string;
    index: string;
}
