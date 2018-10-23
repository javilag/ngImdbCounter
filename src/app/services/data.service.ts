import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  idMovie = 'tt0212712';
  constructor(private http: HttpClient) { }

  firstClick() {
    return console.log('you kiss my lips apocalypse');
  }

  getAMovie () {
    return this.http.get('http://www.omdbapi.com/?i=' + this.idMovie + '&apikey=37a27720');
  }
}
