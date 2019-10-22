import { Component, OnInit } from '@angular/core';
import { Slides } from '../../../shared/models/slider-json/slides';
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
        this.slides = Slides;
    }

}
