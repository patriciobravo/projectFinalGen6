import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
// import {auth} from 'firebase/app';
// import {User} from 'firebase';
import { finalize, switchMap} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { UserI } from 'src/app/shared/models/user.interface';

import  Swal  from 'sweetalert2';

import * as firebase from 'firebase';
import { FileI } from 'src/app/shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({providedIn: 'root'})
export class AuthService {

  public user$: Observable<UserI>;
  public userData$: Observable<firebase.User>;
  public cargando: any;

  private filePath: string;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore,  private storage: AngularFireStorage) {
     

      this.userData$ = afAuth.authState;

      this.user$ = this.afAuth.authState.pipe(
        switchMap( user => {

          if(user) {
            return this.afs.doc<UserI>(`users/${user.uid}`).valueChanges();
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

  async login(email:string, password: string): Promise<UserI>{
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

  async register(email: string, password: string): Promise<UserI>{
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

  private updateUserData(user: UserI) {
    const userRef: AngularFirestoreDocument<UserI> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: UserI = {
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

 
  loginByEmail(user: UserI){
    const { email, password} = user;
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
 
  }

  preSaveUserProfile(user: UserI, image?: FileI):void {
    this.cargando = true;
    if(image) {
      this.uploadImage(user, image);
    }
    else{
      this.saveProfileUser(user);
    }
  }

  // private saveProfileUser(user: UserI) {
  //  this.afAuth.auth.currentUser.updateProfile({
  //    displayName: user.displayName,
  //    photoURL: user.photoURL
  //  }).then(()=> {
  //   Swal.fire({
  //     title:'Muy Bien!',
  //     text: 'Perfil Actualizado',
  //     icon: 'success'
  //   });
  //  })
  //  .catch(err => console.log(err));
  // }

  private saveProfileUser(user: UserI) {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL
    })
      .then((resp) => {
        Swal.fire({
              title:'Muy Bien!',
              text: 'Perfil Actualizado',
              icon: 'success'
            });
            return resp;
      }
      )
      .catch(err => console.log('Error', err));
  }


  
  private uploadImage(user: UserI, image: FileI): void {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            user.photoURL = urlImage;
            this.saveProfileUser(user);
          });
        })
      ).subscribe();
  }
}
