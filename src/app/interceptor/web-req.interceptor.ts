import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { UtilsService } from '../shared/services/utils/utils.service';

@Injectable({
    providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor {

    constructor(private utilsService: UtilsService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const newRequest = this.addAuthHeader(request);
        return next.handle(newRequest);
    }

    addAuthHeader(request: HttpRequest<any>) {
        const accessToken = this.utilsService.getAccessToken();
        const refreshToken = this.utilsService.getRefreshToken();
        const userId = this.utilsService.getUserId();
        const requestObject: any = {};

        if (userId) {
            requestObject._id = userId;
        }

        if (refreshToken) {
            requestObject['x-refresh-token'] = refreshToken;
        }

        if (accessToken) {
            requestObject['x-access-token'] = accessToken;
        }


        return request.clone({
            setHeaders: requestObject
        });
    }

}
