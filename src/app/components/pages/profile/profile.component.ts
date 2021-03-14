import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../../services/auth/auth.service'
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { User} from '../../../shared/models/user.interface'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authSvc: AuthService) { }

  public profileForm = new FormGroup({
    displayName: new  FormControl('', Validators.required),
    email: new  FormControl({value:'', disabled: true}, Validators.required),
    photoURL: new  FormControl('', Validators.required)
  })

  ngOnInit() {

    this.authSvc.userData$.subscribe( user => {
      this.initValuesForm(user);
    })
  }

  onSaveProfile(user: User){

    this.authSvc.saveProfileUser(user)
  }


  private initValuesForm(user: User): void{

    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    })
  }

}
