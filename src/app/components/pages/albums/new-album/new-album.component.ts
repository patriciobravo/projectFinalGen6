import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlbumI } from '../../../../shared/models/album.interface';
import { AlbumService } from '../../../../services/albums/albums.service';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.scss']
})
export class NewAlbumComponent implements OnInit {
  private image: any;
  constructor(private albumSvc: AlbumService) { }

  public newAlbumForm = new FormGroup({
    artist: new FormControl('', Validators.required),
    album: new FormControl('', Validators.required),    
    imageAlbum: new FormControl('', Validators.required),
  });

  ngOnInit() {
  }

  addNewAlbum(data: AlbumI) {
    console.log('New album', data);
    this.albumSvc.preAddAndUpdateAlbum(data, this.image);
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }
}