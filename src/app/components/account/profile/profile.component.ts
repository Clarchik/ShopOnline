import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { ShopState, UserActions, UserSelectors } from '../../../store';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
    public isLogged: boolean;
    constructor(private store: Store<ShopState>) { }

    ngOnInit() {
        this.subscription.add(this.store.select(UserSelectors.isUserLogged).subscribe((value: boolean) => {
            this.isLogged = value;
        }));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    logout() {
        this.store.dispatch(new UserActions.LogoutUser());
    }

}
