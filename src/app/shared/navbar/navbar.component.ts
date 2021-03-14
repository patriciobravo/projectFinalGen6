import { Component} from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],

})
export class NavbarComponent {
  public isLogged = false;
  //public user: any;
  public user$: Observable<User> = this.authSvc.afAuth.user;

  constructor( private authSvc: AuthService, private router: Router ) { }

  async ngOnInit() {

  
    // this.user = await this.authSvc.getCurrentUser();

    // if(this.user) {
    //   this.isLogged = true;
    //   console.log('User =>', this.user)
    // }
  }

  async onLogout(){
   
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
      
    } catch (error) {
      console.log(error)
    }
  }



  
  

}
