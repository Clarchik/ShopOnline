import { Component, OnInit, Input } from '@angular/core';
import { CartProduct } from '../../shared/models/cart-product/cart-product';
import { ShopState, CartSelectors, CartActions, FavoriteActions, FavoriteSelectors } from '../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-preview',
    templateUrl: './product-preview.component.html',
    styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnInit {
    @Input() isCart: boolean = false;
    @Input() isFavorite: boolean = false;

    public cartProducts: CartProduct[];
    public favoriteProducts: CartProduct[];
    public cartPrice$: Observable<number>;

    constructor(
        private router: Router,
        private store: Store<ShopState>) { }

    ngOnInit() {
        this.store.select(CartSelectors.getCartItemsAsArray).subscribe((items: CartProduct[]) => {
            if (items) {
                this.cartProducts = items;
            }
        });

        this.store.select(FavoriteSelectors.getFavoriteItemsAsArray).subscribe((items: CartProduct[]) => {
            this.favoriteProducts = items;
        });

        this.cartPrice$ = this.store.select(CartSelectors.getCartTotalPrice);

    }

    public makeOrder() {
        this.router.navigateByUrl('make-order');
    }

    public removeFromCart(product: CartProduct) {
        this.store.dispatch(new CartActions.RemoveProduct(product));
    }

    public remoteFromFavorite(product: CartProduct) {
        this.store.dispatch(new FavoriteActions.RemoveProduct(product));
    }

}
