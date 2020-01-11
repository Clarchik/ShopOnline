import { Component, Input } from '@angular/core';
import { Product } from '../../shared/interfaces/product/product';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
    @Input() product: Product;
    constructor() { }

    getUrl() {
        return `url(${this.product.mainImage})`;
    }

}
