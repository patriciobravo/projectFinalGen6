import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],

})
export class SendEmailComponent implements OnInit, OnDestroy {

  public title: string;
  public user$: Observable<any>= this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService, private router: Router  ) { }

  ngOnInit() {

    setTimeout(() => {
      setTimeout(() => {
        this.title ="En unos segundos seras redireccionado al inicio...";
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3500);
            
      }, 3500);
      
    }, 1500);
    
  }

  onSendEmail(): void{
    this.authSvc.sendVerificationEmail();
  }

  ngOnDestroy() {
    this.authSvc.logout()
  }
  

}
