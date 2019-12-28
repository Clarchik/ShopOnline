import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product/product';
import { ActivatedRoute } from '@angular/router';
import { tap, switchMap, map } from 'rxjs/operators';
import { ProductsService } from '../services/products/products.service';

@Component({
    selector: 'app-product-item-details',
    templateUrl: './product-item-details.component.html',
    styleUrls: ['./product-item-details.component.scss']
})
export class ProductItemDetailsComponent implements OnInit {
    private _product: Product;
    public sizeChoice: number;
    public productQuantity: number = 1;
    public productMaxPosibleQuantity: number = 1;
    public productViewImage: string;
    constructor(
        private route: ActivatedRoute,
        private ps: ProductsService) { }

    ngOnInit() {
        this.route.params.pipe(
            map((params) => params.id),
            switchMap((id) => this.ps.getSingleProduct(id))
        ).subscribe((product: Product) => {
            this._product = product;
            this.productViewImage = this._product.slides[0].imageUrl;
        });
    }

    public sizeChanged(size: number) {
        this.productQuantity = 1;
        const choosenSizeQunatity = this._product.sizes.find((item) => item.size === size).quantity;
        this.productMaxPosibleQuantity = choosenSizeQunatity;
    }

    public changeProductView(url: string) {
        this.productViewImage = url;
    }

    public increaseQuantity() {
        this.productQuantity++;
    }

    public decreaseQuantity() {
        this.productQuantity--;
    }

    get product(): Product {
        return this._product;
    }
}
