import { Component, ViewEncapsulation, HostListener, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ResizeService } from '../../shared/services/resize/resize.service';
import { UtilsService } from '../../shared/services/utils/utils.service';
import { SCREEN_SIZE } from '../../shared/models/screen-size/screen-size';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [UtilsService, ResizeService]
})
export class HeaderComponent implements AfterViewInit {
    public screenSize: SCREEN_SIZE;
    public allLanguages: Array<string>;
    public availableLanguages: Array<string>;
    public currentLanguage: string;
    constructor(
        private translate: TranslateService,
        public resizeService: ResizeService,
        private utilsService: UtilsService) {
        const language = localStorage.getItem('language');
        const defaultLanguage = language ? language : 'en';
        translate.setDefaultLang(defaultLanguage);
        this.allLanguages = ['en', 'pl'];
        this.currentLanguage = defaultLanguage;
        this.filterAvailableLanguages();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const screenSize = this.utilsService.getScreenSizeByWidth(event.target.innerWidth);
        this.resizeService.onResize(screenSize);
    }


    switchLanguage(language: string) {
        localStorage.setItem('language', language);
        this.translate.use(language);
        this.currentLanguage = language;
        this.filterAvailableLanguages();
    }

    filterAvailableLanguages() {
        this.availableLanguages = this.allLanguages.filter((item) => item !== this.currentLanguage);
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
