import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {firestore} from 'firebase';




@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private afAuth: AngularFireAuth,
        private afStore: AngularFirestore) {}


    loginUserWithEmailAndPassword(email: string, password: string): Observable<firebase.auth.UserCredential> {
        return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
    }

    findUserDataByUid(uid: string): Observable<firestore.DocumentSnapshot> {
        const docRef = this.afStore.collection('users').doc(uid);
        return docRef.get();
    }

    get authState() {
        return this.afAuth.authState;
    }
}
