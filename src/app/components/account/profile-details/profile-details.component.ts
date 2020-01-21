import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormControl, ValidatorFn, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserData } from '../../../shared/models/user/user-data';

import { USER_DATA_FIELD_NAMES } from '../../../shared/models/user/user-data-names';
import { trigger, useAnimation, transition } from '@angular/animations';
import { wobble, rubberBand, shake, zoomOutRight } from 'ng-animate';

import { UserPasswords } from '../../../shared/models/user/user-passwords';

import { ShopState, UserSelectors, UserActions } from '../../../store';

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss'],
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
export class ProfileDetailsComponent implements OnInit {
    public profileData: FormGroup;
    public profilePassword: FormGroup;
    private user: UserData;
    constructor(
        private store: Store<ShopState>,
        private fb: FormBuilder) {
        this.profileData = this.fb.group({});
        this.profilePassword = this.fb.group({});
    }

    ngOnInit() {
        this.store.select(UserSelectors.getUser).subscribe((user: UserData) => {
            this.initProfileDataControls(user);
            this.user = user;
        });
        this.initProfilePasswordControls();
    }

    private initProfileDataControls(user: UserData) {
        for (const userField in user) {
            if (Object.prototype.hasOwnProperty.call(user, userField)) {
                const validators = this.getValidatorsObjectByField(userField);
                const control = new FormControl(user[userField],
                    [...validators.regularValidators]
                );
                this.profileData.addControl(userField, control);
            }
        }
    }

    private initProfilePasswordControls() {
        const oldPasswordControl = new FormControl(null, [Validators.required, Validators.minLength(8)]);
        const passwordControl = new FormControl(null, [Validators.required, Validators.minLength(8)]);
        const confirmPassword = new FormControl(null, [Validators.required]);
        this.profilePassword.addControl(USER_DATA_FIELD_NAMES.oldPassword, oldPasswordControl);
        this.profilePassword.addControl(USER_DATA_FIELD_NAMES.newPassword, passwordControl);
        this.profilePassword.addControl(USER_DATA_FIELD_NAMES.newPasswordConfirm, confirmPassword);
    }

    private getValidatorsObjectByField(field: string) {
        const validatorObject: {
            regularValidators: ValidatorFn | ValidatorFn[]
        } = { regularValidators: [] };
        switch (field) {
            case USER_DATA_FIELD_NAMES.email:
                validatorObject.regularValidators = [
                    Validators.required,
                    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
                ];
                break;
            case USER_DATA_FIELD_NAMES.name:
                validatorObject.regularValidators = Validators.required;
                break;
            case USER_DATA_FIELD_NAMES.surname:
                validatorObject.regularValidators = Validators.required;
                break;
        }
        return validatorObject;
    }

    public changeProfileData() {
        const { email, name, surname } = this.profileData.value;
        const updatedUser = new UserData(this.user._id, email, name, surname);
        this.store.dispatch(new UserActions.UpdateUserData(updatedUser));
    }

    public changeProfilePassword() {
        const id = this.user._id;
        const { oldPassword, newPassword, newPasswordConfirm } = this.profilePassword.value;
        const userPasswords = new UserPasswords(oldPassword, newPassword, newPasswordConfirm);
        this.store.dispatch(new UserActions.UpdateUserPasswords({ userPasswords, id }));
        this.profilePassword.reset();
    }

    get name(): AbstractControl {
        return this.profileData.controls[USER_DATA_FIELD_NAMES.name];
    }

    get surname(): AbstractControl {
        return this.profileData.controls[USER_DATA_FIELD_NAMES.surname];
    }

    get email(): AbstractControl {
        return this.profileData.controls[USER_DATA_FIELD_NAMES.email];
    }

    get oldPassword(): AbstractControl {
        return this.profilePassword.controls[USER_DATA_FIELD_NAMES.oldPassword];
    }

    get newPassword(): AbstractControl {
        return this.profilePassword.controls[USER_DATA_FIELD_NAMES.newPassword];
    }

    get newPasswordConfirm(): AbstractControl {
        return this.profilePassword.controls[USER_DATA_FIELD_NAMES.newPasswordConfirm];
    }
}
