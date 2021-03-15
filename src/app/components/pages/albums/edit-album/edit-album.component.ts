import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlbumI } from '../../../../shared/models/album.interface';
import { AlbumService } from '../../../../services/albums/albums.service';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.scss']
})
export class EditAlbumComponent implements OnInit {
  
  private image: any;
  private imageOriginal: any;

  @Input() album: AlbumI;

  constructor(private albumSvc: AlbumService) { }

  public editAlbumForm = new FormGroup({
    id: new FormControl('', Validators.required),
    artist: new FormControl('', Validators.required),
    album: new FormControl('', Validators.required),    
    imageAlbum: new FormControl('', Validators.required),
  });

  ngOnInit() {

    this.image = this.album.imageAlbum;
    this.imageOriginal = this.album.imageAlbum;
    this.initValuesForm();
    
  }


  editAlbum(album: AlbumI){
    if (this.image === this.imageOriginal) {
      album.imageAlbum = this.imageOriginal;
       this.albumSvc.editAlbumById(album);
      console.log(album)
    } else {
      this.albumSvc.editAlbumById(album, this.image);
     console.log('aca')
    }
    
  }
  handleImage(event: any): void {
    this.image = event.target.files[0];
  }

  private initValuesForm(): void {
    this.editAlbumForm.patchValue({
      id: this.album.id,
      artist: this.album.artist,
      album: this.album.album,
    });
  }
}
