import {AfterContentInit, Component, ContentChild } from '@angular/core';
import {MsfCheckboxGrid} from "../grid/checkbox-grid";
import {MsfTable} from "./table";

@Component({
  selector: 'MsfTableHead',
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'msf-table-head'
  }
})
export class MsfTableHead implements AfterContentInit{

  @ContentChild(MsfCheckboxGrid)
  _selector: MsfCheckboxGrid;

  constructor(private msfTable: MsfTable) {  }


  ngAfterContentInit(): void {
    if(!this._selector) {
      return;
    }
    this.msfTable.selectable = true;
    this.msfTable.selectionChange.subscribe(() => {
      this._selector.checkbox.checked = this.msfTable.isSelectedAll;
    });

    this._selector.checkbox.change.subscribe(() => {

      if(this._selector.checkbox.checked) {
        this.msfTable.selectRange();
      }else {
        this.msfTable.unselectRange();
      }
    })
  }

}
