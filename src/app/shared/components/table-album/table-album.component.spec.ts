import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAlbumComponent } from './table-album.component';

describe('TableAlbumComponent', () => {
  let component: TableAlbumComponent;
  let fixture: ComponentFixture<TableAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
