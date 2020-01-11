import { Product } from '../../interfaces/product/product';

export class CartProduct {
    public id: string;
    public title: string;
    public mainImage: any;
    public size: number;
    public price: number;
    public qunatity: number;
    constructor(
        { _id, title, price, mainImage }: Product,
        size: number,
        quantity: number) {
        this.id = _id;
        this.title = title;
        this.price = price;
        // this._mainImage = mainImage;
        this.size = size;
        this.qunatity = quantity;
    }
}
