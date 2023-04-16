import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-playlist',
  templateUrl: './my-playlist.component.html',
  styleUrls: ['./my-playlist.component.css']
})
export class MyPlaylistComponent implements OnInit {
  playlists: any[] = [];

  constructor(private SpotifyService: SpotifyService, private router: Router) { }

  ngOnInit(): void {
    this.SpotifyService.getMyPlaylists().subscribe(
      (response: any) => {
        this.playlists = response.items;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  redirectTo(url: string) {
    window.location.replace('/#/newplaylist')
  }

  goToSong(playlistId:string){
    this.router.navigate(['tracks/', playlistId]);

  }

}
