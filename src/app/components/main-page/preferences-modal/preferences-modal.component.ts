import {Component, OnInit} from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';

@Component({
    selector: 'app-preferences-modal',
    templateUrl: './preferences-modal.component.html',
    styleUrls: ['./preferences-modal.component.scss'],
})
export class PreferencesModalComponent implements OnInit {

    constructor(public modalRef: MDBModalRef) {}

    ngOnInit() {
    }

    closeModal() {
        this.modalRef.hide();
    }

}
