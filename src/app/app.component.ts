import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { slideInAnimation } from './shared/models/animations/animation';
import { RouterOutlet } from '@angular/router';

import { UtilsService } from './shared/services/utils/utils.service';
import { ResizeService } from './shared/services/resize/resize.service';

import * as fromStore from './store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
    public title = 'OnlineShop';
    public noUser$: Observable<boolean>;
    constructor(
        private store: Store<fromStore.ShopState>,
        private utilsService: UtilsService,
        private resizeService: ResizeService) { }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const screenSize = this.utilsService.getScreenSizeByWidth(event.target.innerWidth);
        this.resizeService.onResize(screenSize);
    }

    ngOnInit() {
        const userCartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        this.noUser$ = this.store.select(fromStore.isNotUserLogged);
        if (userCartProducts) {
            this.store.dispatch(new fromStore.LoadProducts(userCartProducts));
        }
    }

    getRouteAnimation(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
