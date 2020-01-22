import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/interfaces/product/product';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }


    public getProducts(category: string, page: number = 1, title: string = ''): Observable<{ pager: any, items: Product[] }> {
        return this.http.get<{ pager: any, items: Product[] }>(`/api/products?category=${category}&page=${page}&title=${title}`);
    }

    public getSingleProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`/api/products/${id}`);
    }
}
