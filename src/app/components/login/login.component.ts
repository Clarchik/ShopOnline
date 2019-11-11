import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

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
            email: [
                'no-name@mail.ru',
                Validators.required,
            ],
            password: [
                'helloworld',
                Validators.required
            ]
        });
        this.userIsLoading$ = this.store.select(fromStore.isUserLoading);
    }

    ngOnInit() { }

    loginIn() {
        const { email, password } = this.loginForm.value;
        this.store.dispatch(new fromStore.LoginUser({ email, password }));
    }
}
