import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { SESSION } from '../../models/session/session';
import { UtilsService } from '../utils/utils.service';
import { UserData } from '../../models/user/user-data';
import { UserPasswords } from '../../models/user/user-passwords';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private http: HttpClient,
        private utilsService: UtilsService) { }

    public signInFromSession() {
        return this.http.get(`${environment.apiPath}/api/users/login/session`);
    }

    public signInWithEmailAndPassword(email: string, password: string): Observable<any> {
        return this.http.post(`${environment.apiPath}/api/users/login`, { email, password }, { observe: 'response' }).pipe(
            tap((response: HttpResponse<any>) => {
                const id = response.body._id;
                const accessToken = response.headers.get(SESSION['x-access-token']);
                const refreshToken = response.headers.get(SESSION['x-refresh-token']);
                this.utilsService.setSession(id, accessToken, refreshToken);
            }),
            map((response) => response.body)
        );
    }

    public signUpUser(email: string, password: string, name: string, surname: string): Observable<any> {
        return this.http.post(`${environment.apiPath}/api/users`, { email, password, name, surname });
    }

    public chekUserEmail(email: string): Observable<any> {
        return this.http.post(`${environment.apiPath}/api/users/login/exists`, { email });
    }

    public updateUserData(userData: UserData): Observable<any> {
        const { name, surname, email } = userData;
        return this.http.put(`${environment.apiPath}/api/users/update/${userData._id}`, { name, surname, email });
    }

    public updateUserPasswords(userPasswords: UserPasswords, id: string): Observable<any> {
        return this.http.put(`${environment.apiPath}/api/users/updatePassword/${id}`, userPasswords);
    }

    public logoutUser() {
        localStorage.removeItem(SESSION['x-access-token']);
    }
}
