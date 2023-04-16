import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ROUTES } from './app.routes';
import {HttpClientModule } from "@angular/common/http";
import { SpotifyService } from './services/spotify.service';
import {AuthGuardService} from './services/auth-guard.service';
import { NoimagePipe } from './pipes/noimage.pipe';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { AccessTokenComponent } from './components/access-token/access-token.component';
import { PlaylistCardComponent } from './components/playlist-card/playlist-card.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { MyPlaylistComponent } from './components/my-playlist/my-playlist.component';
import { NewPlaylist } from './components/my-playlist/new-playlist/new-playlist.component';
import { TracksPlaylistComponent } from './components/playlist/tracks-playlist/tracks-playlist.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ArtistaComponent,
    NavbarComponent,
    NoimagePipe,
    TarjetasComponent,
    LoadingComponent,
    DomseguroPipe,
    AccessTokenComponent,
    PlaylistCardComponent,
    PlaylistComponent,
    UsuarioComponent,
    MyPlaylistComponent,
    NewPlaylist,
    TracksPlaylistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {useHash: true})

  ],
  providers: [
    SpotifyService, AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
