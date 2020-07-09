import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    constructor(private http: HttpClient) { }


    public getAllCountries(): Observable<any> {
        return this.http.get(`${environment.apiPath}/api/getCountries`);
    }

    public getStateByCountryId(id: number): Observable<any> {
        return this.http.get(`${environment.apiPath}/api/getCountryState?id=${id}`);
    }

    public getCitiesByState(countryId: number, stateName: string): Observable<any> {
        return this.http.get(`${environment.apiPath}/api/getStateCities?id=${countryId}&name=${stateName}`);
    }
}
