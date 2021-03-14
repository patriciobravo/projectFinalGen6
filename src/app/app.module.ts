import {environment} from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { NavbarComponent } from './shared/navbar/navbar.component';
import {ReactiveFormsModule} from '@angular/forms'

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { AuthService } from './services/auth/auth.service';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { NewPostComponent } from './components/pages/posts/new-post/new-post.component';
import { NewPostModule } from './components/pages/posts/new-post/new-post.module';
import { PostComponent } from './components/pages/posts/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';





@NgModule({
  declarations: [
    AppComponent,
    SendEmailComponent,
    ContainerAppComponent,
    NewPostComponent,
    PostComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NewPostModule,
    BrowserAnimationsModule,
    MaterialModule,
 
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
