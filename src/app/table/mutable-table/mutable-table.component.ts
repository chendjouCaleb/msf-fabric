import { Component, OnInit } from '@angular/core';
import { ELEMENT_DATA, PeriodicElement } from '../element';
import { List } from "@positon/collections";

@Component({
  selector: 'app-mutable-table',
  templateUrl: './mutable-table.component.html',
  styles: []
})
export class MutableTableComponent implements OnInit {
  data = List.fromArray(ELEMENT_DATA);
  elements = List.fromArray(ELEMENT_DATA);
  model: PeriodicElement = { };
  constructor() { }

  ngOnInit() {

  }

  filter(value: string){
    this.elements.clear();
    this.elements.addRange(
      this.data.findAll(e => e.name.toLowerCase().indexOf(value.toLowerCase()) > -1));
  }

  remove(item: PeriodicElement){
    this.elements.remove(item);
  }
}
