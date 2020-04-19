import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../server/shared/interfaces/product';
import { FavoriteActions, FavoriteSelectors, ShopState } from '../../store';
import { Store } from '@ngrx/store';
import { CartProduct } from '../../shared/models/cart-product/cart-product';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
    @Input() product: Product;
    public frozenWrapper: boolean;
    public isFavorite: boolean;
    constructor(private store: Store<ShopState>) { }

    ngOnInit() {
        this.store.select(FavoriteSelectors.isAlreadyFavorite(this.product._id)).subscribe((isFavorite: boolean) => {
            this.isFavorite = isFavorite;
        });
    }

    getUrl() {
        return `url(${this.product.mainImage})`;
    }

    toggleFavorite(product: Product) {
        const favoriteProduct = new CartProduct(product);
        if (this.isFavorite) {
            this.store.dispatch(new FavoriteActions.RemoveProduct(favoriteProduct));
        } else {
            this.store.dispatch(new FavoriteActions.AddProduct(favoriteProduct));
        }
    }

    public freezeWrapper() {
        this.frozenWrapper = true;
    }

    public unfreezeWrapper() {
        this.frozenWrapper = false;
    }

}
