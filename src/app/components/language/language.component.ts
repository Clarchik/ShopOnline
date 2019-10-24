import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE_NAMES } from '../../shared/models/languages/language-names';
import { Language } from '../../shared/models/languages/language';

@Component({
    selector: 'app-language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
    public allLanguages: Array<Language>;
    public availableLanguages: Array<Language>;
    public currentLanguage: LANGUAGE_NAMES;
    constructor(private translate: TranslateService) {
        const language: LANGUAGE_NAMES = LANGUAGE_NAMES[localStorage.getItem('language')];
        const defaultLanguage: LANGUAGE_NAMES = language ? language : LANGUAGE_NAMES.en;
        this.allLanguages = [{ name: LANGUAGE_NAMES.en }, { name: LANGUAGE_NAMES.pl }];
        this.switchLanguage(defaultLanguage);
    }

    switchLanguage(language: LANGUAGE_NAMES) {
        this.currentLanguage = language;
        localStorage.setItem('language', language);
        this.translate.use(language);
        this.availableLanguages = this.allLanguages.filter((item) => item.name !== this.currentLanguage);
    }

}
