import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, map, switchMap } from 'rxjs/operators';
import { ProductsService } from '../services/products/products.service';
import { Product } from '../../shared/interfaces/product/product';
import { Store } from '@ngrx/store';
import { ShopState } from '../../store';
import { Observable } from 'rxjs';
import { notLoadingStatus } from '../../store/selectors/loader.selectors';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
    private _products: Product[] = [];
    public _category: string;
    private _pager: any;
    private _emptyProducts: boolean = false;
    public isNotLoading: Observable<boolean>;
    constructor(
        private route: ActivatedRoute,
        private ps: ProductsService,
        private store: Store<ShopState>) { }

    ngOnInit() {
        this.route.queryParams.pipe(
            map((params) => ({ category: params.category, page: params.page, title: params.title })),
            switchMap(({ category, page, title }) => {
                this._category = category;
                return this.ps.getProducts(category, page, title);
            }),
            tap((data: any) => {
                this._emptyProducts = !data.items;
                this._products = data.items;
                this._pager = data.pager;
            })
        ).subscribe();

        this.isNotLoading = this.store.select(notLoadingStatus);
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

    public ngOnDestroy() {
    }
}
