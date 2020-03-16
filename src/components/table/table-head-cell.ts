import {Component, OnInit, ElementRef, Input, HostBinding, HostListener} from '@angular/core';
import {MsfTable, MsfTableRow} from "./table";

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
  get isCurrentSorter(): boolean {
    return this.msfTable._currentSorter === this;
  }


  constructor(private msfTable: MsfTable, private elementRef: ElementRef<HTMLElement>) {
    //this.msfTable.addHeadCell(this);
  }

  ngOnInit() {

  }

  @HostListener('click')
  sortTable() {

    if (this.isCurrentSorter) {
      this.msfTable.invertSorting();
      this.sortedAsc = !this.sortedAsc;
      return;
    }

    if (this.sortBy) {
     this.msfTable.sortBy(this.sortBy);
    } else {
     this.msfTable.sort(this.sortFn)
    }
    this.sortedAsc = true;
    this.msfTable._currentSorter = this;
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
