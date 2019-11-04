import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { User } from '../../shared/interfaces/user/user';

import * as fromStore from '../../store';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public userIsLoading$: Observable<boolean>;
    constructor(
        private fb: FormBuilder,
        private store: Store<fromStore.UserState>) {
        this.loginForm = this.fb.group({
            email: [''],
            password: ['']
        });
        this.userIsLoading$ = this.store.select(fromStore.isUserLoading);
    }

    ngOnInit() { }

    loginIn() {
        const { email, password } = this.loginForm.value;
        this.store.dispatch(new fromStore.LoginUser({ email, password }));
    }
}
