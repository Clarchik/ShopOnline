import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { ShopState, UserActions } from '../../../store';
import {UserRoles} from '../../../shared/interfaces/user/user-roles';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
    constructor(private store: Store<ShopState>) { }

    get allowedRoles() {
        return [UserRoles.Admin, UserRoles.Manager];
    }

    logout() {
        this.store.dispatch(new UserActions.LogoutUser());
    }

}
