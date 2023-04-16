import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-playlist',
  templateUrl: './new-playlist.component.html',
  styleUrls: ['./new-playlist.component.css']
})
export class NewPlaylist implements OnInit {

  name: string;
  description: string;
  userId: string = '';

  constructor(private SpotifyService: SpotifyService, private router: Router) { }

  ngOnInit(): void {
    this.SpotifyService.getProfile().subscribe(data => {
      this.userId = data.id;
    });
  }

  redirectTo() {
    window.location.replace('/#/myplaylist')
  }

  createPlaylist() {
    this.name = (<HTMLInputElement>document.getElementById("name")).value;
    this.description = (<HTMLInputElement>document.getElementById("description")).value;
    this.SpotifyService.createPlaylist(this.name, this.description, this.userId).subscribe(
      response =>
        console.log('Playlist created successfully:', response),
      error =>
        console.error('Error creating playlist:', error)
    );

  }

}
