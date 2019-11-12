import { FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { map } from 'rxjs/operators';


export class RegistrationValidators {
    static uniqEmail(authService: AuthenticationService) {
        // tslint:disable-next-line: ter-arrow-body-style
        return (control: AbstractControl) => {
            return authService.chekUserEmail(control.value).pipe(
                map(resolve => {
                    if (control.touched) {
                        return (resolve) ? { 'uniqEmail': true} : null;
                    }
                })
            );
        };
    }

    static checkPassword(group: FormGroup) {
        const pass = group.controls.password.value;
        const confirmPass = group.controls.confirmPassword.value;

        return pass === confirmPass ? null : { notSame: true };
    }
}
