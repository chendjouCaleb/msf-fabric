import { Component, OnInit } from '@angular/core';
import { MsfTableRowComponent } from 'src/components/public_api';
import { ELEMENT_DATA } from '../element'

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

  updateSelection(items: MsfTableRowComponent[]) {
    const data = items.map(i => i.value);
    this.selection = JSON.stringify(data);
  }

}
