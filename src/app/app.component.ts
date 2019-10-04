import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'OnlineShop';
    testing = 32;
    constructor() {
        const er = new Object();
    }
}
