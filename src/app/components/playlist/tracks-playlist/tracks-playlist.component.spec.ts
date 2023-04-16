import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksPlaylistComponent } from './tracks-playlist.component';

describe('TracksPlaylistComponent', () => {
  let component: TracksPlaylistComponent;
  let fixture: ComponentFixture<TracksPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TracksPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
