import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../../shared/services/products/products.service';
import {Observable} from 'rxjs';
import {Pager} from '../../../../shared/interfaces/pager/pager';
import {Product} from '../../../../../server/shared/interfaces/product';
import {delay} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-edit-products',
    templateUrl: './edit-products.component.html',
    styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent implements OnInit {
    public filterPrice = new FormControl();
    public filterCategory = new FormControl();
    public filterPage: number = 1;

    public allProducts$: Observable<{pager: Pager, products: Product[]}>;
    constructor(private productService: ProductsService) {}

    ngOnInit(): void {
        this.getProducts();
    }

    public getProducts() {
        const filters = this.getFilters;
        this.allProducts$ = this.productService.getProductsToEdit(filters).pipe(delay(3000));
    }

    changePage(page) {
        this.filterPage = page;
        this.getProducts();
    }

    productEdited() {
        this.getProducts();
    }

    applyFilters() {
        this.filterPage = 1;
        this.getProducts();
    }

    private get getFilters() {
        const price =  this.filterPrice.value ?  this.filterPrice.value : null;
        const category = this.filterCategory.value ? this.filterCategory.value : null;
        const page = this.filterPage;
        return {price, category, page};
    }

}
