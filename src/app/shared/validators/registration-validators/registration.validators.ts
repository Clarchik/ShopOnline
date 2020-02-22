import { AbstractControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { map, distinctUntilChanged, debounceTime, switchMap, first } from 'rxjs/operators';


export class RegistrationValidators {
    static uniqEmail(authService: AuthenticationService) {
        return (control: AbstractControl) => control.valueChanges.pipe(
            distinctUntilChanged(),
            debounceTime(750),
            switchMap((email) => authService.chekUserEmail(email)),
            map((response) => (response ? { uniqEmail: true } : null)),
            first()
        );
    }

    static mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.notSame) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ notSame: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }
}
