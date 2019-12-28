import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import { Authenticate } from '../../shared/interfaces/user/authenticate';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    private _loginForm: FormGroup;
    public userIsLoading$: Observable<boolean>;
    constructor(
        private fb: FormBuilder,
        private store: Store<fromStore.ShopState>) {
        this._loginForm = this.fb.group({
            email: [
                null,
                Validators.required,
            ],
            password: [
                null,
                Validators.required
            ]
        });
        this.userIsLoading$ = this.store.select(fromStore.isUserLoading);
    }

    ngOnInit() { }

    public loginIn() {
        const { email, password } = this._loginForm.value;
        const credentials: Authenticate = { email, password };
        this.store.dispatch(new fromStore.LoginUser(credentials));
    }

    get loginForm() {
        return this._loginForm;
    }
}
