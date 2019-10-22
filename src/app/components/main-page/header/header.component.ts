import { Component, ViewEncapsulation, HostListener, AfterViewInit } from '@angular/core';
import { ResizeService } from '../../../shared/services/resize/resize.service';
import { UtilsService } from '../../../shared/services/utils/utils.service';
import { SCREEN_SIZE } from '../../../shared/models/screen-size/screen-size';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [UtilsService, ResizeService]
})
export class HeaderComponent implements AfterViewInit {
    public screenSize: SCREEN_SIZE;
    constructor(
        public resizeService: ResizeService,
        private utilsService: UtilsService) {
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

}
