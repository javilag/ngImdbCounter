import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private inputMovies: HTMLInputElement;
  @ViewChild('inputMovies') inputMoviesref: ElementRef;
  private inputMovies$: Observable<Event>;
  private inputMovies$query: Observable<string>;

  h1Style = false;
  private debounceDelay = 300;

  numberOfChapters:number = 0;
  time4UserWithBasisNec: string;
  time4UserOnlyInTheBed: string;
  runTime4Chap: number;
  selectMovie: string;
  movies$: Object[];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.inputMovies = this.inputMoviesref.nativeElement;
    this.inputMovies$ = fromEvent(this.inputMovies, 'keyup');
    this.data.getABunchOfBatmanMovies().subscribe(data => {
      this.movies$ = data;
      console.log(this.movies$);
    });
    this.searching4AMovie();
  }

  firstClick() {
    this.h1Style =  this.h1Style ? false : true;
    this.data.firstClick();
  }

  takingTime(imdbId: string) {
    this.data.selectingASpecificRuntime(imdbId).subscribe(data => {
      let index, numberOfChapters = 0;
      for (index = 1; index <= parseInt(data.totalSeasons); index++) {
        this.data.gettingTheRealNumberChapters(imdbId, index).subscribe(data2 => {
          numberOfChapters += data2.Episodes.length;
          this.printTymeforUser(numberOfChapters, data);
        });
      }
    });
  }
  searching4AMovie() {
    this.inputMovies$query = this.inputMovies$.pipe(
      map(() => this.inputMovies.value),
      debounceTime(this.debounceDelay),
      distinctUntilChanged(),
    );
    this.inputMovies$query.pipe(
      switchMap((query) => this.data.getAMovieByName(query))
    ).subscribe(
      result => this.movies$ = result,
    );
  }

  printTymeforUser(numberOfChapters, data) {
    this.numberOfChapters = numberOfChapters;
    this.time4UserOnlyInTheBed = ((parseFloat(data.totalSeasons) * numberOfChapters * parseFloat(data.Runtime.split(' ')[0]))
    / 60).toFixed(2);
    this.time4UserWithBasisNec = ((parseFloat(data.totalSeasons) * numberOfChapters * (parseFloat(data.Runtime.split(' ')[0]) + 5))
    / 60).toFixed(2);
    this.selectMovie = data.imdbID;
  }

}
