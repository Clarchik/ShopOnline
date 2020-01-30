import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/interfaces/product/product';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }


    public getProducts(category: string = 'all', page: number = 1, title: string = ''): Observable<{ pager: any, items: Product[] }> {
        return this.http.get<{ pager: any, items: Product[] }>(`${environment.apiPath}/api/products?category=${category}&page=${page}&title=${title}`);
    }

    public getSingleProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${environment.apiPath}/api/products/${id}`);
    }
}
