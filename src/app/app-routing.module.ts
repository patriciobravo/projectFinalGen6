import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendEmailComponent } from './auth/send-email/send-email.component';
import { LoggedGuard } from './guards/logged.guard';
import { ContainerAppComponent} from '../app/components/pages/container-app/container-app.component'
import { AlbumComponent } from './components/pages/albums/album/album.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    // path: '', 
    // loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule),
    // //canActivate:[LoggedGuard],
     pathMatch: 'full'
  },
  {
    path: '', component: ContainerAppComponent,
    children:[
      { 
        path: 'home', 
        loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule),
       // canActivate:[LoggedGuard]
      }, 
      { path: 'profile', 
      loadChildren: () => import('./components/pages/profile/profile.module').then(m => m.ProfileModule)
      },
     
      {
        path: 'album/:id', component: AlbumComponent
      },
      
      { path: 'albums', 
        loadChildren: () => 
        import('./components/pages/albums/list-albums/list-albums.module').then(m => m.ListAlbumsModule) 
      }


    ]
  },
  
  // { path: 'home', 
  //   loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
  //   canActivate:[LoggedGuard]
  // }, 
  // { 
  //   path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
   
  // }, 
  { 
    path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) 
  },
  {
    path: 'verification-email', component: SendEmailComponent 
  },
  { path: 'forgot-password', loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
 // { path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
 
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
  { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
