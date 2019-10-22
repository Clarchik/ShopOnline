import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Cards } from '../../../shared/models/gallery-shoes/gallery-shoes';
import { GalleryShoes as shoes } from '../../../shared/interfaces/gallery-shoes';

@Component({
    selector: 'app-shoes-slider',
    templateUrl: './shoes-slider.component.html',
    styleUrls: ['./shoes-slider.component.scss']
})
export class ShoesSliderComponent implements OnInit, AfterViewInit {


    slides: any = [[]];
    cards: Array<shoes> = [];

    constructor(private renderer: Renderer2) { }


    chunk(arr: any, chunkSize: number) {
        const R = [];
        for (let i = 0, len = arr.length; i < len; i += chunkSize) {
            R.push(arr.slice(i, i + chunkSize));
        }
        return R;
    }

    ngOnInit() {
        this.cards = Cards;
        this.slides = this.chunk(this.cards, 3);
    }

    ngAfterViewInit() {
        const buttons = document.querySelectorAll('.btn-floating');
        buttons.forEach((el: any) => {
            this.renderer.removeClass(el, 'btn-floating');
            this.renderer.addClass(el, 'px-3');
            this.renderer.addClass(el.firstElementChild, 'fa-3x');
        });
    }

}
