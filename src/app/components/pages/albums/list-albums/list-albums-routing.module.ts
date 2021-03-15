import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAlbumsComponent } from './list-albums.component';

const routes: Routes = [{ path: '', component: ListAlbumsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListAlbumsRoutingModule { }
