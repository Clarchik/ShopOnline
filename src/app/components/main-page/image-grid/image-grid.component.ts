import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-image-grid',
    templateUrl: './image-grid.component.html',
    styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent implements OnInit {
    public secondGridRow: Array<{ imgUrl: string, title: string }>;
    public thirdGridRow: Array<{ imgUrl: string, title: string }>;
    constructor() { }

    ngOnInit() {
        this.secondGridRow = [
            { imgUrl: 'http://cdn.shopify.com/s/files/1/0208/5268/files/homepage2_9-6_800x.jpg?v=1567794828', title: 'ELLESSE X WOOD WOOD' },
            { imgUrl: 'http://cdn.shopify.com/s/files/1/0208/5268/files/homepage3_9-6_800x.jpg?v=1567795000', title: 'ELLESSE X WOOD WOOD' },
            { imgUrl: 'http://cdn.shopify.com/s/files/1/0208/5268/files/CARHARTTWEBPANEL-3_800x.jpeg?v=1568392605', title: 'ELLESSE X WOOD WOOD' }
        ];

        this.thirdGridRow = [
            { imgUrl: 'http://cdn.shopify.com/s/files/1/0208/5268/files/NB-990-homepageC_9-18_800x.jpeg?v=1569950832', title: 'ELLESSE X WOOD WOOD' },
            { imgUrl: 'http://cdn.shopify.com/s/files/1/0208/5268/files/NB-990-homepage_9-18_800x.jpg?v=1568836074', title: 'ELLESSE X WOOD WOOD' },
        ];
    }

}
