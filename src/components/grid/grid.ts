import {
  AfterContentInit,
  Component, ContentChild,
  ContentChildren,
  ElementRef, EventEmitter,
  forwardRef, HostListener, Input, OnChanges, OnDestroy, OnInit, Optional,
  QueryList, SimpleChanges, ViewChild,

} from "@angular/core";

import {List} from "@positon/collections";
import {MsfCheckbox, MsfCheckboxChange} from "../checkbox/checkbox";
import {ElementRect} from "../helpers/position";


export interface MsfGridUserEvent {
  ctrlKey: boolean;
  shiftKey: boolean;
}

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
export class MsfGrid implements AfterContentInit {

  private _uniqueId = `msf-grid-${uniqueId++}`;

  /** The width of item of the grid. */
  private _width: number | null = 100;

  /** The height of item of the grid. */
  private _height: number | null = 100;

  /** The x margin between items */
  private _xMargin: number = 10;

  /** The y margin between items */
  private _yMargin: number = 10;


  /** Items per line. The width item is obtained
   * by dividing the grid width by this value
   */
  private _itemsPerLine: number | null = null;


  /**
   * The last item selected without shift keyPressed.
   */
  private _lastNonShiftSelected: MsfGridItem = null;


  /**
   * Whether the user can select a grid item.
   */
  @Input()
  selectable: boolean = false;


  /**
   * When this mode is active, the item is selected when the click on it.
   */
  @Input()
  selectionMode: boolean;


  get values(): List<any> {
    return this._selection.convertAll(i => i.value);
  }

  private _selection: List<MsfGridItem> = new List<MsfGridItem>();

  selectionChange: EventEmitter<List<MsfGridItem>> = new EventEmitter<List<MsfGridItem>>();


  @ContentChildren(forwardRef(() => MsfGridItem), {descendants: true})
  private _items: QueryList<MsfGridItem>;

  private _sortedItems = new List<MsfGridItem>();

  private _isReady: boolean = false;

  constructor(private _elementRef: ElementRef<HTMLElement>) {
  }

  ngAfterContentInit(): void {
    this._isReady = true;

    this._sortedItems = List.fromArray(this._items.toArray());


    if (this._width) {
      this.width = this._width;
    }
    if (this._height) {
      this.height = this._height;
    }
    this._items.forEach((item, index) => {

      item._index = index;
      item._lastRect = item.rect;
    });


  }


  /** Whether the item is correctly selected. */
  isSelected(item: MsfGridItem) {
    return item && item.selected && this._selection.contains(item) && item.element.classList.contains("msf-selected");
  }


  /**
   * Add a item to the user selection.
   * @param item The item to select.
   */
  select(item: MsfGridItem) {
    if (!this.selectable || !item.selectable || item.selected) {
      return;
    }
    this._select(item);
    this._emitSelectionChange();
  }

  _select(item: MsfGridItem) {
    if (!this.selectable || !item.selectable || item.selected) {
      return;
    }

    item.selected = true;

    if (item._checkbox) {
      item._checkbox.checked = true;
    }
    this._selection.add(item);

  }

  /**
   * Removes a item from the user selection.
   * @param item The item to select.
   */
  unselect(item: MsfGridItem) {
    if (!item.selectable || !item.selectable || !item.selected) {
      return;
    }

    this._unselect(item);
    this._emitSelectionChange();
  }

  _unselect(item: MsfGridItem) {
    if (!item.selectable || !item.selectable || !item.selected) {
      return;
    }

    item.selected = false;
    if (item._checkbox) {
      item._checkbox.checked = false;
    }
    this._selection.remove(item);
  }

  selectAll() {
    if (!this.selectable) {
      return;
    }

    this._items.forEach(item => {
      this._select(item);
    });

    this._emitSelectionChange();
  }

  selectRange(startIndex: number, endIndex: number = this._items.length - 1) {
    if (!this.selectable) {
      return;
    }
    this._selectRange(startIndex, endIndex);
    this._emitSelectionChange();
  }

  _selectRange(startIndex: number, endIndex: number = this._items.length - 1) {
    if (!this.selectable) {
      return;
    }
    if (endIndex < startIndex) {
      return;
    }

    if (startIndex < 0) {
      startIndex = 0;
    }

    if (endIndex > this.length - 1) {
      endIndex = this.length - 1
    }

    for (let i = startIndex; i <= endIndex; i++) {
      this._select(this._sortedItems.get(i));
    }

  }


  _unselectRange(startIndex: number, endIndex: number = this._items.length - 1) {
    if (!this.selectable) {
      return;
    }
    if (endIndex < startIndex) {
      return;
    }

    if (startIndex < 0) {
      startIndex = 0;
    }

    if (endIndex > this.length - 1) {
      endIndex = this.length - 1
    }

    for (let i = startIndex; i <= endIndex; i++) {
      this._unselect(this._sortedItems.get(i));
    }

  }


  /**
   * Invert the selection of the grid.
   * All selected item will be unselected.
   * And all unselected items will be selected.
   */
  invertSelection() {
    if (!this.selectable) {
      return;
    }

    this._sortedItems.forEach(item => {
      if (!item.selected) {
        this._select(item);
      } else if (item.selected) {
        this._unselect(item);
      }
    });

    this._emitSelectionChange();
  }

  destroy(item: MsfGridItem) {

  }

  sort(compareFn?: (a: MsfGridItem, b: MsfGridItem) => number) {
  }

  private _lastLength;


  @Input()
  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
    if (this._items) {
      this._items.forEach(item => item.element.style.width = `${value}px`)
    }
  }


  @Input()
  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
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

    if (this._items) {
      this._items.forEach(item => item.element.style.marginRight = `${value}px`);
      this._items.forEach(item => item.element.style.marginLeft = `${value}px`);
    }
  }


  @Input()
  get yMargin(): number {
    return this._yMargin;
  }

  set yMargin(value: number) {
    this._yMargin = value;

    if (this._items) {
      this._items.forEach(item => item.element.style.marginTop = `${value}px`);
      this._items.forEach(item => item.element.style.marginBottom = `${value}px`);
    }
  }


  @Input()
  get itemsPerLine(): number | null {
    return this._itemsPerLine;
  }

  set itemsPerLine(value: number) {
    this._itemsPerLine = value;
  }


  _sort(sortFn: (a: any, b: any) => number = (a, b) => a - b) {
    this._sortedItems.sort((a, b) => sortFn(a.value, b.value));
    this.translate();
  }

  _sortBy(param: string) {
    //this._sortedItems.sort((a, b) => (''+ a.value[param]).localeCompare( b.value[param]));
    this._sortedItems.sort((a, b) => a.value[param] - b.value[param]);
    this.translate();
  }

  _invertSorting() {
    this._sortedItems.reverse();
    this.translate();
  }

  translate() {
    let items = this._items.toArray();
    this._sortedItems.forEach((item, i) => {
      let opposite = items[i];


      const deltaX = item._lastRect.left - opposite._lastRect.left;
      const deltaY = item._lastRect.top - opposite._lastRect.top;

      console.log(`translate(${-deltaX}, ${-deltaY})`);

      item.element.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`
    });
  }


  _clickEvent(item: MsfGridItem, event: MouseEvent) {
    if (event.ctrlKey) {
      this._ctrlClick(item);
    } else if (event.shiftKey) {
      this._shiftClick(item);
    } else {
      this._defaultClick(item);
    }
  }


  _checkboxEvent(item: MsfGridItem, shiftKey: boolean) {
    if (shiftKey) {
      this._shiftClick(item);
    } else {
      this._defaultCheckboxClick(item);
    }
  }

  _defaultClick(item: MsfGridItem) {
    this.sortedItems.forEach(el => {
      if (item !== el) {
        this.unselect(el)
      }
    });

    this.select(item);
    this._lastNonShiftSelected = item;
  }

  _defaultCheckboxClick(item: MsfGridItem) {
    this.select(item);
    this._lastNonShiftSelected = item;
  }

  _ctrlClick(item: MsfGridItem) {
    if (item.selected) {
      this._unselect(item);
    } else {
      this.select(item);
      this._lastNonShiftSelected = item;
    }
  }

  _shiftClick(item: MsfGridItem) {
    let startItem = this._lastNonShiftSelected || this.sortedItems.get(0);
    let startIndex = this.sortedItems.indexOf(startItem);
    let endIndex = this.sortedItems.indexOf(item);

    if (startIndex == endIndex) {
      return;
    }

    if (startIndex > endIndex) {
      //permute index.
      let tmp = endIndex;
      endIndex = startIndex;
      startIndex = tmp;
    }


    if (startIndex > 0) {
      this.sortedItems.slice(0, startIndex - 1).forEach(item => this._unselect(item));
    }

    this.sortedItems.slice(startIndex, endIndex).forEach(item => this._select(item));

    if (endIndex < this.sortedItems.size() - 1) {
      this.sortedItems.slice(endIndex + 1).forEach(item => this._unselect(item));
    }
  }


  get items(): QueryList<MsfGridItem> {
    return this._items;
  }


  get sortedItems(): List<MsfGridItem> {
    return this._sortedItems;
  }

  /**
   * Gets the number of item of the grid.
   */
  get length(): number {
    if (!this._items) {
      return 0;
    }
    return this._items.length;
  }

  get elementRef(): ElementRef<HTMLElement> {
    return this._elementRef;
  }

  /**
   * The list of selected items.
   */
  get selection(): List<MsfGridItem> {
    return this.sortedItems.findAll(item => item.selected);
  }

  _emitSelectionChange() {
    this.selectionChange.emit(this._selection);
  }
}



@Component({
  templateUrl: "grid-item.html",
  selector: "MsfGridItem, [MsfGridItem]",
  host: {
    "class": "msf-gridItem",
    "[class.msf-selected]": "selected"
  }
})
export class MsfGridItem implements OnInit, OnDestroy, OnChanges, AfterContentInit {
  private _uniqueId = `msf-gridItem-${uniqueId++}`;

  /** Whether the item is selected */
  private _selected: boolean;

  _x: number;
  _y: number;
  _sortOrder: number;

  _lastRect: ElementRect;


  @Input()
  value: any;

  @Input()
  selectable: boolean = true;

  @ContentChild(forwardRef(() => MsfCheckbox), {static: false})
  _checkbox: MsfCheckbox;

  constructor(private elementRef: ElementRef<HTMLElement>, @Optional() private _grid: MsfGrid) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    //console.log(this.rect)
  }

  @ViewChild("msfGridItemSelector", {static: false})
  selectorElement: ElementRef<HTMLInputElement>;


  _index: number;
  tempRect: ElementRect;

  @Input()
  get selected(): boolean {
    return this._selected;
  }

  set selected(value: boolean) {
    if (this.selectable) {
      this._selected = value;
    }

  }

  /**
   * Gets the index of the elementRef in the DOM list element of the direct parent.
   */
  get domIndex(): number {
    return Array.from(this.elementRef.nativeElement.parentNode.children)
      .indexOf(this.elementRef.nativeElement);
  }

  get rect(): ElementRect {
    return this.element.getBoundingClientRect();
  }

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngOnDestroy(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngAfterContentInit(): void {
    this._lastRect = this.rect;

    if(this._checkbox){
      this._checkbox.change.subscribe(event => {
        if(event.checked){
          this._grid._checkboxEvent(this, event.nativeEvent.shiftKey);
        }
      })
    }
  }

  @HostListener("click", ["$event"])
  _clickEvent(event: MouseEvent) {
    if(this._grid){
      this._grid._clickEvent(this, event);
    }
  }

}





