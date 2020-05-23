import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../../shared/services/products/products.service';
import {Observable} from 'rxjs';
import {Pager} from '../../../../shared/interfaces/pager/pager';
import {Product} from '../../../../../server/shared/interfaces/product';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-edit-products',
    templateUrl: './edit-products.component.html',
    styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent implements OnInit {
    public allProducts$: Observable<{pager: Pager, products: Product[]}>;
    constructor(private productService: ProductsService) {}

    ngOnInit(): void {
        this.getProducts();
    }

    public getProducts() {
        this.allProducts$ = this.productService.getProductsToEdit().pipe(delay(3000));
    }

    changePage(page) {
        this.getProducts();
    }

    productEdited() {
        this.getProducts();
    }

}
