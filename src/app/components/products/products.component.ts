import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, delay } from 'rxjs/operators';
import { ProductsService } from '../../shared/services/products/products.service';
import { Product } from '../../../server/shared/interfaces/product';
import { Observable, Subscription } from 'rxjs';
import {Pager} from '../../shared/interfaces/pager/pager';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();

    public allProducts$: Observable<{pager: Pager, products: Product[]}>;
    constructor(
        private route: ActivatedRoute,
        private productService: ProductsService) { }

    ngOnInit() {
        this.subscription.add(this.route.queryParams.pipe(
            map((params) => ({category: params.category, page: params.page, title: params.title}))
        ).subscribe({
            next: ({category, page, title}) => {
                this.allProducts$ = this.productService.getProducts(category, page, title).pipe(delay(2000));
            }
        }));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
