import {Component, OnInit, Input, ViewChild, ViewContainerRef, Output, EventEmitter} from '@angular/core';
import {Order as IOrder} from '../../../../shared/interfaces/order/order';
import {UtilsService} from '../../../../shared/services/utils/utils.service';
import {OrderStatus} from '../../../../../shared/interfaces/order-status';
import {OrderService} from '../../../../shared/services/order/order.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-manage-order-row',
    templateUrl: './manage-order-row.component.html',
    styleUrls: ['./manage-order-row.component.scss']
})
export class ManageOrderRowComponent implements OnInit {
    private subscription = new Subscription();
    public orderStatus: any;
    public editingMode: boolean = false;
    public availableOrderStatues: string[];
    @ViewChild('orderRowTemplate', {static: true}) template;
    @Input('order') order: IOrder;
    @Output('statusChanged') changeStatus = new EventEmitter();

    constructor(
        private router: Router,
        private utilsService: UtilsService,
        private viewContainerRef: ViewContainerRef,
        private orderService: OrderService) {}

    ngOnInit(): void {
        this.viewContainerRef.createEmbeddedView(this.template);
        this.orderStatus = this.order.orderStatus;
        this.availableOrderStatues = this.getAvailableStatuses(this.order.orderStatus);
    }

    public changeMode() {
        this.editingMode = !this.editingMode;
        this.orderStatus = this.order.orderStatus;
    }

    public changeOrderStatus() {
        this.subscription.add(this.orderService.updateOrderStatus(this.order._id, this.orderStatus).subscribe({
            next: () => {
                this.changeStatus.emit();
                this.subscription.unsubscribe();
            },
            error: () => {
                this.changeMode();
            }
        }));
    }

    public showOrderPage() {
        const url = this.router.serializeUrl(this.router.createUrlTree(['/orders', this.order._id]));
        window.open(url, '_blank');
    }

    private getAvailableStatuses(status: OrderStatus) {
        const orderStatus = Number(OrderStatus[status]);
        const statuses = [];
        switch (orderStatus) {
            case 0: {
                statuses.push(OrderStatus[1]);
                break;
            }
            case 1: {
                statuses.push(OrderStatus[2]);
                break;
            }
            case 2: {
                statuses.push(OrderStatus[3]);
                break;
            }
        }
        return statuses;
    }

    public formatDate(date) {
        return this.utilsService.formatDate(date);
    }

    public getOrderColor(orderStatus: OrderStatus): string {
        return this.utilsService.getOrderStatusColorByName(orderStatus);
    }
}
