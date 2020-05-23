import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UtilsService } from '../shared/services/utils/utils.service';
import { ShopState } from '../store';
import { Store } from '@ngrx/store';
import { ShowLoader, HideLoader } from '../store/actions/loader.actions';
import { finalize, tap, catchError } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor {

    constructor(
        private utilsService: UtilsService,
        private store: Store<ShopState>,
        private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const newRequest = this.addAuthHeader(request);

        this.store.dispatch(new ShowLoader());

        return next.handle(newRequest).pipe(
            catchError((event) => {
                if (event instanceof HttpErrorResponse) {
                    this.handleErrorStatus(event.status);
                    return throwError(event);
                }
                return event;
            }),
            finalize(() => this.store.dispatch(new HideLoader()))
        );
    }

    private addAuthHeader(request: HttpRequest<any>) {
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

    private handleErrorStatus(statusNumber: number) {
        switch (statusNumber) {
            case 403: {
                this.router.navigate(['/403']);
                break;
            }
            case 404: {
                this.router.navigate(['/404']);
                break;
            }
            case 500: {
                this.router.navigate(['/500']);
                break;
            }
        }
    }

}
