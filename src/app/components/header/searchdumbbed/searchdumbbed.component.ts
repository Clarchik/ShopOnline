import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-searchdumbbed',
    templateUrl: './searchdumbbed.component.html',
    styleUrls: ['./searchdumbbed.component.scss']
})
export class SearchdumbbedComponent implements OnInit {

    constructor() { }
    @Input() findedShoes = [];
    @Input() searchStr = '';

    ngOnInit() {}

}
