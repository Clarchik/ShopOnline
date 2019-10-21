import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LanguageComponent {
    public allLanguages: Array<string>;
    public availableLanguages: Array<string>;
    public currentLanguage: string;
    constructor(private translate: TranslateService) {
        const language = localStorage.getItem('language');
        const defaultLanguage = language ? language : 'en';
        translate.setDefaultLang(defaultLanguage);
        this.allLanguages = ['en', 'pl'];
        this.currentLanguage = defaultLanguage;
        this.filterAvailableLanguages();
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

}
