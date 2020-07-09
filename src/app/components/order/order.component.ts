import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { OrderService } from '../../shared/services/order/order.service';
import { ShopState, CartActions } from '../../store';
import { Store } from '@ngrx/store';
import { CartProduct } from '../../shared/models/cart-product/cart-product';
import { ToastrService } from 'ngx-toastr';
import { map, startWith, tap, debounceTime, distinctUntilChanged, delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, pipe } from 'rxjs';
import * as _ from 'lodash';
import { CountryValidator } from '../../shared/validators/country-validator/country.validator';
import { Country } from '../../shared/interfaces/country/country';
import { OrderDTO } from '../../shared/models/order-dto/order-dto';
import { CountryService } from '../../shared/services/countries/country.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
    private products: CartProduct[];

    public orderForm: FormGroup;
    public controls;

    public countries: Country[] = [];
    public states: Array<string> = [];
    public cities: Array<string> = [];

    public filteredCountries: Observable<Country[]>;
    public filteredStates: Observable<string[]>;
    public filteredCities: Observable<string[]>;

    public selectedCountry: any;
    public selectedState: any;
    public selectedCity: any;

    constructor(
        private fb: FormBuilder,
        private orderSerivce: OrderService,
        private countryService: CountryService,
        private store: Store<ShopState>,
        private toastr: ToastrService,
        private route: ActivatedRoute) {
        this.countries = this.route.snapshot.data.countries;
        this.products = this.route.snapshot.data.products;
    }

    ngOnInit() {
        this.orderForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            country: ['', Validators.required],
            name: ['', Validators.required],
            surname: ['', Validators.required],
            state: [''],
            city: [''],
            address: ['', Validators.required],
            phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(12)]],
            index: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
        }, {
            validators: CountryValidator.mustInclude('country', _.map(this.countries, (country) => country.name))
        });
        this.controls = {
            email: this.orderForm.get('email'),
            name: this.orderForm.get('name'),
            surname: this.orderForm.get('surname'),
            country: this.orderForm.get('country'),
            state: this.orderForm.get('state'),
            city: this.orderForm.get('city'),
            address: this.orderForm.get('address'),
            phone: this.orderForm.get('phone'),
            index: this.orderForm.get('index')
        };
        this._onCountryChange();
        this._onStateChange();
        this._onCityChange();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public placeOrder() {
        const orderDTO = new OrderDTO(this.orderForm.value, this.products);
        this.orderSerivce.saveOrder(orderDTO).subscribe({
            next: () => {
                this.toastr.success('Your order have been saved', 'Success');
                this.orderForm.reset();
                this.store.dispatch(new CartActions.ClearProducts('saved-order'));
            },
            error: () => {
                this.toastr.error('Your order have not been saved', 'Error');
            }
        });
    }

    private _onCountryChange() {
        this.filteredCountries = this.controls.country.valueChanges.pipe(
            this.commonPipeableOperators(),
            tap(() => this.resetStateAndCityFields('both')),
            map(() => {
                const countryId = this.findCountryIdByName(this.selectedCountry);
                if (this.selectedCountry && countryId) {
                    this._findStatesByCountryId(countryId);
                }
                return this.selectedCountry ? this._filterData(this.selectedCountry, 'countries') : this.countries.slice();
            }),
        );
    }

    private _onStateChange() {
        this.filteredStates = this.controls.state.valueChanges.pipe(
            this.commonPipeableOperators(),
            map(() => {
                const stateName = this.selectedState;
                this._checkFieldAndSetErrors('state', stateName);
                if (this.controls.state.valid && !this.controls.state.errors) {
                    this._findCitiesByStateNameAndCountryId(stateName);
                }
                return stateName ? this._filterData(stateName, 'states') : this.states.slice();
            }),
        );
    }

    private _onCityChange() {
        this.filteredCities = this.controls.city.valueChanges.pipe(
            this.commonPipeableOperators(),
            map(() => {
                const cityName = this.selectedCity;
                this._checkFieldAndSetErrors('city', cityName);
                return cityName ? this._filterData(cityName, 'cities') : this.cities.slice();
            })
        );
    }

    private findCountryIdByName(name: string): number {
        const foundCountry = this.countries.find((country) => country.name === name);
        return foundCountry ? foundCountry.id : null;
    }

    private _checkFieldAndSetErrors(field: string, fieldValue: string) {
        switch (field) {
            case 'state':
                const isStateCorrect = !!this.states.find((state) => state === fieldValue);
                if (isStateCorrect) {
                    this.controls.state.setErrors(null);
                } else {
                    this.controls.state.setErrors({ notInclude: true });
                    this.resetStateAndCityFields('city');
                }
                break;
            case 'city':
                const isCityCorrect = !!this.cities.find((city) => city === fieldValue);
                isCityCorrect ? this.controls.city.setErrors(null) : this.controls.city.setErrors({ notInclude: true });
                break;
        }
    }

    private _findStatesByCountryId(id) {
        this.subscription.add(this.countryService.getStateByCountryId(id).subscribe({
            next: (states) => {
                this.states = states;
            }
        }));
    }

    private _findCitiesByStateNameAndCountryId(stateName: string) {
        const countryId = this.findCountryIdByName(this.selectedCountry);
        this.subscription.add(this.countryService.getCitiesByState(countryId, stateName).subscribe({
            next: (cities) => {
                this.cities = cities;
            }
        }));
    }

    private _filterData(value: string, action: string): Array<any> {
        const filterValue = value.toLowerCase();
        switch (action) {
            case 'countries': {
                return this.countries.filter((country) => country.name.toLowerCase().indexOf(filterValue) === 0);
            }
            case 'states': {
                return this.states.filter((state) => state.toLowerCase().indexOf(filterValue) === 0);
            }
            case 'cities': {
                return this.cities.filter((city) => city.toLowerCase().indexOf(filterValue) === 0);
            }
        }
    }

    private resetStateAndCityFields(field: string) {
        switch (field) {
            case 'both':
                this.states = [];
                this.cities = [];
                this.controls.state.reset();
                this.controls.city.reset();
                this.controls.state.clearValidators();
                this.controls.city.clearValidators();
                break;
            case 'city':
                this.cities = [];
                this.controls.city.reset();
                this.controls.city.clearValidators();
        }
    }

    private commonPipeableOperators = () => pipe(startWith(''), distinctUntilChanged(), debounceTime(750));
}
