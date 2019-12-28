import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { slideInAnimation } from './shared/models/animations/animation';

import { RouterOutlet } from '@angular/router';

import * as fromStore from './store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
    title = 'OnlineShop';
    noUser$: Observable<boolean>;
    constructor(private store: Store<fromStore.ShopState>) { }

    ngOnInit() {
        this.noUser$ = this.store.select(fromStore.isNotUserLogged);
    }

    getRouteAnimation(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
