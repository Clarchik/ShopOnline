import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromStore from '../../../store';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    constructor(private store: Store<fromStore.UserState>) { }

    ngOnInit() {
    }

    logout() {
        this.store.dispatch(new fromStore.LogoutUser());
    }

}
