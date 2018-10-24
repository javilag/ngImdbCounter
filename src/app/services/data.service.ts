import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  idMovie = 'Batman&type=series&page=1-3';

  constructor(private http: HttpClient) { }

  firstClick() {
    return console.log('you kiss my lips apocalypse');
  }

  getAMovie () {
    return this.http.get<Object[]>('http://www.omdbapi.com/?s=' + this.idMovie + '&apikey=37a27720');
  }

  selectingASpecificRuntime (imdbId: string) {
    const gettingMovie = this.http.get<any>('http://www.omdbapi.com/?i=' + imdbId + '&apikey=37a27720');
    return gettingMovie;
  }

  gettingTheRealNumberChapters (imdbId: string, cuantSeason: number) {
    const gettingMovie = this.http.get<any>('http://www.omdbapi.com/?i=' + imdbId + '&Season=' + cuantSeason + '&apikey=37a27720');
    return gettingMovie;
  }
}
