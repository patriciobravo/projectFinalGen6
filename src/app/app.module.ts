import {environment} from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { NavbarComponent } from './shared/navbar/navbar.component';
import {ReactiveFormsModule} from '@angular/forms';




import { SendEmailComponent } from './auth/send-email/send-email.component';
import { AuthService } from './services/auth/auth.service';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
// import { NewPostComponent } from './components/pages/posts/new-post/new-post.component';
// import { NewPostModule } from './components/pages/posts/new-post/new-post.module';
// import { PostComponent } from './components/pages/posts/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {NavbarComponent} from './shared/components/navbar/navbar.component'


/* FIRESTORE*/
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';
import { NewAlbumComponent } from './components/pages/albums/new-album/new-album.component';
import { NewAlbumModule } from './components/pages/albums/new-album/new-album.module';
import { AlbumComponent } from './components/pages/albums/album/album.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { EditAlbumComponent } from './components/pages/albums/edit-album/edit-album.component';
import { EditAlbumModule } from './components/pages/albums/edit-album/edit-album.module';

@NgModule({
  declarations: [
    AppComponent,
    SendEmailComponent,
    ContainerAppComponent,   
    NavbarComponent,
    NewAlbumComponent,
    AlbumComponent,
    ModalComponent,
    EditAlbumComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MaterialModule,
    NewAlbumModule,
    EditAlbumModule,
 
  ],
  entryComponents: [ModalComponent],
  providers: [AuthService,
    {provide: StorageBucket, useValue: 'gs://ng-gen6.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
