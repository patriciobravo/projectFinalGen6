import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],

})
export class SendEmailComponent implements OnInit, OnDestroy {

  public user$: Observable<any>= this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }

  onSendEmail(): void{
    this.authSvc.sendVerificationEmail();
  }

  ngOnDestroy() {
    this.authSvc.logout()
  }
  

}
