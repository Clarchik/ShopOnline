import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { SESSION } from '../../models/session/session';
import { UtilsService } from '../utils/utils.service';
import { UserData } from '../../models/user/user-data';




@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient, private utilsService: UtilsService) { }

    public signInFromSession() {
        return this.http.get('http://localhost:3000/users/login/session');
    }

    public signInWithEmailAndPassword(email: string, password: string): Observable<any> {
        return this.http.post('http://localhost:3000/users/login', { email, password }, { observe: 'response' }).pipe(
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
        return this.http.post('http://localhost:3000/users', { email, password, name, surname });
    }

    public chekUserEmail(email: string): Observable<any> {
        return this.http.post('http://localhost:3000/users/login/exists', { email });
    }

    public updateUserData(userData: UserData): Observable<any> {
        const { name, surname, email } = userData;
        return this.http.put(`http://localhost:3000/users/update/${userData._id}`, { name, surname, email });
    }
}
