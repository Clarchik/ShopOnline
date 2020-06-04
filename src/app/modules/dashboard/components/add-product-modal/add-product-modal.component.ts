import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {Categories} from '../../../../shared/models/categories/categories';
import {ProductDTO} from '../../../../shared/models/product/product-dto';
import {ProductsService} from '../../../../shared/services/products/products.service';
import {Product} from '../../../../../server/shared/interfaces/product';
import {ToastrService} from 'ngx-toastr';
import {forEach} from 'lodash';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-add-product-modal',
    templateUrl: './add-product-modal.component.html',
    styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnDestroy {
    private subscription: Subscription = new Subscription();
    public isEditing: boolean;
    public addProductForm: FormGroup;
    public controls;

    constructor(
        private fb: FormBuilder,
        private productService: ProductsService,
        public dialogRef: MatDialogRef<AddProductModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Product,
        private toastr: ToastrService) {
        this.initProductForm();
        this.initControls();
        this.isEditing = !!this.data;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private initProductForm() {
        const values = this.createFormInitValues();
        this.addProductForm = this.fb.group({
            title: values.title,
            category: values.category,
            price: values.price,
            sale: values.sale,
            salePrice: [{value: values.salePrice, disabled: !!!values.salePrice}],
            colors: this.createFormColors(),
            sizes: this.createFormSizes(),
            slides: values.slides,
            mainImage: values.mainImage,
            gender: values.gender
        });
    }

    public createOrUpdateProduct() {
        const product = new ProductDTO(this.addProductForm.value);
        const updateOrEditProduct$ = this.isEditing ? this.productService.updateProductById(this.data._id, product) : this.productService.addSingleProduct(product);
        this.subscription.add(updateOrEditProduct$.subscribe({
            next: () => {
                if (this.isEditing) {
                    this.toastr.success('Successfully edited', 'Success');
                } else {
                    this.toastr.success('Successfully added', 'Success');
                }
                setTimeout(() => {
                    this.dialogRef.close(this.isEditing ? 'success-edit' : 'success-add');
                }, 1000);
            },
            error: (error) => {
                if (this.isEditing) {
                    this.toastr.error(error, 'Error');
                } else {
                    this.toastr.success(error, 'Error');
                }
            }
        }));
    }

    public saleChanged(sale) {
        if (sale) {
            this.controls.salePrice.enable();
            this.controls.salePrice.setValidators([Validators.required, Validators.pattern('^[0-9]*$')]);
        } else {
            this.controls.salePrice.disable();
        }
        this.controls.salePrice.setValue('');

    }

    public addFormRow(formControlName) {
        let rowObject = {};
        const colorNameValidators = [Validators.required, Validators.pattern('^[A-Za-z]+$')];
        const colorPrimaryValidators = [Validators.required, Validators.pattern('#[a-z]+')];
        switch (formControlName) {
            case 'colors': {
                rowObject = {
                    name: ['', colorNameValidators],
                    primary: ['', colorPrimaryValidators]
                };
                break;
            }
            case 'sizes': {
                rowObject = {
                    size: ['', [Validators.required]],
                    quantity: ['', [Validators.required]]
                };
                break;
            }
        }
        (this.addProductForm.controls[formControlName] as any).push(this.fb.group(rowObject));
    }

    public removeFormRow(formControlName, index) {
        (this.addProductForm.controls[formControlName] as any).removeAt(index);
    }

    public checkSalePrice(which) {
        const regularPrice = this.controls.price.value ? Number(this.controls.price.value) : null;
        const salePrice =  this.controls.salePrice.value ? Number(this.controls.salePrice.value) : null;
        const isOnSale = this.controls.sale;
        if ((isOnSale && salePrice !== null) && salePrice > regularPrice) {
            this.controls.salePrice.setErrors({greaterThanRegular: true});
        }
        if (which === 'price' && isOnSale && salePrice && salePrice < regularPrice) {
            this.controls.salePrice.setErrors(null);
        }
    }

    public get availableCategories() {
        return Categories;
    }

    public get availableGenders() {
        return ['male', 'female'];
    }

    public get saleOptions() {
        return [true, false];
    }

    private createFormInitValues(): {title, price, salePrice, sale, mainImage, gender, category, slides} {
        const values = {
            title: [this.data?.title ? this.data.title : null, [Validators.required]],
            category: [this.data?.category ? this.data.category : null, [Validators.required]],
            price: [this.data?.price ? this.data.price : null, [Validators.required, Validators.pattern('^[0-9]*$')]],
            salePrice: this.data?.salePrice ? this.data.salePrice : null,
            gender: [this.data?.gender ? this.data.gender : null, [Validators.required]],
            sale: [this.data?.sale ? this.data.sale : null, [Validators.required]],
            mainImage: [this.data?.mainImage ? this.data.mainImage : null, [Validators.required]],
            slides: this.createFormSlides()
        };
        return values;
    }

    private initControls() {
        this.controls = {
            title: this.addProductForm.get('title'),
            category: this.addProductForm.get('category'),
            price: this.addProductForm.get('price'),
            sale: this.addProductForm.get('sale'),
            salePrice: this.addProductForm.get('salePrice'),
            colors: this.addProductForm.get('colors'),
            sizes: this.addProductForm.get('sizes'),
            slides: this.addProductForm.get('slides'),
            mainImage: this.addProductForm.get('mainImage'),
            gender: this.addProductForm.get('gender')
        };
    }

    private createFormSlides(): FormArray {
        const slides = this.fb.array([]);
        for (let i = 0; i < 6; i++) {
            const imageUrl = this.data?.slides[i]?.imageUrl ? this.data?.slides[i].imageUrl : null;
            const object = this.fb.group({imageUrl: [imageUrl, Validators.required]});
            slides.push(object);
        }
        return slides;
    }

    private createFormColors(): FormArray {
        const formArray: FormArray = new FormArray([]);
        const colorNameValidators = [Validators.required, Validators.pattern('^[A-Za-z]+$')];
        const colorPrimaryValidators = [Validators.required, Validators.pattern('#[A-Za-z0-9]+')];
        if (this.data?.colors) {
            forEach(this.data.colors, (color) => {
                const formGroup = this.fb.group({
                    name: [color.name, colorNameValidators],
                    primary: [color.primary, colorPrimaryValidators]
                });
                formArray.push(formGroup);
            });
        } else {
            formArray.push(this.fb.group({name: [null, colorNameValidators], primary: [null, colorPrimaryValidators]}));
        }
        return formArray;
    }

    private createFormSizes(): FormArray {
        const formArray: FormArray = new FormArray([]);
        if (this.data?.sizes) {
            forEach(this.data.sizes, (size) => {
                const formGroup =  this.fb.group({
                    size: [size.size, [Validators.required, Validators.pattern('^[0-9]*$')]],
                    quantity: [size.quantity, [Validators.required, Validators.pattern('^[0-9]*$')]]
                });
                formArray.push(formGroup);
            });
        } else {
            formArray.push(
                this.fb.group({size: [null, [Validators.required, Validators.pattern('^[0-9]*$')]], quantity: [null, [Validators.required, Validators.pattern('^[0-9]*$')]]})
            );
        }
        return formArray;
    }

}
