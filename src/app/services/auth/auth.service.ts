import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
// import {auth} from 'firebase/app';
// import {User} from 'firebase';
import { switchMap} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';

import * as firebase from 'firebase';

@Injectable({providedIn: 'root'})
export class AuthService {

  public user$: Observable<User>;
  public userData$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
     

      this.userData$ = afAuth.authState;

      this.user$ = this.afAuth.authState.pipe(
        switchMap( user => {

          if(user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          }
          return of(null);
        })
      )
  }

  async resetPassword(email: string): Promise<void>{
    try {
      return this.afAuth.auth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error)
    }
  }
  async sendVerificationEmail(): Promise<void>{
      return (await this.afAuth.auth.currentUser).sendEmailVerification();
  }

  async login(email:string, password: string): Promise<User>{
    try {
      
      const {user} = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      if (user)
        {
          localStorage.setItem('email', user.email)
        }
      this.updateUserData(user);
      return user;

    } catch (error) {
      console.log('Login error', error)
    }
  }

  async register(email: string, password: string): Promise<User>{
    try {
      
      const {user} = await this.afAuth.auth.createUserWithEmailAndPassword(
        email, 
        password
      );
     await this.sendVerificationEmail();
      return user;

    } catch (error) {
      console.log('Register error', error)
    }
  }

  async logout():Promise<void>{

    try {
        await this.afAuth.auth.signOut();
        localStorage.removeItem('email');
    } catch (error) {
      console.log('Logout', error)
    }

  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,     
     
    };

    return userRef.set(data, { merge: true });
  }

  async currentUser(){
    try {
      const responseCurrent = this.afAuth.auth.currentUser;
      return responseCurrent;
    } catch (error) {
      console.log(error)
    }
  }

  saveProfileUser(user: User) {
   this.afAuth.auth.currentUser.updateProfile({
     displayName: user.displayName,
     photoURL: user.photoURL
   }).then(()=> console.log('actualizado'))
   .catch(err => console.log(err));
  }
}
