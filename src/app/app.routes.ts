
import { Routes } from '@angular/router';
import { ArtistComponent } from './components/artist/artist.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { AccessTokenComponent } from './components/access-token/access-token.component';
import { AuthGuardService} from './services/auth-guard.service';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { MyPlaylistComponent } from './components/my-playlist/my-playlist.component';
import { UserComponent } from './components/usuario/usuario.component';
import { NewPlaylist } from './components/my-playlist/new-playlist/new-playlist.component';
import { TracksPlaylistComponent } from './components/playlist/tracks-playlist/tracks-playlist.component';

export const ROUTES: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService]},
  { path: "search", component: SearchComponent},
  { path: "usuario", component: UserComponent, canActivate: [AuthGuardService]},
  { path: "artist/:id", component: ArtistComponent, canActivate: [AuthGuardService]},
  { path: "playlist/:id", component: PlaylistComponent, canActivate: [AuthGuardService]},
  { path: "myplaylist", component: MyPlaylistComponent, canActivate: [AuthGuardService]},
  { path: "newplaylist", component: NewPlaylist, canActivate: [AuthGuardService]},
  { path: "tracks/:id", component: TracksPlaylistComponent, canActivate: [AuthGuardService]},
  { path: "access_token", component: AccessTokenComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', pathMatch: 'full', redirectTo: 'home'},
];
