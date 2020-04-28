import {FormGroup} from '@angular/forms';

export class CountryValidator {
    static mustInclude(controlName: string, list: Array<any>) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];

            if (control.errors && !control.errors.notInclude) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (!list.includes(control.value)) {
                control.setErrors({ notInclude: true });
            } else {
                control.setErrors(null);
            }
        };
    }
}
