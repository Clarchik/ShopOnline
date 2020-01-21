import { Product } from '../../interfaces/product/product';

export class CartProduct {
    public id: string;
    public title: string;
    public slides: any;
    public size: number;
    public price: number;
    public qunatity: number;
    constructor(
        { _id, title, price, slides }: Product,
        size: number = 0,
        quantity: number = 0) {
        this.id = _id;
        this.title = title;
        this.price = price;
        this.slides = slides;
        this.size = size;
        this.qunatity = quantity;
    }
}
