import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[compareTo]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CopmareValidatorDirective,
        multi: true
    }]
})
export class CopmareValidatorDirective extends Validators {
    @Input('compareTo') controlNameToCompare: string;

    validate(control: AbstractControl): ValidationErrors | null {
        if (!control.value) {
            return null;
        }
        const controlToCompare = control.root.get(this.controlNameToCompare);
        if (controlToCompare) {
            const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
                control.updateValueAndValidity();
                subscription.unsubscribe();
            });
        }
        return controlToCompare && controlToCompare.value !== control.value ? { notEqual: true } : null;
    }
}
