import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {OrderDTO} from '../../models/order-dto/order-dto';

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

    public getOrderDetails(id: string): Observable<any> {
        return this.http.get(`${environment.apiPath}/api/getOrderDetails?id=${id}`);
    }

    public getStateByCountryId(id: number): Observable<any> {
        return this.http.get(`${environment.apiPath}/api/getCountryState?id=${id}`)
    }

    public getCitiesByState(countryId: number, stateName: string): Observable<any> {
        return this.http.get(`${environment.apiPath}/api/getStateCities?id=${countryId}&name=${stateName}`);
    }
}
