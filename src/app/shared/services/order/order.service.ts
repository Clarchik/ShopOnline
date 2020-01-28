import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../models/order/order';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }


    public saveOrder(order: Order): Observable<any> {
        return this.http.post('/api/saveorder', order);
    }

    public getUserOrders(): Observable<any> {
        return this.http.get('/api/getUserOrders');
    }
}
