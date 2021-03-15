import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListAlbumsRoutingModule } from './list-albums-routing.module';
import { ListAlbumsComponent } from './list-albums.component';


import { MaterialModule} from '../../../../material.module';
import { TableAlbumComponent} from '../../../../shared/components/table-album/table-album.component'

@NgModule({
  declarations: [ListAlbumsComponent, TableAlbumComponent],
  imports: [
    CommonModule,
    ListAlbumsRoutingModule,
    MaterialModule
  ]
})
export class ListAlbumsModule { }
