import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pivot',
  templateUrl: './pivot.component.html',
  styles: []
})
export class PivotComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  click(){
    alert("Click event")
  }
}
