import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { slideInAnimation } from './shared/models/animations/animation';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';

import { UtilsService } from './shared/services/utils/utils.service';
import { ResizeService } from './shared/services/resize/resize.service';

import { UserSelectors, FavoriteActions, CartActions, ShopState } from './store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
    public title = 'OnlineShop';
    constructor(
        private router: Router,
        private store: Store<ShopState>,
        private utilsService: UtilsService,
        private resizeService: ResizeService) { }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const screenSize = this.utilsService.getScreenSizeByWidth(event.target.innerWidth);
        this.resizeService.onResize(screenSize);
    }

    ngOnInit() {
        const userCartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        const userFavoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts'));
        if (userCartProducts) {
            this.store.dispatch(new CartActions.LoadProducts(userCartProducts));
        }
        if (userFavoriteProducts) {
            this.store.dispatch(new FavoriteActions.LoadProducts(userFavoriteProducts));
        }
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }

    getRouteAnimation(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
