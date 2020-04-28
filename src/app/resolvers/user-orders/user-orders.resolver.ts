import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from '../../shared/services/order/order.service';
import {Order} from '../../shared/interfaces/order/order';

@Injectable()
export class UserOrdersResolver implements Resolve<Observable<Order[]>> {
    constructor(private orderService: OrderService) { }

    resolve(): Observable<Order[]> {
        return this.orderService.getUserOrders();
    }
}
