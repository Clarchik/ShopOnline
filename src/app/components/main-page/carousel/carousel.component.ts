import { Component, OnInit } from '@angular/core';
import { Slide } from '../../../shared/interfaces/slide-interface';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

    public slides: Array<Slide> = [];

    constructor() { }

    ngOnInit(): void {
        const slides: Array<Slide> = [
            {
                title: 'NIKE AIR FORCE 1 07', paragraph: 'MTAA QS "UNINTERRUPTED',
                src: 'http://cdn.shopify.com/s/files/1/0208/5268/files/nike-AF1-uninterrupted-banner_10-9.jpg?v=1570726775',
                link: '5e9481211c9d44000054f2eb'
            },
            {
                title: 'ADIDAS ULTRA BOOST 1.0 "TRIPLE WHITE"', paragraph: 'RETURN OF THE OG',
                src: 'https://cdn.shopify.com/s/files/1/0208/5268/files/WHITEULTRABOOSTOG-BANNER.jpeg?v=1591128586',
                link: '5ed9423c3853a138384e3305'
            }
        ];
        this.slides = slides;
    }

}
