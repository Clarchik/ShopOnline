import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../../shared/services/order/order.service';
import {Observable} from 'rxjs';
import {Order as IOrder} from '../../../../shared/interfaces/order/order';
import {delay, tap} from 'rxjs/operators';
import {OrderStatus} from '../../../../../shared/interfaces/order-status';
import {FormControl} from '@angular/forms';
import {Pager} from '../../../../shared/interfaces/pager/pager';

@Component({
    selector: 'app-manage-orders',
    templateUrl: './manage-orders.component.html',
    styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {
    public filterOrderStatus: OrderStatus = null;
    public filterDate = new FormControl();
    public filterOrderId = new FormControl();
    public filterPage: number = 1;

    public availableOrderStatues: Array<string>;
    public allOrders$: Observable<{pager: Pager, orders: IOrder[]}>;
    constructor(
        private orderService: OrderService) {
            this.availableOrderStatues = this.allOrderStatuses();
        }

    ngOnInit(): void {
        this.getOrders();
    }

    changedStatus() {
        this.getOrders();
    }

    applyFilters() {
        this.filterPage = 1;
        this.getOrders();
    }

    changePage(page) {
        this.filterPage = page;
        this.getOrders();
    }

    getOrders() {
        const filters = this.getFilters;
        this.allOrders$ = this.orderService.getAllUsersOrders(filters).pipe(delay(1000), tap((res) => console.log(res, 'res')));
    }

    private allOrderStatuses() {
        return [OrderStatus[0], OrderStatus[1], OrderStatus[2], OrderStatus[3]];
    }

    private get getFilters() {
        const createdAt =  this.filterDate.value ?  this.filterDate.value : null;
        const orderNumber = this.filterOrderId.value ? this.filterOrderId.value : null;
        const orderStatus = this.filterOrderStatus ? this.filterOrderStatus : null;
        const page = this.filterPage;
        return {createdAt, orderNumber, orderStatus, page};
    }
}
