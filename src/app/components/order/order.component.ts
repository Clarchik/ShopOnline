import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../shared/models/order/order';
import { OrderService } from '../../shared/services/order/order.service';
import { ShopState, CartSelectors, UserSelectors, CartActions } from '../../store';
import { Store } from '@ngrx/store';
import { CartProduct } from '../../shared/models/cart-product/cart-product';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    public orderForm: FormGroup;
    public items: CartProduct[];
    public userId: string;
    constructor(
        private fb: FormBuilder,
        private orderSerivce: OrderService,
        private store: Store<ShopState>,
        private toastr: ToastrService,
        private router: Router) { }

    ngOnInit() {
        this.orderForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            fio: ['', Validators.required],
            city: ['', Validators.required],
            index: ['', Validators.required]
        });

        this.store.select(CartSelectors.getCartItemsAsArray).subscribe((items) => {
            this.items = items;
        });
        this.store.select(UserSelectors.getUser).subscribe((user) => {
            this.userId = user._id;
        });
    }

    public placeOrder() {
        const email = this.email.value;
        const fio = this.fio.value;
        const city = this.city.value;
        const index = this.index.value;
        const newOrder = new Order({ email, city, fio, index }, this.items, this.userId);


        this.orderSerivce.saveOrder(newOrder).subscribe({
            next: () => {
                this.toastr.success('Your order have been saved', 'Success');
                this.orderForm.reset();
                this.store.dispatch(new CartActions.ClearProducts());
                setTimeout(() => {
                    this.router.navigate(['/main']);
                }, 500);
            },
            error: () => {
                this.toastr.error('Your order have been not saved', 'Error');
            }
        });
    }


    get email() {
        return this.orderForm.controls['email'];
    }

    get fio() {
        return this.orderForm.controls['fio'];
    }

    get city() {
        return this.orderForm.controls['city'];
    }

    get index() {
        return this.orderForm.controls['index'];
    }

}
