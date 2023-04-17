import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';
  private userId: string;
  public credentials = {
    clientId: '9e45aeeb9cd44b90aa65a294f4319833',
    clientSecret: '7e09b84c736b4892b7ff350b113ac545',
    privateScope: 'user-read-private',
    scopes: ['playlist-read-private', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private'],
    publicEmail: 'user-read-email',
    accessToken: ''

  };

  public poolURlS = {
    authorize: 'https://accounts.spotify.com/es-ES/authorize?client_id=' +
      this.credentials.clientId + '&response_type=token' +
      '&redirect_uri=' + encodeURIComponent('http://localhost:4200/callback') +
      '&scope=' + this.credentials.scopes.join('%20') +
      '&expires_in=3600',
    refreshAccessToken: 'https://accounts.spotify.com/api/token'
  };
  constructor(private _http: HttpClient) {
    this.upDateToken()
  }

  upDateToken() {
    this.credentials.accessToken = sessionStorage.getItem('token') || '';
  }

  getQuery(query: string) {
    const URL = `https://api.spotify.com/v1/${query}`;
    const HEADER = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.credentials.accessToken }) };
    return this._http.get(URL, HEADER);
  }

  getProfile(): Observable<any> {
    return this.getQuery(`me`)
  }

  checkTokenSpoLogin() {
    this.checkTokenSpo() || (sessionStorage.setItem('refererURL', location.href), window.location.href = this.poolURlS.authorize);
  }

  checkTokenSpo() {
    return !!this.credentials.accessToken;
  }

  tokenRefreshURL() {
    this.checkTokenSpo() && alert('Expiro la sesión');
    this.credentials.accessToken = '';
    sessionStorage.removeItem('token');
    this.checkTokenSpoLogin();
  }

  getNewReleases() {
    return this.getQuery("browse/new-releases")
      .pipe(map((data: any) => data.albums.items));
  }

  getFeaturedPlaylists() {
    return this.getQuery(`browse/featured-playlists`)
      .pipe(map((data: any) => data.playlists.items));
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map((data: any) => {
        return data.artists.items;
      }));
  }

  getPlaylist(id: string) {
    return this.getQuery(`playlists/${id}`)
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`)
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?market=US`)
      .pipe(map((data: any) => {
        return data["tracks"];
      }));
  }

  getTopPlaylistTracks(id: string) {
    return this.getQuery(`playlists/${id}/tracks&limit=15`)
      .pipe(map((data: any) => {
        return data["tracks"];
      }));
  }

  getMyPlaylists() {
    return this.getQuery(`me/playlists?limit=12`)
  }

  createPlaylist(name: string, description: string, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.credentials.accessToken}`
    });
    const url = `${this.apiUrl}/users/${userId}/playlists`;
    const body = { name, description };
    const response = this._http.post(url, body, { headers });
    return response;
  }

  getPlaylistTracks(id: string) {
    return this.getQuery(`playlists/${id}/tracks`)
      .pipe(map((data: any) => {
        return data["tracks"];
      }));
  }

}
