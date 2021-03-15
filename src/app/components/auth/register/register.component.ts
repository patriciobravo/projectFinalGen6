import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserI } from 'src/app/shared/models/user.interface';

import { AuthService } from '../../../services/auth/auth.service';

import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  

})
export class RegisterComponent implements OnInit {

  get email() { return this.registerForm.get('email') };
  get password() { return this.registerForm.get('password') };

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  constructor( private authSvc: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  async onRegister(){

    const {email, password} = this.registerForm.value;
    try {
      
      const user = await this.authSvc.register(email, password);

      if(user){
       // this.router.navigate(['/verification-email']);
        //console.log(user)
        
       this.checkUserIsVerified(user)
      }
    } catch (error) {
      console.log(error)
    }

  }

  private checkUserIsVerified(user: UserI){
    if(user && user.emailVerified)
    {
      //Redirect to home
      this.router.navigate(['/home']);

    }
    else if(user){
      this.router.navigate(['/verification-email'])
      }
    else{
      this.router.navigate(['/register'])
    }


  }


}
