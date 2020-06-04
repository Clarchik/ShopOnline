import { Component, OnInit } from '@angular/core';
import { GalleryShoes } from '../../../shared/interfaces/gallery-shoes';
import { UtilsService } from '../../../shared/services/utils/utils.service';

@Component({
    selector: 'app-shoes-slider',
    templateUrl: './shoes-slider.component.html',
    styleUrls: ['./shoes-slider.component.scss']
})
export class ShoesSliderComponent implements OnInit {
    public slides: any = [[]];
    public cards: Array<GalleryShoes> = [];

    constructor(
        private utilsService: UtilsService) { }

    ngOnInit() {
        const cards: Array<GalleryShoes> = [
            {
                img: 'https://online-shop4.herokuapp.com/assets/images/products/nike-air-force-1-low-mystic-green/WMNSCHROMEYELLOWAF1-main.jpg',
                link: '5e94807a1c9d44000054f2ea'
            },
            {
                img: 'https://online-shop4.herokuapp.com/assets/images/products/adidas-yeezy-700-utility-black/UTILITYBLACK700-main.jpg',
                link: '5e9480121c9d44000054f2e9'
            },
            {
                img: 'https://online-shop4.herokuapp.com/assets/images/products/nike-air-jordan-1-low-shattered-backboard/AIRJORDAN1LOWSBB-main.jpg',
                link: '5e9482621c9d44000054f2ec'
            },
            {
                img: 'https://online-shop4.herokuapp.com/assets/images/products/nike-jordan-12-retro-dark-grey/DARKGREYAIRJORDN12-main.jpg',
                link: '5e9483931c9d44000054f2ee'
            },
            {
                img: 'https://online-shop4.herokuapp.com/assets/images/products/nike-air-jordan-oreo/BLACK-GREYLEBRON17-main.jpg',
                link: '5e9482e81c9d44000054f2ed'
            },
            {
                img: 'https://online-shop4.herokuapp.com/assets/images/products/reebok-instapump-fury-boost/reebok-instapump-fury-boost-main.jpg',
                link: '5e94844d1c9d44000054f2ef'
            }
        ];
        this.cards = cards;
        this.slides = this.utilsService.chunkArrayBySize(this.cards, 3);
    }

}
