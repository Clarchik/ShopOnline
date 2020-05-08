import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap, delay} from 'rxjs/operators';
import {OrderService} from '../../shared/services/order/order.service';
import {UtilsService} from '../../shared/services/utils/utils.service';

import {reduce} from 'lodash';
import {Order as IOrder} from '../../shared/interfaces/order/order';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
    public order$: Observable<IOrder>;
    constructor(
        private route: ActivatedRoute,
        private ordersService: OrderService,
        private utilsService: UtilsService) {}

    ngOnInit(): void {
        this.order$ = this.route.params.pipe(
            delay(1000),
            switchMap(({id}) => this.ordersService.getOrderDetails(id))
        );
    }

    formatDate(date: Date) {
        return this.utilsService.formatDate(date, true);
    }

    countTotalSum(order: IOrder) {
        return reduce(order.products, (sum, current) => sum + (current.price * current.quantity), 0);
    }
}
