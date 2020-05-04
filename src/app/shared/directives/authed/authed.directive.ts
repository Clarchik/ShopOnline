import {Directive, OnInit, OnDestroy, TemplateRef, ViewContainerRef, Input} from '@angular/core';
import {ShopState, UserSelectors} from '../../../store';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {share} from 'rxjs/operators';

@Directive({
    selector: '[appAuthed]'
})
export class AuthedDirective implements OnInit, OnDestroy {
    private isVisible: boolean;
    private stop$: Subject<boolean> = new Subject();
    private condition: boolean;
    @Input() set appAuthed(condition: boolean) {
        this.condition = condition;
    }

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private store: Store<ShopState>
    ) {}

    ngOnInit() {
        this.store.select(UserSelectors.isUserLogged).pipe(share()).subscribe((isLogged) => {
            if ((isLogged && this.condition) || (!isLogged && !this.condition)) {
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
