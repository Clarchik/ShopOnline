import { Product } from '../../../../server/shared/interfaces/product';

export class CartProduct {
    public id: string;
    public title: string;
    public slides: any;
    public size: number;
    public price: number;
    public quantity: number;
    public mainImage: string;
    public color: string;
    constructor(
        { _id, title, price, mainImage }: Product,
        size: number = 0,
        quantity: number = 0,
        selectedColor: string = '') {
        this.id = _id;
        this.title = title;
        this.price = price;
        this.mainImage = mainImage;
        this.size = size;
        this.quantity = quantity;
        this.color = selectedColor;
    }
}
