import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromStore from './store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'OnlineShop';
    noUser$: Observable<boolean>;
    constructor(private store: Store<fromStore.UserState>) { }

    ngOnInit() {
        this.noUser$ = this.store.select(fromStore.isNotUserLogged);
    }
}
