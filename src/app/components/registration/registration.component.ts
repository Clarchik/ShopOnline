import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { HttpClient } from '@angular/common/http';
import { RegistrationValidators } from '../../shared/validators/registration-validators/registration.validators';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { UtilsService } from '../../shared/services/utils/utils.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnChanges {
    public registrationForm: FormGroup;
    public difficulty = '';
    constructor(private fb: FormBuilder, private store: Store<fromStore.UserState>, private http: HttpClient, private authService: AuthenticationService, private utils: UtilsService) {
        this.registrationForm = this.fb.group({
            email: [
                '', [Validators.required, Validators.email], RegistrationValidators.uniqEmail(this.authService)
            ],
            password: [
                '', [Validators.required, Validators.minLength(8)]
            ],
            confirmPassword: [
                '', Validators.required
            ],
            name: [
                '', Validators.required
            ],
            surname: [
                '', Validators.required
            ]
        }, {
            validators: RegistrationValidators.checkPassword,
            updateOn: 'blur'
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
}
