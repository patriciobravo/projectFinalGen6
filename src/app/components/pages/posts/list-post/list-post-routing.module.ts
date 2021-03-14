import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPostComponent } from './list-post.component';

const routes: Routes = [{ path: '', component: ListPostComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPostRoutingModule { }
