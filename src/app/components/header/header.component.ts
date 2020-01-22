import { Component, ViewEncapsulation, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ResizeService } from '../../shared/services/resize/resize.service';
import { SCREEN_SIZE } from '../../shared/models/screen-size/screen-size';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { PreferencesModalComponent } from '../main-page/preferences-modal/preferences-modal.component';
import { Store } from '@ngrx/store';

import { ShopState, FavoriteSelectors, CartActions, CartSelectors, UserSelectors } from '../../store';
import { Observable, of, combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { CartProduct } from '../../shared/models/cart-product/cart-product';
import { transition, trigger, useAnimation } from '@angular/animations';
import { pulse, flash, swing, tada, bounceIn, zoomOutRight } from 'ng-animate';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('pulse', [
            transition('void => *', useAnimation(bounceIn))
        ])
    ]
})
export class HeaderComponent implements AfterViewInit, AfterViewChecked {
    public screenSize: SCREEN_SIZE;
    public modalRef: MDBModalRef;
    public isLogged: boolean;
    public cartLength$: Observable<number>;
    public favoritesLength$: Observable<number>;
    public cartProducts: CartProduct[] = [];
    public cartPrice$: Observable<number>;
    public emptyFavorites: boolean = true;
    public emptyCart: boolean = true;
    public showMenu = false;
    constructor(
        private cd: ChangeDetectorRef,
        private router: Router,
        public resizeService: ResizeService,
        private modalService: MDBModalService,
        private store: Store<ShopState>) {
        this.cartLength$ = this.store.select(CartSelectors.getCartItemsLength);
        this.cartPrice$ = this.store.select(CartSelectors.getCartTotalPrice);
        this.favoritesLength$ = this.store.select(FavoriteSelectors.getFavoriteItemsLength);
    }

    toggleHambugerView(id: string): boolean {
        const button = document.getElementById(id);
        const buttonAttr = button ? button.getAttribute('aria-expanded') : null;
        return buttonAttr === 'true';
    }

    showProducts(category: string) {
        this.router.navigate(['products'], { queryParams: { category } });
    }

    removeFromCart(product: CartProduct) {
        this.store.dispatch(new CartActions.RemoveProduct(product));
    }

    ngAfterViewInit() {
        this.resizeService.onResize$.subscribe({
            next: (size: SCREEN_SIZE) => {
                this.screenSize = size;
            }
        });

        this.store.select(UserSelectors.isUserLogged).subscribe((value: boolean) => {
            this.isLogged = value;
        });

        this.store.select(CartSelectors.getCartItemsAsArray).subscribe((items: CartProduct[]) => {
            if (items) {
                this.cartProducts = items;
            }
        });

        combineLatest([
            this.store.select(CartSelectors.isCartEmpty),
            this.store.select(FavoriteSelectors.isFavoritesEmpty
            )]
        ).subscribe(([cart, favorites]: [boolean, boolean]) => {
            this.emptyCart = cart;
            this.emptyFavorites = favorites;
        });
    }

    ngAfterViewChecked() {
        this.cd.detectChanges();
    }

    get iconSize() {
        if (this.screenSize === SCREEN_SIZE.xs ||
            this.screenSize === SCREEN_SIZE.sm ||
            this.screenSize === SCREEN_SIZE.md) {
            return 'sm';
        }
        return 'lg';
    }

    openPreferencesModal() {
        this.modalRef = this.modalService.show(PreferencesModalComponent, {
            backdrop: true,
            keyboard: true,
            focus: true,
            ignoreBackdropClick: false,
            class: 'modal-dialog',
            animated: true
        });
    }
}
