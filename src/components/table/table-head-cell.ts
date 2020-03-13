import { Component, OnInit, ElementRef, Input} from '@angular/core';
import { MsfTable } from './msf-table';
import {MsfTableComponent, MsfTableRow} from "./msf-table.component";

@Component({
  selector: 'MsfTableHeadCell',
  templateUrl: './table-head-cell.html',
  host: {
    'class': 'msf-table-head-cell'
  }
})
export class MsfTableHeadCell implements OnInit{

  @Input()
  sortBy: any;

  @Input()
  sortFn: (a: MsfTableRow, b: MsfTableRow) => number;



  /**
   * Gets whether the table is sorted in ascending order.
   */
  public sortedAsc: boolean = true;

  /**
   * Gets whether the cell the the current head cell sorter of the table.
   */
  isCurrentSorter: boolean = false;


  constructor(private msfTable: MsfTableComponent, private elementRef: ElementRef<HTMLElement>) {
    //this.msfTable.addHeadCell(this);
  }

  ngOnInit() {

  }

  sortTable() {
    if (!this.isSortable) {
      return;
    }

    if (this.isCurrentSorter) {
      // this.msfTable.reserveOrder();
      this.sortedAsc = !this.sortedAsc;
      return;
    }

    if (this.sortBy) {
      // this.msfTable.sortTable(this._propertySortFn, this);
    } else {
      // this.msfTable.sortTable(this.sortFn, this);
    }
    this.sortedAsc = true;
  }

  get isSortable() {
    return !(!this.sortFn && !this.sortBy);
  }

  private _propertySortFn = (a: MsfTableRow, b: MsfTableRow) => {
    if (a.value[this.sortBy] > b.value[this.sortBy]) {
      return 1;
    } else if (a.value[this.sortBy] < b.value[this.sortBy]) {
      return -1;
    }
    return 0;
  };



  get hostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

}
