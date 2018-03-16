import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chick',
  templateUrl: './chick.component.html',
  styleUrls: ['./chick.component.css']
})
export class ChickComponent implements OnInit {
@Input()
chick: any;
  constructor() { }

  ngOnInit() {
  }

  nextPicture(){

  }

}
