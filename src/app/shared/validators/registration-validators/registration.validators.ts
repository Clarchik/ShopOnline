import { AbstractControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { map, distinctUntilChanged, debounceTime, switchMap, first } from 'rxjs/operators';


export class RegistrationValidators {
    static uniqEmail(authService: AuthenticationService) {
        return (control: AbstractControl) => control.valueChanges.pipe(
            distinctUntilChanged(),
            debounceTime(750),
            switchMap((email) => authService.chekUserEmail(email)),
            map((response) => response ? { uniqEmail: true} : null),
        first()
        );
    }

    static checkPassword(group: FormGroup) {
        const pass = group.controls.password.value;
        const confirmPass = group.controls.confirmPassword.value;

        return pass === confirmPass ? null : { notSame: true };
    }
}
