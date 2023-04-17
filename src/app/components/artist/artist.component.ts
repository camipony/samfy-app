import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artist: any = {};
  topTracks: any = {};
  loadingArtist?: boolean;
  itemsPerPage = 10;
  currentPage = 1;
  totalPages: number;

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    this.router.params.subscribe(params => {
      this.loadingArtist = true;
      this.getArtist(params["id"])
      this.getTopTracks(params["id"])
    })

  }

  getArtist(id: string) {
    this.spotify.getArtist(id)
      .subscribe(artist => {
        this.artist = artist
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
