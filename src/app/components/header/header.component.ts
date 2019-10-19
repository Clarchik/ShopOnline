import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements AfterViewInit {

    constructor() { }

    ngAfterViewInit() {
        const navbarButton = document.querySelector('.navbar-toggler');
        const navbarIcon = document.querySelector('.navbar-toggler-icon');
        fromEvent(navbarButton, 'click').subscribe({
            next: (e) => {
                const buttonAttr = navbarButton.getAttribute('aria-expanded');
                if (buttonAttr === 'true') {
                    navbarIcon.classList.add('button-close__image');
                } else {
                    navbarIcon.classList.remove('button-close__image');
                }
            }
        });
    }

}
