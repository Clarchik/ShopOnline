import {Directive, ViewContainerRef, TemplateRef, OnInit, OnDestroy, Input} from '@angular/core';
import {ShopState, UserSelectors} from '../../../store';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs';

@Directive({
    selector: '[appHasRole]'
})
export class RoleDirective implements OnInit, OnDestroy {
    private isVisible: boolean = false;
    private stop$: Subject<boolean> = new Subject();
    @Input('appHasRole') roles: string | string[];

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private store: Store<ShopState>
    ) {}

    ngOnInit() {
        this.store.select(UserSelectors.getUser).subscribe((user) => {
            if (!user.role) {
                this.viewContainerRef.clear();
            }

            if (this.roles.includes(user.role)) {
                if (!this.isVisible) {
                    this.isVisible = true;
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
                }
            } else {
                this.isVisible = false;
                this.viewContainerRef.clear();
            }
        });
    }

    ngOnDestroy() {
        this.stop$.next(true);
    }
}
