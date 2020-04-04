import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class NewsSellerService {
    constructor(private httpClient: HttpClient) {}

    public subscribeOnNews(email: string): Observable<any> {
        return this.httpClient.post(`${environment.apiPath}/api/news`, {email});
    }
}
