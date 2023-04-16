import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-new-playlist',
  templateUrl: './new-playlist.component.html',
  styleUrls: ['./new-playlist.component.css']
})
export class NewPlaylist implements OnInit{

  name: string;
  description: string;
  userId: string = '';

  constructor(private SpotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.SpotifyService.getUserId().subscribe(data => {
      this.userId = data.id;
      console.log(this.userId);
    });
}


  createPlaylist() {
    this.name = (<HTMLInputElement>document.getElementById("name")).value;
    this.description = (<HTMLInputElement>document.getElementById("description")).value;

    console.log("user "+ this.userId+ "name "+this.name+" des "+this.description)
    this.SpotifyService.createPlaylist(this.name, this.description, this.userId).subscribe(
      response => {
        console.log('Playlist created successfully:', response);
      },
      error => {
        console.error('Error creating playlist:', error);
      }
    );
  }
}
