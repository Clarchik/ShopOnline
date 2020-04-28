import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import {CountryService} from '../../shared/services/countries/country.service';

@Injectable({ providedIn: 'root' })
export class CountriesResolver implements Resolve<Observable<any>> {
    constructor(private countryService: CountryService) {}

    resolve(): Observable<any> {
        return this.countryService.getAllCountries();
    }
}
