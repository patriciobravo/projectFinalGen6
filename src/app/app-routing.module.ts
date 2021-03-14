import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendEmailComponent } from './auth/send-email/send-email.component';
import { LoggedGuard } from './guards/logged.guard';
import { ContainerAppComponent} from '../app/components/pages/container-app/container-app.component'
import { PostComponent } from './components/pages/posts/post/post.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '', component: ContainerAppComponent,
    children:[
      { 
        path: 'home', 
        loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
        canActivate:[LoggedGuard]
      }, 
    ]
  },
  
  { path: 'home', 
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
    canActivate:[LoggedGuard]
  }, 
  { 
    path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
   
  }, 
  { 
    path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) 
  },
  {
    path: 'verification-email', component: SendEmailComponent 
  },
  { path: 'forgot-password', loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'profile', loadChildren: () => import('./components/pages/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
  {
    path: 'posts/:id', component: PostComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
