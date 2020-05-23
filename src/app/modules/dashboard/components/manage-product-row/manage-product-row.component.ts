import {Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Product} from '../../../../../server/shared/interfaces/product';
import {AddProductModalComponent} from '../add-product-modal/add-product-modal.component';

@Component({
    selector: 'app-manage-product-row',
    templateUrl: './manage-product-row.component.html',
    styleUrls: ['./manage-product-row.component.scss']
})
export class ManageProductRowComponent implements OnInit {
    @Input('product') product: Product;
    @Output('productEdited') changeStatus = new EventEmitter();
    @ViewChild('productRowTemplate', { static: true }) template;

    constructor(
        private viewContainerRef: ViewContainerRef,
        public dialog: MatDialog) {}

    ngOnInit(): void {
        this.viewContainerRef.createEmbeddedView(this.template);
    }

    editProduct() {
        const dialog$ = this.dialog.open(AddProductModalComponent, {
            data: this.product,
            width: '900px',
            minHeight: '400px',
            maxHeight: '750px',
            position: {
                top: '100px'
            }
        });
        dialog$.afterClosed().subscribe({
            next: (value) => {
                if (value === 'success-edit') {
                    setTimeout(() => {
                        this.changeStatus.emit();
                    }, 500);
                }
            }
        });
    }

}
