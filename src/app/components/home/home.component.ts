import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../styling/fade-in.animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
