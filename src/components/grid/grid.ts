import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef, EventEmitter,
  forwardRef, Input,
  QueryList,

} from "@angular/core";
import {MsfGridItem} from "./grid-item";
import {List} from "@positon/collections";


let uniqueId: number = 0;


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
      item._grid = this;
      item._index = index;
      item._lastRect = item.rect;
    });


    this._items.changes.subscribe(change => {
      setTimeout(() => {
        this.play();
      }, 100)

    })
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
  }

  _sortBy(param: string) {
    this._sortedItems.sort((a, b) => a.value[param] - b.value[param]);
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


  _defaultClick(item: MsfGridItem) {
    this.sortedItems.forEach(el => {
      if (item !== el) {
        el.selected = false;
      }
    });

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

    if(startIndex == endIndex) {
      return;
    }

    if (startIndex > endIndex) {
      //permute index.
      let tmp = endIndex;
      startIndex = endIndex;
      endIndex = tmp;
    }


    if (startIndex > 0) {
      this.sortedItems.slice(0, startIndex - 1).forEach(item => this._unselect(item));
    }

    this.sortedItems.slice(startIndex, endIndex).forEach(item => this._select(item));

    if (endIndex < this.sortedItems.size() - 1) {
      this.sortedItems.slice(endIndex + 1, this.sortedItems.size() - 1).forEach(item => this._unselect(item));
    }
  }

  _getNearestSelectedIndex(index: number): number {
    if (this._selection.size() == 1) {
      return -1;
    }
    let after = this._getNearestSelectedIndexAfter(index);
    let before = this._getNearestSelectedIndexBefore(index);

    if (after === -1) {
      return before;
    }
    if (before === -1) {
      return after;
    }

    return Math.min(after, before);
  }

  _getNearestSelectedIndexBefore(index: number): number {
    for (let i = index - 1; i >= 0; i--) {
      if (this.sortedItems.get(i).selected) {
        return i;
      }
    }
    return -1;
  }


  _getNearestSelectedIndexAfter(index: number): number {
    for (let i = index + 1; i < this.sortedItems.size(); i--) {
      if (this.sortedItems.get(i).selected) {
        return i;
      }
    }
    return -1;
  }

  get items(): QueryList<MsfGridItem> {
    return this._items;
  }


  get sortedItems(): List<MsfGridItem> {
    return this._sortedItems;
  }

  play() {

    this._items.forEach(item => {
      console.log(`${item._lastRect.left} => ${item.rect.left}`);

      const deltaX = item._lastRect.left - item.rect.left;
      const deltaY = item._lastRect.top - item.rect.top;
      item._lastRect = item.rect;
      item.element.style.opacity = "1"

      item.element.animate([{
        transform: `translate(${deltaX}px, ${deltaY}px)`
      }, {
        transform: 'none'
      }], {
        duration: 200,
        easing: 'ease-in-out',
        fill: "both"
      });
    });
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
  get selections(): List<MsfGridItem> {
    return this.sortedItems.findAll(item => item.selected);
  }

  _emitSelectionChange() {
    this.selectionChange.emit(this._selection);
  }
}
