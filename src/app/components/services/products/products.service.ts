import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/interfaces/product/product';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }


    public getProducts(category: string, page: number = 1): Observable<{ pager: any, items: Product[] }> {
        return this.http.get<{ pager: any, items: Product[] }>(`http://localhost:3000/products?category=${category}&page=${page}`);
    }

    public getSingleProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`http://localhost:3000/products/${id}`);
    }
}
