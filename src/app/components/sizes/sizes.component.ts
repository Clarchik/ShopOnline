import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-sizes',
    templateUrl: './sizes.component.html',
    styleUrls: ['./sizes.component.scss']
})
export class SizesComponent {
    public gender: Array<string> = ['man', 'woomen'];
    public choosedGender: string;
    public sizes: Array<any>;
    constructor() { }

    public onChange(name: string) {
        this.changeSize(name);
    }

    public isEven(index: number) {
        return index % 2 === 0;
    }

    public highlightSelected(rowNumber, tdNumber) {
        this.highlightRow(rowNumber, tdNumber);
        this.highlightColumn(rowNumber, tdNumber);
        this.highlightHeader(tdNumber);
    }

    private highlightRow(rowNumber, tdNumber) {
        const row = document.getElementById(`${rowNumber}`);
        for (let i = 0; i < tdNumber; i++) {
            row.children[i].classList.add('highlight-orange-light');
        }
    }

    private highlightColumn(rowNumber, tdNumber) {
        for (let i = 0; i <= rowNumber; i++) {
            const row = document.getElementById(`${i}`);
            row.children[tdNumber].classList.add('highlight-orange-light');
        }
    }

    private highlightHeader(tdNumber) {
        const header = document.getElementsByClassName('nike-cq-table-header');
        header[0].children[tdNumber].classList.add('highlight-orange-dark');
    }

    private changeSize(name: string) {
        const sizes = {
            man: [
                { cm: 23.7, ue: 38.5, uk: 5.5, us: 6 },
                { cm: 24.1, ue: 39, uk: 6, us: 6.5 },
                { cm: 24.5, ue: 40, uk: 6, us: 7 },
                { cm: 25, ue: 40.5, uk: 6.5, us: 7.5 },
                { cm: 25.4, ue: 41, uk: 7, us: 8 },
                { cm: 25.8, ue: 42, uk: 7.5, us: 8.5 },
                { cm: 26.2, ue: 42.5, uk: 8, us: 9 },
                { cm: 26.7, ue: 43, uk: 8.5, us: 9.5 },
                { cm: 27.1, ue: 44, uk: 9, us: 10 },
                { cm: 27.5, ue: 44.5, uk: 9.5, us: 10.5 },
                { cm: 27.9, ue: 45, uk: 10, us: 11 },
                { cm: 28.3, ue: 45.5, uk: 10.5, us: 11.5 },
                { cm: 28.8, ue: 46, uk: 11, us: 12 }
            ],
            woomen: [
                { cm: 22, ue: 35.5, uk: 2.5, us: 5 },
                { cm: 22.4, ue: 36.3, uk: 5, us: 5 },
                { cm: 22.9, ue: 36.5, uk: 3.5, us: 6 },
                { cm: 23.3, ue: 37.5, uk: 4, us: 6.5 },
                { cm: 23.7, ue: 38, uk: 4.5, us: 7 },
                { cm: 24.1, ue: 38, uk: 5, us: 7.5 },
                { cm: 24.5, ue: 39, uk: 5.5, us: 8 },
                { cm: 25, ue: 40, uk: 6, us: 8.5 },
                { cm: 25.4, ue: 40.5, uk: 6.5, us: 9 },
                { cm: 25.8, ue: 41, uk: 7, us: 9.5 },
                { cm: 26.2, ue: 42, uk: 7.5, us: 10 },
                { cm: 26.7, ue: 42.5, uk: 8, us: 10.5 },
                { cm: 27.1, ue: 43, uk: 8.5, us: 11 },
                { cm: 27.5, ue: 44, uk: 9, us: 11.5 },
                { cm: 27.9, ue: 44.5, uk: 9.5, us: 12 }
            ]
        };
        this.choosedGender = name;
        this.sizes = sizes[name];
    }

    public clearAll() {
        const allRows = document.getElementsByClassName('table-row');
        const header = document.getElementsByClassName('nike-cq-table-header');
        for (let i = 0; i < allRows.length; i++) {
            const row = allRows[i];
            for (let j = 0; j < row.children.length; j++) {
                row.children[j].classList.remove('highlight-orange-light');
            }
        }
        for (let i = 0; i < 4; i++) {
            header[0].children[i].classList.remove('highlight-orange-dark');
        }
    }
}
