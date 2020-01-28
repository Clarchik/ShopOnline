import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from '../../shared/services/order/order.service';

@Injectable()
export class UserOrdersResolver implements Resolve<Observable<any>> {
    constructor(private orderService: OrderService) { }

    resolve(): Observable<any> {
        return this.orderService.getUserOrders();
    }
}
