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
                src: 'http://cdn.shopify.com/s/files/1/0208/5268/files/nike-AF1-uninterrupted-banner_10-9.jpg?v=1570726775'
            },
            {
                title: 'ADIDAS ULTRA BOOST 1.0 "OG', paragraph: 'MTAA QS "UNINTERRUPTED',
                src: 'https://cdn.shopify.com/s/files/1/0208/5268/files/OGULTRABOOST-BANNER2.jpeg?v=1570114766'
            },
            {
                title: 'NEW BALANCE MADE IN USA', paragraph: 'SUPER FABRIC PACK',
                src: 'https://cdn.shopify.com/s/files/1/0208/5268/files/NBSUPERFABRICPACK-BANNER2.jpeg?v=1570665427'
            },
        ];
        this.slides = slides;
    }

}
