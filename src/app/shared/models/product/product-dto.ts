import {map, clone} from 'lodash';

export class ProductDTO {
    category: string;
    colors: [{name: string, primary: string}];
    gender: string;
    mainImage: string;
    price: number;
    salePrice: number;
    sale: boolean;
    sizes: Array<{size: number, quantity: number}>;
    slides: [{imageUrl: string}];
    title: string;
    constructor(formValue: ProductFormValue) {
        this.category = formValue.category;
        this.colors = formValue.colors;
        this.gender = formValue.gender;
        this.mainImage = formValue.mainImage;
        this.price = Number(formValue.price);
        this.sale = formValue.sale;
        this.salePrice = formValue.salePrice ? Number(formValue.salePrice) : 0;
        this.sizes = this.castSizes(formValue.sizes);
        this.slides = formValue.slides;
        this.title = formValue.title;
    }

    private castSizes(sizes): Array<{size: number, quantity: number}> {
        return map(sizes, (singleSize) => {
            const cloned = clone(singleSize);
            cloned.size = parseInt(cloned.size, 10);
            cloned.quantity = parseInt(cloned.quantity, 10);
            return cloned;
        });
    }
}


export interface ProductFormValue {
    category: string;
    colors: [{name: string, primary: string}];
    gender: string;
    mainImage: string;
    price: string;
    salePrice: string;
    sale: boolean;
    sizes: [{size: string, quantity: string}];
    slides: [{imageUrl: string}];
    title: string;
}
