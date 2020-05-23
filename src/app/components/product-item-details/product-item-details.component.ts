import {Component, OnInit, OnDestroy} from '@angular/core';
import {Product} from '../../../server/shared/interfaces/product';
import {ActivatedRoute} from '@angular/router';
import {switchMap, map} from 'rxjs/operators';
import {ProductsService} from '../../shared/services/products/products.service';
import {Store} from '@ngrx/store';

import {CartActions, ShopState} from '../../store';
import {CartProduct} from '../../shared/models/cart-product/cart-product';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-product-item-details',
    templateUrl: './product-item-details.component.html',
    styleUrls: ['./product-item-details.component.scss']
})
export class ProductItemDetailsComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    private animationEnd: boolean = true;
    private prevColor: string = '';
    private _product: Product;
    public selectedColor: string = '';
    public sizeChoice: number;
    public productQuantity: number = 1;
    public productMaxPosibleQuantity: number = 1;
    public productViewImage: string;
    constructor(
        private route: ActivatedRoute,
        private ps: ProductsService,
        private store: Store<ShopState>) {}

    ngOnInit() {
        document.documentElement.style.setProperty('--shoe-color', '#232323');
        this.subscription = this.route.params.pipe(
            map((params) => params.id),
            switchMap((id) => this.ps.getSingleProduct(id))
        ).subscribe((product: Product) => {
            this._product = product;
            this.productViewImage = this._product.mainImage;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    changeColor(colorObject) {
        const allColors = document.querySelectorAll('.color');
        if (!this.animationEnd) { return; }
        const gradients = document.querySelectorAll('.gradient');
        const color = colorObject.target.attributes.getNamedItem('color').value;
        const primary = colorObject.target.attributes.getNamedItem('primary').value;
        const gradient = document.querySelector(`.gradient[color="${color}"]`);
        const prevGradient = document.querySelector(`.gradient[color="${this.prevColor}"]`);

        if (color === this.prevColor) {return; }
        document.documentElement.style.setProperty('--shoe-color', primary);

        allColors.forEach((s) => s.classList.remove('active'));
        colorObject.target.classList.add('active');
        this.selectedColor = color;

        gradients.forEach((g) => g.classList.remove('first', 'second', 'hide'));
        if (prevGradient) {
            prevGradient.classList.add('second');
        }
        gradient.classList.add('first');

        this.prevColor = color;
        this.animationEnd = false;

        gradient.addEventListener('animationend', () => {
            this.animationEnd = true;
            const prevColor = document.querySelector('.gradient.second');
            if (prevColor) {
                prevColor.classList.add('hide');
            }
        });
    }

    public addToBag(product, size, quantity, selectedColor) {
        const productToAdd = new CartProduct(product, size, quantity, selectedColor);
        this.store.dispatch(new CartActions.AddProduct(productToAdd));
    }

    public sizeChanged(size: number) {
        this.productQuantity = 1;
        const choosenSizeQuantity = this._product.sizes.find((item) => item.size === size).quantity;
        this.productMaxPosibleQuantity = choosenSizeQuantity;
    }

    public changeProductView(url: string) {
        this.productViewImage = url;
    }

    public increaseQuantity() {
        this.productQuantity++;
    }

    public decreaseQuantity() {
        this.productQuantity--;
    }

    get product(): Product {
        return this._product;
    }
}
