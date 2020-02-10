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
    "class" : "msf-grid"
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
   * Whether the user can select a grid item.
   */
  private _selectable: boolean = false;

  /**
   * When this mode is active, the item is selected when the click on it.
   */
  @Input()
  selectionMode: boolean;

  @Input() private _singleSelection: boolean;


  private _selection: List<MsfGridItem> = new List<MsfGridItem>();

  get values(): List<any> {
    return this._selection.convertAll(i => i.value);
  }

  selectionChange: EventEmitter<MsfGrid> = new EventEmitter<MsfGrid>();
  /**
   * Add a item to the user selection.
   * @param item The item to select.
   */
  select(item: MsfGridItem) {

  }

  /**
   * Removes a item from the user selection.
   */
  unselect(item: MsfGridItem) {

  }

  selectAll() {

  }

  destroy(item: MsfGridItem){

  }

  sort(compareFn?: (a: MsfGridItem, b: MsfGridItem) => number) {}

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
      this._items.forEach(item => item.element.style.height = `${value}px`)
    }
  }


  @Input()
  get xMargin(): number { return this._xMargin; }
  set xMargin(value: number) {
    this._xMargin = value;
  }


  @Input()
  set yMargin(value: number) {
    this._yMargin = value;
  }
  get yMargin(): number { return this._yMargin; }


  @Input()
  get itemsPerLine(): number | null { return this._itemsPerLine; }

  set itemsPerLine(value: number) {
    this._itemsPerLine = value;
  }


  @Input()
  get selectable(): boolean { return this._selectable; }

  set selectable(value: boolean) {
    this._selectable = value;
  }


  get items(): QueryList<MsfGridItem> {
    return this._items;
  }

  get singleSelection(): boolean {
    return this._singleSelection;
  }

  set singleSelection(value: boolean) {
    this._singleSelection = value;
  }

  get elementRef(): ElementRef<HTMLElement> {
    return this._elementRef;
  }

  get selection(): List<MsfGridItem> {
    return this._selection;
  }

  @ContentChildren(forwardRef(() => MsfGridItem), {descendants: true})
  private _items: QueryList<MsfGridItem>;

  constructor(private _elementRef: ElementRef<HTMLElement>) {

    this._elementRef.nativeElement.classList.add("msf_Grid");
  }

  ngAfterContentInit(): void {


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

  preplay() {
    this._items.forEach(item => {
      item.element.style.opacity = "0"
    })
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
}
