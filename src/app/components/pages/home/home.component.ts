import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumService} from '../../../services/albums/albums.service';
import { AlbumI } from '../../../shared/models/album.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public albums$ : Observable<AlbumI[]>;
  
  constructor(private albumSvc: AlbumService) { }

  ngOnInit() {
    this.albums$ = this.albumSvc.getAllAlbums();
  }

}
