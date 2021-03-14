import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPostRoutingModule } from './list-post-routing.module';
import { ListPostComponent } from './list-post.component';


@NgModule({
  declarations: [ListPostComponent],
  imports: [
    CommonModule,
    ListPostRoutingModule
  ]
})
export class ListPostModule { }
