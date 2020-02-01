import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { ShopState, FavoriteSelectors, FavoriteActions, CartSelectors, CartActions } from '../../store';
import { Store } from '@ngrx/store';
import { CartProduct } from '../../shared/models/cart-product/cart-product';
import { Router } from '@angular/router';

@Component({
    selector: 'app-products-preview',
    templateUrl: './products-preview.component.html',
    styleUrls: ['./products-preview.component.scss']
})
export class ProductsPreviewComponent implements OnInit {
    public favoriteProducts: CartProduct[];
    public cartProducts: CartProduct[];

    public favoritesLength$: Observable<number>;
    public cartLength$: Observable<number>;

    public emptyFavorites: boolean = true;
    public emptyCart: boolean = true;

    public cartPrice$: Observable<number>;
    constructor(
        private store: Store<ShopState>,
        private router: Router) { }

    ngOnInit() {
        this.cartPrice$ = this.store.select(CartSelectors.getCartTotalPrice);
        this.favoritesLength$ = this.store.select(FavoriteSelectors.getFavoriteItemsLength);
        this.cartLength$ = this.store.select(CartSelectors.getCartItemsLength);

        combineLatest([
            this.store.select(CartSelectors.isCartEmpty),
            this.store.select(FavoriteSelectors.isFavoritesEmpty)
        ]).subscribe(([cart, favorites]: [boolean, boolean]) => {
            this.emptyCart = cart;
            this.emptyFavorites = favorites;
        });

        combineLatest([
            this.store.select(CartSelectors.getCartItemsAsArray),
            this.store.select(FavoriteSelectors.getFavoriteItemsAsArray)
        ]).subscribe(([cartItems, favoriteItems]: [CartProduct[], CartProduct[]]) => {
            if (cartItems) {
                this.cartProducts = cartItems;
            }
            if (favoriteItems) {
                this.favoriteProducts = favoriteItems;
            }
        });


    }

    public remoteFromFavorite(product: CartProduct) {
        this.store.dispatch(new FavoriteActions.RemoveProduct(product));
    }

    public removeFromCart(product: CartProduct) {
        this.store.dispatch(new CartActions.RemoveProduct(product));
    }

    public makeOrder() {
        this.router.navigateByUrl('make-order');
    }

}
