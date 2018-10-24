import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  h1Style = false;
  numberOfChapters:number =0;
  time4UserWithBasisNec: string;
  time4UserOnlyInTheBed: string;
  runTime4Chap: number;
  selectMovie: string;
  movies$: Object[];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAMovie().subscribe(data => {
      this.movies$ = data;
      console.log(this.movies$);
    });
  }

  firstClick() {
    this.h1Style =  this.h1Style ? false : true;
    this.data.firstClick();
  }

  takingTime(imdbId: string) {
    this.data.selectingASpecificRuntime(imdbId).subscribe(data => {
      console.log(data);
      let index;
      for (index = 1; index <= parseInt(data.totalSeasons); index++) {
        this.data.gettingTheRealNumberChapters(imdbId, index).subscribe(data2 => {
          this.numberOfChapters += data2.Episodes.length;
        });
      }
      console.log(this.numberOfChapters);
      this.time4UserOnlyInTheBed = ((parseFloat(data.totalSeasons) * this.numberOfChapters * parseFloat(data.Runtime.split(' ')[0]))
      / 60).toFixed(2);
      this.time4UserWithBasisNec = ((parseFloat(data.totalSeasons) * this.numberOfChapters * (parseFloat(data.Runtime.split(' ')[0]) + 5))
      / 60).toFixed(2);
      this.selectMovie = data.imdbID;
      this.numberOfChapters = 0;
    });
  }
}
