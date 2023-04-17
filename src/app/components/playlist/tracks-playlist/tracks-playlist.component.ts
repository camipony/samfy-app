import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-tracks-playlist',
  templateUrl: './tracks-playlist.component.html',
  styleUrls: ['./tracks-playlist.component.css']
})
export class TracksPlaylistComponent implements OnInit {

  playlistId: string;
  tracks: any = {};

  constructor(private SpotifyService: SpotifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.playlistId = this.route.snapshot.paramMap.get('id') ?? 'valor predeterminado';

    this.SpotifyService.getPlaylistTracks(this.playlistId).subscribe(
      (data: any) => {
        this.tracks = data.items;
        console.log(this.tracks);
      },
      error => {
        console.log(error);
      }
    );
  }
  }
