import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {
  artista: any = {};
  topTracks: any = {};
  loadingArtist?: boolean;
  itemsPerPage = 10;
  currentPage = 1;
  totalPages: number;

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    this.router.params.subscribe(params => {
      // console.log(params["id"])
      this.loadingArtist = true;
      this.getArtista(params["id"])
      this.getTopTracks(params["id"])
    })

  }

  getArtista(id: string) {
    this.spotify.getArtista(id)
      .subscribe(artista => {
        this.artista = artista
        this.loadingArtist = false;
      })
  }

  getTopTracks(id: string) {
    this.spotify.getTopTracks(id)
      .subscribe(tracks => {
        this.topTracks = tracks
      })
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  ngOnInit(): void {
  }

}
