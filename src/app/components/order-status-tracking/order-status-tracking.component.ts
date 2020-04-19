import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import {interval} from 'rxjs';
import {takeWhile, startWith} from 'rxjs/operators';
import {OrderStatus} from '../../../shared/interfaces/order-status';
import {isNumber} from 'lodash';
import {Step} from '../../shared/interfaces/step/step';

@Component({
    selector: 'app-order-status-tracking',
    templateUrl: './order-status-tracking.component.html',
    styleUrls: ['./order-status-tracking.component.scss']
})
export class OrderStatusTrackingComponent implements OnInit, AfterViewInit {
    @Input() orderStatus: OrderStatus;
    private _currentStep: number = 0;
    private _finalStep: number;
    public steps: Array<Step> = [];

    constructor() {
        this.initSteps();
    }

    ngOnInit(): void {
        const finalStep = Number(OrderStatus[this.orderStatus]);
        this._finalStep =  isNumber(finalStep) ? finalStep : -1;
    }

    private initSteps() {
        this.steps.push({icon: 'fas fa-file-alt', description: 'Order.received'});
        this.steps.push({icon: 'fas fa-box', description: 'Order.proccessing'});
        this.steps.push({icon: 'fas fa-truck', description: 'Order.shipped'});
        this.steps.push({icon: 'fas fa-check', description: 'Order.complete'});
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.startHighlitingSteps();
        }, 1000);

    }

    private startHighlitingSteps() {
        const allSteps = document.querySelectorAll('.order-step');
        if (this._finalStep >= 0) {
            interval(4000).pipe(
                startWith(0),
                takeWhile(() => this._currentStep !== this._finalStep, true)
            ).subscribe(() => {
                if (allSteps[this._currentStep]) {
                    allSteps[this._currentStep].classList.add('order-step__completed');
                }
                this._currentStep++;
            });
        }
    }

}
