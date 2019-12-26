import {EnumeratorIterator, ICollection, IEnumerable, IEnumerator, IList, List} from "@positon/collections";
import {ISelectable} from "./selectable";
import {EventEmitter} from "@angular/core";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";

export class Selection<T extends ISelectable> implements ICollection<T>{
  private _selection: IList<T> = new List<T>();
  private _onchange: EventEmitter<Selection<T>> = new EventEmitter<Selection<T>>();
  private _onadd: EventEmitter<T> = new EventEmitter<T>();
  private _onremove: EventEmitter<T> = new EventEmitter<T>();
  private _isSelectable: boolean = true;
  
  constructor() {}


  [Symbol.iterator](): EnumeratorIterator<T> {
    return this._selection[Symbol.iterator]();
  }


  set isSelectable(value: boolean) {
    this._isSelectable = value;
    if(!value){
      this.clear();
    }
  }

  add(value: T): boolean {
    AssertHelpers.isNotNull(value);

    if(!this.isSelectable){
      return false;
    }

    if(!value.isSelectable()){
      return false;
    }

    if(this.contains(value)){
      return false;
    }

    value.select();
    this._selection.add(value);

    this.onadd.emit(value);
    this.onchange.emit(this);
    return true;
  }

  addAll(items: IEnumerable<T>): boolean {
    items.forEach(item => this.add(item));
    return true;
  }

  clear(): void {
    let copy = this._selection.clone();
    this.removeAll(copy);
  }

  remove(item: T): boolean {
    AssertHelpers.isNotNull(item);
    if(!this.contains(item)){
      return false;
    }

    this._selection.remove(item);
    item.unselect();

    this.onremove.emit(item);
    this.onchange.emit(this);
    return true;
  }

  removeAll(items: IEnumerable<T>): number {
    let count = 0;
    items.forEach(item => {
      if(this.remove(item)){
        count++;
      }
    });
    return count;
  }

  removeIf(filter: (item: T) => boolean): number {
    let count = 0;
    let copy = this._selection.clone();

    copy.forEach(item => {
      if(filter(item) && this.remove(item)){
        count++;
      }
    });
    return count;
  }

  clone(): ICollection<T> {
    throw new Error("Unsupported method");
  }

  contains(item: T): boolean {
    return this._selection.contains(item);
  }

  containsAll(c: IEnumerable<T>): boolean {
    return this._selection.containsAll(c);
  }

  containsIf(filter: (item: T) => boolean): boolean {
    return this._selection.containsIf(filter);
  }

  enumerator(): IEnumerator<T> {
    return this._selection.enumerator();
  }

  equals(collection: ICollection<T>, compareFn?: (a: T, b: T) => boolean): boolean {
    return this._selection.equals(collection, compareFn);
  }

  find(filter: (item: T) => boolean): T {
    return this._selection.find(filter);
  }

  findAll(filter: (item: T) => boolean): IEnumerable<T> {
    return this._selection.findAll(filter);
  }

  forEach(action: (item: T) => void): any {
    this._selection.forEach(action);
  }

  isEmpty(): boolean {
    return this._selection.isEmpty();
  }

  size(): number {
    return this._selection.size();
  }

  toArray(): T[] {
    return this._selection.toArray();
  }


  get selection(): IList<T> {
    return this._selection;
  }

  get onchange(): EventEmitter<Selection<T>> {
    return this._onchange;
  }

  get onadd(): EventEmitter<T> {
    return this._onadd;
  }

  get onremove(): EventEmitter<T> {
    return this._onremove;
  }

  get isSelectable(): boolean {
    return this._isSelectable;
  }
}
