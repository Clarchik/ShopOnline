import { CartProduct } from '../cart-product/cart-product';
import { ShippingAddress } from '../shipping/shipping';

export class Order {
    private shippingAddress: ShippingAddress;
    private products: CartProduct[];
    constructor(shippingAddress: ShippingAddress, products: CartProduct[]) {
        this.shippingAddress = shippingAddress;
        this.products = products;
    }
}
