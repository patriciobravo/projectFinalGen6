import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable} from 'rxjs';
import { map, finalize  } from 'rxjs/operators';
import { AlbumI } from '../../shared/models/album.interface';
import {FileI} from '../../shared/models/file.interface';
@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private albumCollection: AngularFirestoreCollection<AlbumI>;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(private afs: AngularFirestore,  private storage: AngularFireStorage) {
    this.albumCollection = afs.collection<AlbumI>('albums');
   }

  public getAllAlbums():Observable<AlbumI[]>{
    return this.albumCollection //RECUPERO COLLECTION DE FIREBASE
    .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map( a => {
            const data = a.payload.doc.data() as AlbumI;
            const id = a.payload.doc.id;
            return {id, ...data};
          })
      )
    );
  }

  public getOneAlbum(id:AlbumI):Observable<AlbumI>{
    return this. afs.doc<AlbumI>(`albums/${id}`).valueChanges();

  }

  public deleteAlbumById(album: AlbumI) {
    return this.albumCollection.doc(album.id).delete();
  }

  public editAlbumById(album: AlbumI, newImage?: FileI){
    console.log(album)
    console.log(newImage)
    if(newImage){
      this.uploadImage(album, newImage)
    }else{
      console.log(album.id)
    
      return this.albumCollection.doc(album.id).update(album);
    }
  }

  public preAddAndUpdateAlbum(album: AlbumI, image: FileI): void {
    this.uploadImage(album, image);
  }

  private uploadImage(album: AlbumI, image: FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            this.saveAlbum(album);
          });
        })
      ).subscribe();
  }

  private saveAlbum(album: AlbumI) {
    
    const albumObj = {
      artist: album.artist,
      album: album.album,
      imageAlbum: this.downloadURL,
      fileRef: this.filePath,
   
    };

    if (album.id) {
      return this.albumCollection.doc(album.id).update(albumObj);
    } else {
      return this.albumCollection.add(albumObj);
    }

  }

}

