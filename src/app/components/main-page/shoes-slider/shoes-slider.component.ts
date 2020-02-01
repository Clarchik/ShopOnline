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
            { img: '//cdn.shopify.com/s/files/1/0208/5268/products/DIADORAMAVERICK-SWEDISHBLUE-6_450x450.jpg?v=1571430706' },
            { img: '//cdn.shopify.com/s/files/1/0208/5268/products/DIADORAMAVERICK-BLUEDENIM-6_450x450.jpg?v=1571431006' },
            { img: '//cdn.shopify.com/s/files/1/0208/5268/products/DIADORAMAVERICK-SIMPLYGREEN-6_450x450.jpg?v=1571431172' },
            { img: '//cdn.shopify.com/s/files/1/0208/5268/products/BLACKWOODWOODXELLESSE-6_450x450.jpg?v=1571488125' },
            { img: '//cdn.shopify.com/s/files/1/0208/5268/products/GREYWOODWOODXELLESSE-6_450x450.jpg?v=1571488228' },
            { img: '//cdn.shopify.com/s/files/1/0208/5268/products/SUPERFABRICNB998-6_450x450.jpg?v=1569945613' },
            { img: '//cdn.shopify.com/s/files/1/0208/5268/products/OLIVENB801-1_500x.jpg?v=1571331780' },
            { img: '//cdn.shopify.com/s/files/1/0208/5268/products/FD63AC3D-967E-4FDB-941C-77BB31587FC3_450x450.jpg?v=1570845116' },
            { img: '//cdn.shopify.com/s/files/1/0208/5268/products/0439F0CD-6A83-4283-B6E6-4B5E927C402F_450x450.jpg?v=1570847446' },
        ];
        this.cards = cards;
        this.slides = this.utilsService.chunkArrayBySize(this.cards, 3);
    }

}
