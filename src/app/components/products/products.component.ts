import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, map, switchMap } from 'rxjs/operators';
import { ProductsService } from '../services/products/products.service';
import { Product } from '../../shared/interfaces/product/product';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    private _products: Product[] = [];
    public _category: string;
    private _pager: any;
    private _emptyProducts: boolean = false;
    constructor(
        private route: ActivatedRoute,
        private ps: ProductsService) { }

    ngOnInit() {
        this.route.queryParams.pipe(
            map((params) => ({ category: params.category, page: params.page })),
            switchMap(({ category, page }) => {
                this._category = category;
                return this.ps.getProducts(category, page);
            }),
            tap((data) => {
                if (!data.items.length) {
                    this._emptyProducts = true;
                }
                this._products = data.items;
                console.log(this._products);
                this._pager = data.pager;
            })
        ).subscribe();
    }

    public loadPage(page: number) {
        this.ps.getProducts(this._category, page).subscribe((data: any) => {
            this._pager = data.pager;
            this._products = data.items;
        });
    }

    public get products() {
        return this._products;
    }

    public get pager() {
        return this._pager;
    }

    public get emptyProducts(): boolean {
        return this._emptyProducts;
    }
}
