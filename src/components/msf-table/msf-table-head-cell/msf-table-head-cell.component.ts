import { Component, OnInit, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MsfTable } from '../msf-table';
import { MsfTableRowComponent } from '../msf-table-row/msf-table-row.component';

@Component({
  selector: 'MsfTableHeadCell',
  templateUrl: './msf-table-head-cell.component.html',
  styles: []
})
export class MsfTableHeadCellComponent implements OnInit {

  @Input()
  SortBy: any;

  @Input()
  SortFn: (a: MsfTableRowComponent, b: MsfTableRowComponent) => number


  /**
   * Gets whether the table is sorted in ascending order.
   */
  public sortedAsc: boolean = true;

  /**
   * Gets wheter the cell the the current head cell sorter of the table.
   */
  isCurrentSorter: boolean = false;

  
  constructor(private msfTable: MsfTable, private elementRef: ElementRef<HTMLElement>) {
    this.elementRef.nativeElement.classList.add("msf-TableHeadCell");
    this.msfTable.addHeadCell(this);
  }

  ngOnInit() {
  }

  sortTable() {
    if (!this.isSortable) {
      return;
    }

    if (this.isCurrentSorter) {
      this.msfTable.reserveOrder();
      this.sortedAsc = !this.sortedAsc;
      return;
    }

    if (this.SortBy) {
      this.msfTable.sortTable(this._propertySortFn, this);
    } else {
      this.msfTable.sortTable(this.SortFn, this);
    }
    this.sortedAsc = true;
  }

  get isSortable() {
    return !(!this.SortFn && !this.SortBy);
  }

  private _propertySortFn = (a: MsfTableRowComponent, b: MsfTableRowComponent) => {
    if (a.Value[this.SortBy] > b.Value[this.SortBy]) {
      return 1;
    } else if (a.Value[this.SortBy] < b.Value[this.SortBy]) {
      return -1;
    }
    return 0;
  }

}
