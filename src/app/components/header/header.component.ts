import { Component, ViewEncapsulation, HostListener, AfterViewInit } from '@angular/core';
import { ResizeService } from '../../shared/services/resize/resize.service';
import { UtilsService } from '../../shared/services/utils/utils.service';
import { SCREEN_SIZE } from '../../shared/models/screen-size/screen-size';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { PreferencesModalComponent } from '../main-page/preferences-modal/preferences-modal.component';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [UtilsService, ResizeService]
})
export class HeaderComponent implements AfterViewInit {
    public screenSize: SCREEN_SIZE;
    private modalRef: MDBModalRef;
    public user$: Observable<boolean>;
    public noUser$: Observable<boolean>;
    constructor(
        private router: Router,
        public resizeService: ResizeService,
        private utilsService: UtilsService,
        private modalService: MDBModalService,
        private store: Store<fromStore.ShopState>) {
        this.noUser$ = this.store.select(fromStore.isNotUserLogged);
        this.user$ = this.store.select(fromStore.isUserLogged);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const screenSize = this.utilsService.getScreenSizeByWidth(event.target.innerWidth);
        this.resizeService.onResize(screenSize);
    }

    toggleHambugerView(id: string): boolean {
        const button = document.getElementById(id);
        const buttonAttr = button ? button.getAttribute('aria-expanded') : null;
        return buttonAttr === 'true';
    }

    showProducts(category: string) {
        this.router.navigate(['products'], { queryParams: { category } });
    }

    ngAfterViewInit() {
        this.resizeService.onResize$.subscribe({
            next: (size: SCREEN_SIZE) => {
                this.screenSize = size;
            }
        });
    }

    get iconSize() {
        if (this.screenSize === SCREEN_SIZE.xs ||
            this.screenSize === SCREEN_SIZE.sm ||
            this.screenSize === SCREEN_SIZE.md) {
            return 'sm';
        }
        return 'lg';
    }

    openPreferencesModal() {
        this.modalRef = this.modalService.show(PreferencesModalComponent, {
            backdrop: true,
            keyboard: true,
            focus: true,
            ignoreBackdropClick: false,
            class: 'modal-dialog',
            animated: true
        });
    }

}
