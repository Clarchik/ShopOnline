import { Component, OnInit, OnChanges, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { HttpClient } from '@angular/common/http';
import { RegistrationValidators } from '../../shared/validators/registration-validators/registration.validators';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { UtilsService } from '../../shared/services/utils/utils.service';
import { transition, trigger, useAnimation } from '@angular/animations';
import { wobble, shake, zoomOutRight, rubberBand } from 'ng-animate';

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
export class RegistrationComponent implements OnInit, OnChanges {
    public registrationForm: FormGroup;
    public difficulty = '';
    public passwordToRead = true;
    @ViewChild('passwordInput', { static: false }) passwordInput: ElementRef;
    constructor(
        private fb: FormBuilder, private store: Store<fromStore.UserState>,
        private http: HttpClient, private authService: AuthenticationService, private utils: UtilsService) {
        this.registrationForm = this.fb.group({
            email: [
                null, [Validators.required, Validators.email], RegistrationValidators.uniqEmail(this.authService)
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
            validators: RegistrationValidators.checkPassword
        });

        this.ngOnChanges();
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.registrationForm.get('password').valueChanges.subscribe(val => {
            this.utils.getPasswordDifficulty(val).subscribe(value => {
                this.difficulty = value;
            });
        });
    }

    SignUp() {
        const { email, password, name, surname } = this.registrationForm.value;
        console.log({ email, password, name, surname });
        this.store.dispatch(new fromStore.RegistrationUser({ email, password, name, surname }));
    }

    showHidePassword() {
        if (this.passwordToRead) {
            this.passwordInput.nativeElement.setAttribute('type', 'text');
            this.passwordToRead = false;
        } else {
            this.passwordInput.nativeElement.setAttribute('type', 'password');
            this.passwordToRead = true;
        }
    }
}
