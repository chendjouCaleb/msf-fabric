import {
  AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  QueryList,
} from "@angular/core";
import {MsfAbstractGrid, MsfAbstractGridItem} from "./abstract-grid";


let uniqueId: number = 0;


//todo Add keyboard EventListener method.
//todo implement items per line.
@Component({
  selector: "MsfGrid, [MsfGrid]",
  templateUrl: "grid.html",
  host: {
    "class": "msf-grid"
  }

})
export class MsfGrid extends MsfAbstractGrid<MsfGridItem> implements AfterContentInit {

  @HostBinding('attr.data-unique-id')
  private _uniqueId = `msf-grid-${uniqueId++}`;

  private _isInitialized: boolean = false;


  /** The height of item of the grid.
   * To use if the grid dont have a fixed height.
   * */
  private _itemHeight: number | null = 100;

  /** The x margin between items */
  private _xMargin: number = 10;

  /** The y margin between items */
  private _yMargin: number = 10;


  /** Items per line. */
  private _itemsPerLine: number | null = null;

  /** Items per column. */
  private _itemsPerColumn: number | null = null;


  @ContentChildren(forwardRef(() => MsfGridItem), {descendants: true})
  _items: QueryList<MsfGridItem>;



  ngAfterContentInit(): void {
    super.ngAfterContentInit();

    if(this._itemHeight){
      this.itemHeight = this._itemHeight;
    }

    this._isInitialized = true;
  }

  /**
   * Configures a new item when is added after the initialisation of the grid.
   * @param item The new item.
   * @private
   */
  public _addNewItem(item: MsfGridItem) {

    super._addNewItem(item);
    if(this._itemHeight){
      item.element.style.height = `${this.itemHeight}px`;
    }



    //this.translate();
  }

  sort(compareFn?: (a: MsfGridItem, b: MsfGridItem) => number) {
  }



  @Input()
  get itemHeight(): number {
    return this._itemHeight;
  }

  set itemHeight(value: number) {
    this._itemHeight = value;
    if (this._items) {
      this._items.forEach(item => item.element.style.height = `${value}px`);
    }
  }


  @Input()
  get xMargin(): number {
    return this._xMargin;
  }

  set xMargin(value: number) {
    this._xMargin = value;
    this.element.style.gridColumnGap = value.toString();
  }


  @Input()
  get yMargin(): number {
    return this._yMargin;
  }

  set yMargin(value: number) {
    this._yMargin = value;
    this.element.style.gridRowGap = value.toString();
  }


  @Input()
  get itemsPerLine(): number | null {
    return this._itemsPerLine;
  }

  set itemsPerLine(value: number) {
    this._itemsPerLine = value;
    let fr = "";
    for(let i = 0; i < value; i++){
      fr += "1fr ";
    }
    this.element.style.gridTemplateColumns = fr.trim();
  }

  @Input()
  get itemsPerColumn(): number | null {
    return this._itemsPerColumn;
  }

  set itemsPerColumn(value: number) {
    this._itemsPerColumn = value;
    let fr = "";
    for(let i = 0; i < value; i++){
      fr += "1fr ";
    }
    this.element.style.gridTemplateRows = fr.trim();
  }


  _sort(sortFn: (a: any, b: any) => number = (a, b) => a - b) {
    this.sortedItems.sort((a, b) => sortFn(a.value, b.value));
    this.translate();
  }

  _sortBy(param: string) {
    //this._sortedItems.sort((a, b) => (''+ a.value[param]).localeCompare( b.value[param]));
    this.sortedItems.sort((a, b) => a.value[param] - b.value[param]);
    this.translate();
  }

  _invertSorting() {
    this.sortedItems.reverse();
    this.translate();
  }

  translate() {
    let items = this._items.toArray();
    this.sortedItems.forEach((item, i) => {
      let opposite = items[i];


      const deltaX = item._lastRect.left - opposite._lastRect.left;
      const deltaY = item._lastRect.top - opposite._lastRect.top;


      item.element.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`
    });
  }


  get isInitialized(): boolean {
    return this._isInitialized;
  }

}


@Component({
  templateUrl: "grid-item.html",
  selector: "MsfGridItem, [MsfGridItem]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "class": "msf-gridItem"
  }

})
export class MsfGridItem extends MsfAbstractGridItem implements OnDestroy, AfterContentInit {

  @HostBinding('attr.data-unique-id')
  public _uniqueId = `msf-gridItem-${uniqueId++}`;

  constructor(_elementRef: ElementRef<HTMLElement>, protected _grid: MsfGrid, public changeDetectorRef: ChangeDetectorRef) {
    super(_elementRef, _grid, changeDetectorRef);
  }

  ngOnDestroy(): void { }
}





