import {Component, forwardRef, OnInit, ViewChild} from '@angular/core';
import {MsfCheckbox, MsfTable, MsfTableRow} from 'src/components/public_api';
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

  delete(item: PeriodicElement) {
    this.items = this.items.filter(i => i !== item);
  }
  updateSelection(items: List<MsfTableRow>) {
    const data = items.convertAll(i => i.value);
    this.selection = JSON.stringify(data);
  }

  @ViewChild(forwardRef(() => MsfTable))
  table: MsfTable;

  check(checkbox: MsfCheckbox, type: string) {
    if(checkbox.checked){
      this.show(type);
    }else{
      this.hide(type);
    }
  }

  filterItems = new List<MsfTableRow>();

  filter(key: string) {
    this.filterItems.forEach(i => i.show());
    this.filterItems = this.table.items.findAll(i =>  i.value.name.toLowerCase().indexOf(key.toLowerCase()) < 0);
    this.filterItems.forEach(i => i.hide())
  }

  hide(type: string) {
    this.table.items.findAll(i => i.value.type === type).forEach(i => i.hide());
  }

  show(type: string) {
    this.table.items.findAll(i => i.value.type === type).forEach(i => i.show());
  }

}
