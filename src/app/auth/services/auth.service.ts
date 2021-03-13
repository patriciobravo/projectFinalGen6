import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
// import {auth} from 'firebase/app';
// import {User} from 'firebase';
import { switchMap} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { RoleValidator } from '../helpers/roleValidator';

@Injectable({providedIn: 'root'})
export class AuthService  extends RoleValidator{

  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
      super();
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
      role: 'ADMIN',
    };

    return userRef.set(data, { merge: true });
  }

}