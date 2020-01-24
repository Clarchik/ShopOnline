import { ShippingAddressI } from '../../interfaces/shipping/shipping';

export class ShippingAddress {
    private city: string;
    private address: string;
    private index: string;
    constructor({ city, address, index }: ShippingAddressI) {
        this.city = city;
        this.address = address;
        this.index = index;
    }
}
