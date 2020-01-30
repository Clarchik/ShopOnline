import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../models/order/order';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }


    public saveOrder(order: Order): Observable<any> {
        return this.http.post(`${environment.apiPath}/api/saveorder`, order);
    }

    public getUserOrders(): Observable<any> {
        return this.http.get(`${environment.apiPath}/api/getUserOrders`);
    }
}
