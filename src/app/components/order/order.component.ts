import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../shared/models/order/order';
import { OrderService } from '../../shared/services/order/order.service';
import { ShopState, CartSelectors, UserSelectors, CartActions } from '../../store';
import { Store } from '@ngrx/store';
import { CartProduct } from '../../shared/models/cart-product/cart-product';
import { ToastrService } from 'ngx-toastr';
import { finalize, switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { ShippingAddress } from '../../shared/models/shipping/shipping';
import { User } from '../../shared/interfaces/user/user';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    public orderForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private orderSerivce: OrderService,
        private store: Store<ShopState>,
        private toastr: ToastrService,
        private router: Router) { }

    ngOnInit() {
        this.orderForm = this.fb.group({
            city: ['', Validators.required],
            address: ['', Validators.required],
            index: ['', Validators.required]
        });
    }

    public placeOrder() {
        const { city, address, index } = this.orderForm.controls;
        const shippingAddress = new ShippingAddress(
            {
                city: city.value,
                address: address.value,
                index: index.value
            });
        combineLatest([
            this.store.select(CartSelectors.getCartItemsAsArray),
        ]).pipe(
            map(([products]: [CartProduct[]]) => this.getOrderObject(shippingAddress, products)),
            switchMap((order: Order) => this.orderSerivce.saveOrder(order))
        ).subscribe({
            next: () => {
                this.toastr.success('Your order have been saved', 'Success');
                // this.orderForm.reset();
                // this.store.dispatch(new CartActions.ClearProducts());
                // setTimeout(() => {
                //     this.router.navigate(['/main']);
                // }, 1000);
            },
            error: () => {
                this.toastr.error('Your order have not been saved', 'Error');
            }
        });
    }


    private getOrderObject(shippingAddress: ShippingAddress, products: CartProduct[]): Order {
        return new Order(shippingAddress, products);
    }

    get address() {
        return this.orderForm.controls['address'];
    }

    get city() {
        return this.orderForm.controls['city'];
    }

    get index() {
        return this.orderForm.controls['index'];
    }

}
