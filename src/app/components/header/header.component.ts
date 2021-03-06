import { Component, ViewEncapsulation, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ResizeService } from '../../shared/services/resize/resize.service';
import { SCREEN_SIZE } from '../../shared/models/screen-size/screen-size';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { PreferencesModalComponent } from '../preferences-modal/preferences-modal.component';

import { Router } from '@angular/router';
import { transition, trigger, useAnimation } from '@angular/animations';
import { bounceIn } from 'ng-animate';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('pulse', [
            transition('void => *', useAnimation(bounceIn))
        ])
    ]
})
export class HeaderComponent implements AfterViewInit, AfterViewChecked {
    public screenSize: SCREEN_SIZE;
    public modalRef: MDBModalRef;
    constructor(
        private cd: ChangeDetectorRef,
        private router: Router,
        public resizeService: ResizeService,
        private modalService: MDBModalService) {

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

    ngAfterViewChecked() {
        this.cd.detectChanges();
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
