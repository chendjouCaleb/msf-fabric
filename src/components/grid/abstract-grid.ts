import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef, HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList
} from "@angular/core";
import {toArray} from "../helpers/array";
import {Dictionary, List} from "@positon/collections";
import {ElementRect} from "../helpers/position";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";
import {MsfCheckboxGrid} from "./checkbox-grid";
import {domIndex} from "../helpers/dom";


export abstract class MsfAbstractGrid<T extends MsfAbstractGridItem> implements AfterContentInit {
  /** Counter to add a index to item. This method is used to prevent a ExpressionChangedAfterItHasBeenCheckedError */
  _itemIndexCounter = 0;
  protected abstract _queryList: QueryList<T>;

  /** Tells if the content view is totally initialised */
  abstract isInitialized: boolean;


  private _selectedClassNames: string | string[];

  /**
   * The last item selected without shift keyPressed.
   */
  private _lastNonShiftSelected: T = null;

  protected _selection: List<T> = new List<T>();

  protected _items = new List<T>();

  private _sortedItems = new List<T>();

  private _hiddenItems = new Dictionary<number, MsfAbstractGridItem>();


  /**
   * Whether the user can select a grid item.
   */
  @Input()
  selectable: boolean = false;

  /**
   * When this mode is active, the item is selected when the click on it.
   * Otherwise, you must put a checkbox inside item to select it.
   */
  @Input()
  selectionMode: boolean;

  @Output()
  selectionChange: EventEmitter<List<T>> = new EventEmitter<List<T>>();


  constructor(protected _elementRef: ElementRef<HTMLElement>) {
  }


  ngAfterContentInit(): void {
  }

  public _addNewItem(item: T) {
    AssertHelpers.isNotNull(item, `Require non null argument: 'item'`);
    if (!item.selectedClassNames) {
      item.selectedClassNames = this.selectedClassNames;
    }

    this.sortedItems.add(item);
    this._items.add(item);

    if (item._checkbox) {
      item._checkbox.checkbox.change.subscribe(event => {
        if (event.checked) {
          this._checkboxEvent(item, event.nativeEvent.shiftKey);
        } else {
          this.unselect(item);
        }
      })
    }

    // the new item can change position of other items.
    this.sortedItems.forEach(_item => _item._lastRect = _item.rect);


  }

  remove(item: T) {
    this._items.remove(item);
    this._sortedItems.remove(item);
    this._hiddenItems.remove(item._sortOrder);
    this.sortedItems.forEach(_item => _item._lastRect = _item.rect);

    if (this.isSelected(item)) {
      this.unselect(item);
    }
    let counter = 0;
    this._sortedItems.forEach((item, index) => {
      item._sortOrder = index;
      if (item.isVisible) {
        item._visibleSortOrder = counter++;
      }
    });
    setTimeout(() => this._translate(), 10)
  }


  async hide(item: MsfAbstractGridItem): Promise<void> {
    item._isHidden = true;

    this.sortedItems.forEach(_item => {
      if (_item.isVisible) {
        _item._visibleSortOrder--;
      }
    });
    this._translate();

    let transform = item.element.style.transform;

    item.element.animate([{
      transform: transform ? transform: `scaleY(1)`
    }, {
      transform: 'scaleY(0)'
    }], {
      duration: 200,
      fill: 'both'
    });
  }

  show(item: MsfAbstractGridItem) {
    item._isHidden = false;
    this.sortedItems.forEach(_item => {
      if (_item.isVisible) {
        _item._visibleSortOrder++;
      }
    });
    item.element.animate([{
      transform: `scaleY(0)`
    }, {
      transform: item._translate? item._translate : 'none'
    }], {
      duration: 200,
      fill: 'both'
    }).onfinish = () => this._translate();



  }

  /** Whether the item is correctly selected. */
  isSelected(item: T) {
    return item && item.selected && this._selection.contains(item) && item.element.classList.contains("msf-selected");
  }


  /**
   * Add a item to the user selection.
   * @param item The item to select.
   */
  select(item: T) {
    if (!this.selectable || !item.selectable || item.selected) {
      return;
    }
    this._select(item);
    this._emitSelectionChange();
  }

  //this method dont emit event
  _select(item: T) {
    if (!this.selectable || !item.selectable || item.selected) {
      return;
    }

    item.selected = true;

    if (item._checkbox) {
      item._checkbox.checkbox.checked = true;
    }
    this._selection.add(item);
  }


  /**
   * Removes a item from the user selection.
   * @param item The item to select.
   */
  unselect(item: T) {
    if (!item.selectable || !item.selectable || !item.selected) {
      return;
    }

    this._unselect(item);
    this._emitSelectionChange();
  }

  // This method dont emit event.
  _unselect(item: T) {
    if (!item.selectable || !item.selectable || !item.selected) {
      return;
    }

    item.selected = false;
    if (item._checkbox) {
      item._checkbox.checkbox.checked = false;
    }
    this._selection.remove(item);
  }


  selectRange(startIndex: number = 0, endIndex: number = this._sortedItems.length - 1) {
    if (!this.selectable) {
      return;
    }
    this._selectRange(startIndex, endIndex);
    this._emitSelectionChange();
  }

  _selectRange(startIndex: number, endIndex: number = this._sortedItems.length - 1) {
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


  unselectRange(startIndex: number = 0, endIndex: number = this._sortedItems.length - 1) {
    if (!this.selectable) {
      return;
    }
    this._unselectRange(startIndex, endIndex);
    this._emitSelectionChange();
  }


  _unselectRange(startIndex: number = 0, endIndex: number = this.length - 1) {
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

  _onItemClickEvent(item: T, event: MouseEvent) {

    if (event.ctrlKey) {
      this._ctrlClick(item);
    } else if (event.shiftKey) {
      this._shiftClick(item);
    } else {
      this._defaultClick(item);
    }
  }


  _checkboxEvent(item: T, shiftKey: boolean) {
    if (shiftKey) {
      this._shiftClick(item);
    } else {
      this._defaultCheckboxClick(item);
    }
  }

  _defaultClick(item: T) {
    this.sortedItems.forEach(el => {
      if (item !== el) {
        this.unselect(el)
      }
    });

    this.select(item);
    this._lastNonShiftSelected = item;
  }

  _defaultCheckboxClick(item: T) {
    this.select(item);
    this._lastNonShiftSelected = item;
  }

  _ctrlClick(item: T) {
    if (item.selected) {
      this._unselect(item);
    } else {
      this.select(item);
      this._lastNonShiftSelected = item;
    }
  }

  _shiftClick(item: T) {
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

  _translate() {
    this.visibleSortedItems.forEach((item, i) => {
      let opposite = this.items.get(i);
      const deltaX = item.rect.left - opposite.rect.left;
      const deltaY = item.rect.top - opposite.rect.top;

      item._translate = `translate(${-deltaX}px, ${-deltaY}px)`;
      item.element.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`;
    });
  }

  sort(sortFn: (a: any, b: any) => number = (a, b) => a - b) {
    this._sortedItems.sort((a, b) => sortFn(a.value, b.value));
    let counter = 0;
    this._sortedItems.forEach((item, index) => {
      item._sortOrder = index;
      if (item.isVisible) {
        item._visibleSortOrder = counter++;
      }
    });
    this._translate();
  }

  sortBy(param: string) {
    console.log(this.sortedItems.get(0).value[param])

    this._sortedItems.sort((a, b) => ('' + a.value[param]).localeCompare(b.value[param]));
    //this._sortedItems.sort((a, b) => a.value[param] - b.value[param]);
    let counter = 0;
    this._sortedItems.forEach((item, index) => {
      item._sortOrder = index;
      if (item.isVisible) {
        item._visibleSortOrder = counter++;
      }
    });
    this._translate();
  }

  invertSorting() {
    this._sortedItems.reverse();
    let counter = 0;
    this._sortedItems.forEach((item, index) => {
      item._sortOrder = index;
      if (item.isVisible) {
        item._visibleSortOrder = counter++;
      }
    });
    this._translate();
  }

  @Input()
  get selectedClassNames(): string | string[] {
    return this._selectedClassNames
  }

  set selectedClassNames(value: string | string[]) {
    AssertHelpers.isNotNull(value);
    this.sortedItems.forEach(item => item.selectedClassNames = value);
    this._selectedClassNames = value;
  }


  _emitSelectionChange() {
    this.selectionChange.emit(this._selection);
  }


  get element(): HTMLElement {
    return this._elementRef.nativeElement;
  }


  get selectedValues(): List<any> {
    return this._selection.convertAll(i => i.value);
  }


  get sortedItems(): List<T> {
    return this._sortedItems;
  }

  get visibleItems(): List<T> {
    return this.items.findAll(i => i.isVisible);
  }

  get visibleSortedItems(): List<T> {
    return this.sortedItems.findAll(i => i.isVisible);
  }

  get queryList(): QueryList<T> {
    return this._queryList;
  }

  get items(): List<T> {
    return this._items;
  }

  /**
   * Gets the number of item of the grid.
   */
  get length(): number {
    if (!this._sortedItems) {
      return 0;
    }
    return this._sortedItems.length;
  }

  get isSelectedAll(): boolean {
    return this._selection.length === this._sortedItems.length;
  }

  get selection(): List<T> {
    return this._selection.getRange();
  }


  get hiddenItems(): Dictionary<number, MsfAbstractGridItem> {
    return this._hiddenItems;
  }
}


export abstract class MsfAbstractGridItem implements AfterContentInit, OnDestroy {
  /**
   * The real position of the with without translation.
   */
  _lastRect: ElementRect;

  _sortOrder: number = 0;

  _visibleSortOrder: number = 0;

  @HostBinding('class.msf-tableRow-hidden')
  _isHidden: boolean = false;

  _isAdded: boolean = false;

  /** Whether the item is selected */
  private _selected: boolean;

  @Input()
  value: any;

  @Input()
  public selectedClassNames: string | string[] = "msf-selected";

  @Input()
  selectable: boolean = true;

  @ContentChild(forwardRef(() => MsfCheckboxGrid))
  _checkbox: MsfCheckboxGrid;
  _translate: string;

  protected constructor(protected _elementRef: ElementRef<HTMLElement>,
                        protected _parent: MsfAbstractGrid<MsfAbstractGridItem>,
                        public changeDetectorRef: ChangeDetectorRef) {

  }

  ngAfterContentInit(): void {

    this._lastRect = this.rect;
    this.parent._addNewItem(this);
  }

  @HostListener("click", ["$event"])
  _clickEvent(event: MouseEvent) {
    if (this.parent) {
      this.parent._onItemClickEvent(this, event);
    }
  }


  get selected(): boolean {
    return this._selected;
  }

  set selected(value: boolean) {
    if (this.selectable) {
      this._selected = value;

      if (value) {
        toArray(this.selectedClassNames).forEach(v => this.element.classList.add(v));
      } else {
        toArray(this.selectedClassNames).forEach(v => this.element.classList.remove(v));
      }
    }

  }

  get element(): HTMLElement {
    return this._elementRef.nativeElement;
  }


  get parent(): MsfAbstractGrid<MsfAbstractGridItem> {
    return this._parent;
  }

  get rect(): ElementRect {
    return {
      top: this.element.offsetTop,
      left: this.element.offsetLeft
    }
  }

  get index(): number {
    if (this.element.parentElement) {
      return domIndex(this.element);
    }
    return 0;
  }

  ngOnDestroy(): void {
    this._parent.remove(this);
  }

  hide() {
    this._parent.hide(this);
  }

  show() {
    this._parent.show(this);
  }

  get isVisible(): boolean {
    return !this._isHidden;
  }
}
