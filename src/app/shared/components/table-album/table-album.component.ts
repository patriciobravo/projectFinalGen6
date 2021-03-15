import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort'
import { AlbumService } from '../../../services/albums/albums.service'
import { AlbumI } from '../../models/album.interface';

import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material';
import { ModalComponent} from './../modal/modal.component'


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-table-album',
  templateUrl: './table-album.component.html',
  styleUrls: ['./table-album.component.scss']
})
export class TableAlbumComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['artist', 'album', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true})paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private albumSvc: AlbumService, public dialog: MatDialog) { }

  ngOnInit() {
   
    this.albumSvc.getAllAlbums().subscribe(albums => this.dataSource.data = albums)
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteAlbum(album: AlbumI) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.albumSvc.deleteAlbumById(album).then(() => {
          console.log(album)
          Swal.fire('Deleted!', 'Your  post has been deleted.', 'success');
        }).catch((error) => {
          Swal.fire('Error!', 'There was an error deleting this post', 'error');
        });
      }
    });

  }

  onEditAlbum(album: AlbumI){
    console.log(album)
    this.openDialog(album)
  }


  onNewAlbum(){
    this.openDialog();
   
  }

  openDialog(album?: AlbumI): void {
    console.log(album)
    const config = {
      data: {
        message: album ? 'Editar Album' : 'Nuevo Album',
        content: album
      }
    };
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
  }
}
