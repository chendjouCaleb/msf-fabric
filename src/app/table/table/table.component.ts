import { Component, OnInit } from '@angular/core';
import { MsfTableRow } from 'src/components/public_api';
import { ELEMENT_DATA } from '../element'
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

}
