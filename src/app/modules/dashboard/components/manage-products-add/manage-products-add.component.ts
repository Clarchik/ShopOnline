import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddProductModalComponent} from '../add-product-modal/add-product-modal.component';

@Component({
    selector: 'app-manage-products-add',
    templateUrl: './manage-products-add.component.html',
    styleUrls: ['./manage-products-add.component.scss']
})
export class ManageProductsAddComponent {
    constructor(public dialog: MatDialog) {}

    public openAddProductModal() {
        this.dialog.open(AddProductModalComponent, {
            width: '900px',
            minHeight: '400px',
            maxHeight: '750px',
            position: {
                top: '100px'
            }
        });
    }
}
