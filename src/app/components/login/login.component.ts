import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { UserActions, UserSelectors, ShopState } from '../../store';
import { Authenticate } from '../../shared/interfaces/user/authenticate';
import { ActivatedRoute } from '@angular/router';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
    private _loginForm: FormGroup;
    public userIsLoading$: Observable<boolean>;
    public returnUrl: string;
    constructor(
        private fb: FormBuilder,
        private store: Store<ShopState>,
        private route: ActivatedRoute) {
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
        this.userIsLoading$ = this.store.select(UserSelectors.isUserLoading);
    }

    ngOnInit() {
        this.subscription.add(this.route.queryParams.subscribe((params) => {
            this.returnUrl = params['return'] || '/main';
        }));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public loginIn() {
        const { email, password } = this._loginForm.value;
        const credentials: Authenticate = { email, password };
        this.store.dispatch(new UserActions.LoginUser(credentials, this.returnUrl));
    }

    get loginForm() {
        return this._loginForm;
    }
}
