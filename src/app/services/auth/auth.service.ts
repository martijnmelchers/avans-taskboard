import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { ScrumUser } from '../../models/ScrumUser';
import { Observable } from 'rxjs';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  users$: Observable<ScrumUser[]>;

  constructor(private _afAuth: AngularFireAuth, private _firestore: FirestoreService) {
    this._afAuth.authState.subscribe(this.onAuthStateChange);
    this.users$ = this._firestore.colWithIds$<ScrumUser>('users');
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  public getUser(): User {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  public async logout() {
    return await this._afAuth.signOut();
  }

  public async doRegister(value) {
    const userCredential = await this._afAuth.createUserWithEmailAndPassword(value.email, value.password);
    return this._firestore.col('users').doc<ScrumUser>(userCredential.user.uid).set({
      email: userCredential.user.email
    });
  }

  public async authenticate(value) {
    return await this._afAuth.signInWithEmailAndPassword(value.email, value.password);
  }

  public getUserByEmail(email: string): Promise<ScrumUser> {
    return new Promise<ScrumUser>((resolve, reject) => {
      const sub = this.users$.subscribe((users) => {
        sub.unsubscribe();
        resolve(users.find((usr) => usr.email === email));
      });
    });
  }

  // Called When logged in/logged out
  private onAuthStateChange(user: User) {
    if (user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(this.user));
    } else {
      localStorage.setItem('user', null);
    }
  }
}
