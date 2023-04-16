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
    clientId: '508b858fa28d45faa13d921782025686',
    clientSecret: '7cb75e09b3324cd4bf4201d28acb05c6',
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

  getProfile() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.credentials.accessToken}`
    });

    return this._http.get('https://api.spotify.com/v1/me', { headers });
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

    // this.http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, {headers})
    //     .pipe(map( (data: any) => {
    //       return data.artists.items;
    //     }));
  }


  getPlaylist(id: string) {
    return this.getQuery(`playlists/${id}`)
  }

  getArtista(id: string) {
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

  getMyPlaylists(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.credentials.accessToken}`
    });
    return this._http.get('https://api.spotify.com/v1/me/playlists?limit=12', { headers });
  }

  getUserId(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.credentials.accessToken}`
    });
    return this._http.get(`${this.apiUrl}/me`, {headers});
  }

  createPlaylist(name: string, description: string, userId:string): Observable<any> {
        console.log("user2 "+userId+ " name2 "+name+ " des2 "+description)
        const url = `${this.apiUrl}/users/${userId}/playlists`;
        const body = { name, description };
        return this._http.post(url, body);

  }

}
