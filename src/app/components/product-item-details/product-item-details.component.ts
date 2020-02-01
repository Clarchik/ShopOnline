import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/product/product';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { ProductsService } from '../../services/products/products.service';
import { Store } from '@ngrx/store';

import { CartActions, ShopState } from '../../store';
import { CartProduct } from '../../shared/models/cart-product/cart-product';
import { Observable } from 'rxjs';

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
        private ps: ProductsService,
        private store: Store<ShopState>) { }

    ngOnInit() {
        this.route.params.pipe(
            map((params) => params.id),
            switchMap((id) => this.ps.getSingleProduct(id))
        ).subscribe((product: Product) => {
            this._product = product;
            this.productViewImage = this._product.slides[0].imageUrl;
        });
    }

    public addToBag(product, size, quantity) {
        const productToAdd = new CartProduct(product, size, quantity);
        this.store.dispatch(new CartActions.AddProduct(productToAdd));
    }

    public sizeChanged(size: number) {
        this.productQuantity = 1;
        const choosenSizeQuantity = this._product.sizes.find((item) => item.size === size).quantity;
        this.productMaxPosibleQuantity = choosenSizeQuantity;
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
