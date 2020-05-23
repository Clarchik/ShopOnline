import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../../server/shared/interfaces/product';
import { environment } from '../../../../environments/environment';
import {Pager} from '../../interfaces/pager/pager';
import {ProductDTO} from '../../models/product/product-dto';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }


    public getProducts(category: string = 'all', page: number = 1, title: string = ''): Observable<{ pager: Pager, products: Product[] }> {
        return this.http.get<{ pager: Pager, products: Product[] }>(`${environment.apiPath}/api/products?category=${category}&page=${page}&title=${title}`);
    }

    public getSingleProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${environment.apiPath}/api/products/${id}`);
    }

    public addSingleProduct(product: ProductDTO) {
        return this.http.post(`${environment.apiPath}/api/addProduct`, {product});
    }

    public getProductsToEdit(): Observable<{ pager: Pager, products: Product[] }> {
        return this.http.get<{ pager: Pager, products: Product[] }>(`${environment.apiPath}/api/productsForEdit`);
    }

    public updateProductById(id: string, product: ProductDTO): Observable<any> {
        return this.http.post(`${environment.apiPath}/api/updateProduct?id=${id}`, {product});
    }
}
