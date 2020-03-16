import { Component, OnInit } from '@angular/core';
import { MsfTableRow } from 'src/components/public_api';
import {ELEMENT_DATA, PeriodicElement} from '../../../element'
import {List} from "@positon/collections";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: []
})
export class TableComponent implements OnInit {
  elements = ELEMENT_DATA;
  items = ELEMENT_DATA;
  selection;
  constructor() { }

  ngOnInit() {
  }

  updateSelection(items: List<MsfTableRow>) {
    const data = items.convertAll(i => i.value);
    this.selection = JSON.stringify(data);
  }

  filter(value: string){
    this.items = this.elements.filter( e => e.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
  }

  remove(item: PeriodicElement){
    this.elements = this.elements.filter(e => e.id !== item.id);
    this.items = this.elements;
  }

}
