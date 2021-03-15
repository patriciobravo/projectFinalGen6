import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

//import { NavbarComponent } from '../navbar/navbar.component';

import { MaterialModule} from '../../material.module'

@NgModule({
  declarations: [HomeComponent, /* NavbarComponent*/],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
   
  ]
})
export class HomeModule { }
