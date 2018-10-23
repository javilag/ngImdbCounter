import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  h1Style = false;

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  firstClick() {
    this.h1Style =  this.h1Style ? false : true;
    this.data.firstClick();
  }

}
