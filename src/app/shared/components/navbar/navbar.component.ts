import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
 import { Observable } from 'rxjs';
 import { UserI } from '../../models/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  appName= 'ngGen6';

  public user$: Observable<UserI> = this.authSvc.afAuth.user;

  constructor(public authSvc: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogout(): void {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }
}