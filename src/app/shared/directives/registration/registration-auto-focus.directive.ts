import { Directive, ElementRef, AfterContentInit } from '@angular/core';

@Directive({
    selector: '[appRegistrationAutoFocus]'
})
export class RegistrationAutoFocusDirective implements AfterContentInit {
    constructor(private el: ElementRef) { }

    public ngAfterContentInit() {
        setTimeout(() => {
            this.el.nativeElement.focus();
        }, 300);
    }
}
