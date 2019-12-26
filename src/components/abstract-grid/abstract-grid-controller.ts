import {EnumeratorIterator, IEnumerable, IList, List, UnsupportedOperationException} from "@positon/collections";
import {AbstractGridItem} from "./abstract-grid-item";
import {AbstractGrid} from "./abstract-grid";
import {Selection} from "../selection/selection";
import {EventEmitter } from "@angular/core";
import {AbstractCollection} from "@positon/collections/dist/abstract-collection";

export abstract class AbstractGridController<T extends AbstractGridItem> extends AbstractCollection<T> implements IList<T>{
  protected items: IList<T> = new List<T>();
  private _selection: Selection<T> = new Selection<T>();

  private _onselectionchange: EventEmitter<Selection<T>> = this.selection.onchange;

  abstract grid: AbstractGrid<T>;

  abstract insert(index: number, item: T): void;
  abstract removeAt(index: number): void;

  abstract sort(compareFn?: (a: T, b: T) => number): any;

  [Symbol.iterator](): EnumeratorIterator<T> {
    return this.items[Symbol.iterator]();
  }

  findIndex(matcherFn: (item: T) => boolean, startIndex: number, count: number): number {
    return this.items.findIndex(matcherFn, startIndex, count);
  }

  get(index: number): T {
    return this.items.get(index);
  }

  getRange(startIndex: number, count: number): IList<T> {
    return this.items.getRange(startIndex, count);
  }

  indexOf(item: T, index: number, count?: number): number {
    return this.items.indexOf(item, index, count);
  }



  insertRange(collection: IEnumerable<T>, index: number): void {
    let i = index;
    collection.forEach(item => {
      this.insert(i, item);
      i++;
    })
  }

  lastIndexOf(item: T, index: number, count: number): any {
    return this.items.lastIndexOf(item, index, count);
  }

  set(index: number, item: T) {
    throw new UnsupportedOperationException("This method is not supported");
  }

  removeRange(index: number, count: number): void {
    for(let i = index; i < index+count; i++){
      this.removeAt(i);
    }
  }


  get selection(): Selection<T> {
    return this._selection;
  }

}
