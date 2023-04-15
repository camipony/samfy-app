import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  profile: any;

  constructor( private router: ActivatedRoute, private spotify: SpotifyService) { }

  ngOnInit(): void {
    this.spotify.getProfile().subscribe((data: any) => {
      this.profile = data;
      console.log("data "+this.profile.product+" data2: "+data.product)
    })
  }

  redirectTo(url: string) {
    window.open(url, '_blank');
  }

}
