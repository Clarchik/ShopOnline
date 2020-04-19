import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Order} from '../../shared/interfaces/order/order';
import {UtilsService} from '../../shared/services/utils/utils.service';
import {OrderStatus} from '../../../shared/interfaces/order-status';

@Component({
    selector: 'app-user-orders',
    templateUrl: './user-orders.component.html',
    styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
    public userOrders: Order[];
    constructor(private route: ActivatedRoute, private us: UtilsService) {}

    ngOnInit() {
        const { orders } = this.route.snapshot.data;
        this.userOrders = orders;
    }

    public getOrderColor(orderStatus: OrderStatus): string {
        return this.us.getOrderStatusColorByName(orderStatus);
    }

}
