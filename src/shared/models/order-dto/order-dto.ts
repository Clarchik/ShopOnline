import {CartProduct} from '../../../app/shared/models/cart-product/cart-product';

export class OrderDTO {
    email: string;
    country: string;
    state: string;
    city: string;
    address: string;
    index: string;
    name: string;
    surname: string;
    products: CartProduct[];
    constructor(formValue: OrderFormValue, _products: CartProduct[]) {
        this.email = formValue.email;
        this.country = formValue.country;
        this.state = formValue.state;
        this.address = formValue.address;
        this.index = formValue.index;
        this.name = formValue.name;
        this.surname = formValue.surname;
        this.products = _products;
    }
}

export interface OrderFormValue {
    email: string;
    name: string;
    surname: string;
    country: string;
    state: string;
    city: string;
    address: string;
    index: string;
}
