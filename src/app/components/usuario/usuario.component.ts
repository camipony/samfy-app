import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UserComponent implements OnInit {

  profile: any;

  constructor( private actrouter: ActivatedRoute, private router: Router, private spotify: SpotifyService) { }

  ngOnInit(): void {
    this.spotify.getProfile().subscribe((data: any) => {
      this.profile = data;
    })
  }

  redirectTo() {
    this.router.navigate(['/search']);
  }

}
