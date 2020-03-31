import {Component} from "@angular/core";
import {ELEMENT_DATA, ELEMENT_TYPES, PeriodicElement} from "../../element";
import {groupBy} from "../../components/helpers/array";

@Component({
  templateUrl: 'select.component.html'
})
export class SelectComponent {
  items: PeriodicElement[];

  groups = ELEMENT_TYPES;
  itemMap = groupBy(ELEMENT_DATA, 'type');

  constructor() {
    this.items = ELEMENT_DATA.slice(0, 3);
    console.log(this.items)
  }
}
