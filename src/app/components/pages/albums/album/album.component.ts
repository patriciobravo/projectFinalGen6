import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { AlbumService } from 'src/app/services/albums/albums.service';
import { AlbumI } from 'src/app/shared/models/album.interface';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  public album$ : Observable<AlbumI>

  constructor(private route: ActivatedRoute, private albumSvc: AlbumService) { }

  ngOnInit() {

    const idAlbum = this.route.snapshot.params.id;   
    this.album$= this.albumSvc.getOneAlbum(idAlbum);

  }


}
