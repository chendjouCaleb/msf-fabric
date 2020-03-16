import {
  AfterContentInit, ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef, HostBinding,
  OnDestroy,
  QueryList
} from '@angular/core';
import {MsfTableHeadCell} from "./table-head-cell";
import {MsfAbstractGrid, MsfAbstractGridItem} from "../grid/abstract-grid";
import {ElementRect} from "../helpers/position";

@Component({
  selector: 'MsfTable',
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'msf-table'
  }
})
export class MsfTable extends MsfAbstractGrid<MsfTableRow> implements AfterContentInit{
  private _isInitialized: boolean = false;

  @ContentChildren(forwardRef(() => MsfTableRow), {descendants: true})
  protected _items: QueryList<MsfTableRow>;

  _currentSorter: MsfTableHeadCell;


  constructor(private elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }


  ngAfterContentInit(): void {
    super.ngAfterContentInit();
    this._isInitialized = true;
  }


  get isInitialized(): boolean {
    return this._isInitialized;
  }
}


let rowUniqueId = 0;

@Component({
  selector: 'MsfTableRow',
  template: ` <ng-content></ng-content>`,
  host: {
    'class': 'msf-table-row'
  }
})
export class MsfTableRow extends MsfAbstractGridItem implements AfterContentInit {
  @HostBinding('attr.data-unique-id')
  public _uniqueId = `msf-gridItem-${rowUniqueId++}`;



  constructor(private msfTable: MsfTable, public elementRef: ElementRef<HTMLElement>, public changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, msfTable, changeDetectorRef);
  }


  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }


  get rect(): ElementRect {
    return {
      width: this.elementRef.nativeElement.offsetWidth,
      height: this.elementRef.nativeElement.offsetHeight,
      top: this.elementRef.nativeElement.offsetTop,
      left: this.elementRef.nativeElement.offsetLeft
    }
  }

  get table() : MsfTable {
    return this.msfTable;
  }



}
