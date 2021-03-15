import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  

})
export class ForgotPasswordComponent implements OnInit {

  userEmail = new FormControl('');

  constructor(private authSvc: AuthService, private router:Router) { }

  ngOnInit() {
  }

  async onReset(){

    try {
      const email = this.userEmail.value
      await this.authSvc.resetPassword(email);
     // window.alert('Verifica tu Email');
      Swal.fire({
            title:'Verifica tu Email!',
            text: 'Hemos enviando un email a tu correo!',
            icon: 'success'
          });
      this.router.navigate(['/login']);

    } catch (error) {
      console.log(error)
    }
  
  }

}