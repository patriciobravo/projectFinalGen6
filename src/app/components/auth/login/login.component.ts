import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserI } from 'src/app/shared/models/user.interface';
import { AuthService } from '../../../services/auth/auth.service';

import  Swal  from 'sweetalert2';

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


  async onLogin(){

    const {email, password} = this.loginForm.value;
    try {

      const user = await this.authSvc.login(email, password).then(
        response => {
          if(response) {
     
            this.checkUserIsVerified(response);
           
           }
        }
      );
      
    
 
    }catch ( error) {
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
      //this.router.navigate(['/verification-email'])
      this.authSvc.sendVerificationEmail();
      Swal.fire({
              title:'Registro no verificado!',
              text: 'Te hemos vuelto a enviar un email para activar tu cuenta',
              icon: 'warning'
            });
    }
    else{
      this.router.navigate(['/register'])
    }


  }

}
