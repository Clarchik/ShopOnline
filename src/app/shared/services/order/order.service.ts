import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {OrderDTO} from '../../models/order-dto/order-dto';
import {Order} from '../../interfaces/order/order';
import {Pager} from '../../interfaces/pager/pager';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }


    public saveOrder(order: OrderDTO): Observable<any> {
        return this.http.post(`${environment.apiPath}/api/saveorder`, order);
    }

    public getUserOrders(): Observable<any> {
        return this.http.get(`${environment.apiPath}/api/getUserOrders`);
    }

    public getAllUsersOrders(filters?): Observable<{pager: Pager, orders: Order[]}> {
        return this.http.get<{pager: Pager, orders: Order[]}>(`${environment.apiPath}/api/getAllUsersOrders`, {params: filters});
    }

    public updateOrderStatus(orderId: string, orderStatus: string): Observable<any> {
        return this.http.post(`${environment.apiPath}/api/updateOrderStatus`, {orderId, orderStatus});
    }

    public getOrderDetails(id: string): Observable<any> {
        return this.http.get(`${environment.apiPath}/api/getOrderDetails?id=${id}`);
    }

    public getStateByCountryId(id: number): Observable<any> {
        return this.http.get(`${environment.apiPath}/api/getCountryState?id=${id}`);
    }

    public getCitiesByState(countryId: number, stateName: string): Observable<any> {
        return this.http.get(`${environment.apiPath}/api/getStateCities?id=${countryId}&name=${stateName}`);
    }
}
