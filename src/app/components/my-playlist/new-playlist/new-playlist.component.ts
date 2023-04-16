import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-new-playlist',
  templateUrl: './new-playlist.component.html',
  styleUrls: ['./new-playlist.component.css']
})
export class NewPlaylist {

  name: string;
  description: string;

  constructor(private SpotifyService: SpotifyService) { }

  createPlaylist() {
    this.SpotifyService.createPlaylist(this.name, this.description).subscribe(
      response => {
        console.log('Playlist created successfully:', response);
        console.log("Playlist creada")
      },
      error => {
        console.error('Error creating playlist:', error);
      }
    );
  }
}
