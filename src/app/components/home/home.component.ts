import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  nuevaMusica: any[] = [];
  nuevaPlaylists: any[] = [];
  loading: boolean;

  error: boolean = false;
  mensajeError?: string;
  mensajeErrorPlaylist?: string;


  constructor(private spotify: SpotifyService) {

    this.loading = true;
    this.spotify.getNewReleases()
      .subscribe((data: any) => {
        this.nuevaMusica = data
        this.loading = false;
      }, (errorServicio)=> {
        this.loading = false;
        this.error = true;
        this.mensajeError = errorServicio.error.error.message;
      });

    this.spotify.getFeaturedPlaylists()
    .subscribe((data: any) => {
      this.nuevaPlaylists = data
      this.loading = false;
    }, (errorServicio)=> {
      this.loading = false;
      this.error = true;
      this.mensajeErrorPlaylist = errorServicio.error.error.message;
    });
  }

  redirectTo(url: string) {
    window.location.replace('/#/newplaylist')
  }

}
