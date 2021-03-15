import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserI } from 'src/app/shared/models/user.interface';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  get password() { return this.loginForm.get('password')};
  get email() { return this.loginForm.get('email')};

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  constructor( private authSvc: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }


  onLogin(form) {
    this.authSvc.loginByEmail(form)
    .then(resp => { 
      console.log(resp) 
      this.router.navigate(['/home'])
    }).catch(err => console.log(err))

  }

}
