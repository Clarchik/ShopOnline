import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../shared/models/order/order';
import { UserOrder } from '../../shared/interfaces/user-order/user-order';

@Component({
    selector: 'app-user-orders',
    templateUrl: './user-orders.component.html',
    styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
    userOrders: UserOrder[];
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        const { orders } = this.route.snapshot.data;
        this.userOrders = orders;
    }

}
