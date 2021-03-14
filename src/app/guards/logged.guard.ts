import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import  Swal  from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  private logged: boolean;

 constructor(private authSvc: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.authSvc.currentUser().then(resp => {
        if(resp != null){
          
          this.logged = true;
          this.router.navigate(['/home']);
        }
        else{
          this.logged = false;
          Swal.fire({
            title:'Acceso Denegado!',
            text: 'No puedes acceder',
            icon: 'warning'
          });
          this.router.navigate(['/login']);
        }
       
      }).catch(error => {
        console.log(error)
        Swal.fire({
          title:'Acceso Denegado!',
          text: 'No puedes acceder',
          icon: 'warning'
        });
        this.router.navigate(['/login']);
        this.logged = false;
      
      
      })
      return this.logged;
  
  }
  
}
