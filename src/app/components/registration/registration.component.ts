import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RegistrationValidators } from '../../shared/validators/registration-validators/registration.validators';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { UtilsService } from '../../shared/services/utils/utils.service';
import { transition, trigger, useAnimation } from '@angular/animations';
import { wobble, shake, zoomOutRight, rubberBand } from 'ng-animate';

import { ShopState, UserActions } from '../../store';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
    animations: [
        trigger('cancel', [
            transition('void => *', useAnimation(wobble))
        ]),
        trigger('bird', [
            transition('void => *', useAnimation(rubberBand))
        ]),
        trigger('errors', [
            transition('void => *', useAnimation(shake))
        ]),
        trigger('errors_wrapper', [
            transition('* => void', useAnimation(zoomOutRight))
        ])
    ]
})
export class RegistrationComponent implements OnInit, OnDestroy {
    public subscription: Subscription = new Subscription();
    public registrationForm: FormGroup;
    public difficulty = '';
    public passwordToRead = false;

    constructor(
        private fb: FormBuilder, private store: Store<ShopState>,
        private authService: AuthenticationService, private utils: UtilsService) {
        this.registrationForm = this.fb.group({
            email: [
                null,
                [
                    Validators.required,
                    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
                ], RegistrationValidators.uniqEmail(this.authService)
            ],
            password: [
                null, [Validators.required, Validators.minLength(8)]
            ],
            confirmPassword: [
                null, Validators.required
            ],
            name: [
                null, Validators.required
            ],
            surname: [
                null, Validators.required
            ]
        }, {
            validators: RegistrationValidators.mustMatch('password', 'confirmPassword')
        });
    }

    ngOnInit() {
        this.subscription.add(this.registrationForm.get('password').valueChanges.subscribe((val) => {
            this.difficulty = this.utils.getPasswordDifficulty(val);
        }));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    signUp() {
        const { email, password, name, surname } = this.registrationForm.value;
        this.store.dispatch(new UserActions.RegistrationUser({ email, password, name, surname }));
    }

    showHidePassword() {
        this.passwordToRead = !this.passwordToRead;
    }

    get email() {
        return this.registrationForm.get('email');
    }
    get password() {
        return this.registrationForm.get('password');
    }
    get confirmPassword() {
        return this.registrationForm.get('confirmPassword');
    }
    get name() {
        return this.registrationForm.get('name');
    }
    get surname() {
        return this.registrationForm.get('surname');
    }
}
