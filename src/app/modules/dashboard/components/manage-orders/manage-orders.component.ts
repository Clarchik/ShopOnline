import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../../shared/services/order/order.service';
import {Observable} from 'rxjs';
import {Order as IOrder} from '../../../../shared/interfaces/order/order';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-manage-orders',
    templateUrl: './manage-orders.component.html',
    styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {

    public allOrders$: Observable<IOrder[]>;
    constructor(
        private orderService: OrderService) {}

    ngOnInit(): void {
        this.allOrders$ = this.orderService.getAllUsersOrders().pipe(delay(1000));
    }

    changedStatus() {
        this.allOrders$ = this.orderService.getAllUsersOrders().pipe(delay(1000));
    }
}
