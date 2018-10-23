import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  h1Style = false;
  movie: Object; 

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAMovie().subscribe(data => {
      this.movie = data;
      console.log(this.movie);
    });
  }

  firstClick() {
    this.h1Style =  this.h1Style ? false : true;
    this.data.firstClick();
  }

}
