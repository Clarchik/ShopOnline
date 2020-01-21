import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { ShopState, UserActions } from '../../../store';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    constructor(private store: Store<ShopState>) { }

    ngOnInit() {
    }

    logout() {
        this.store.dispatch(new UserActions.LogoutUser());
    }

}
