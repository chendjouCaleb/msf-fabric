import {IEnumerable, List} from "@positon/collections";
import {Constructor} from "../helpers/behaviors/constructor";
import {HasElementRef} from "../helpers/behaviors/element-ref";
import {toArray} from "../helpers/array";

export interface CanSelect {
  selected: boolean;
  selectedClassNames: string | string[];
  selectable: boolean;
}


export interface CanSelectCollection {
  selectedClassNames: string | string[];

  selectable: boolean;

  selectionMode: boolean;

  selection: List<CanSelect>;

  isSelected(item: CanSelect);

  select(item: CanSelect);

  unselect(item: CanSelect);

  selectRange(startIndex: number, endIndex: number);

  invertSelection();

  sortedItems: List<CanSelect>;
}

export type CanSelectCtor = Constructor<CanSelect>;

export type CanSelectCollectionCtor = Constructor<CanSelectCollection>;

export function mixinSelect<T extends Constructor<HasElementRef>>(base: T): CanSelectCtor & T {
  return class extends base {

    /** Whether the item is selected */
    private _selected: boolean;

    public selectedClassNames: string | string[] = "msf-selected";


    selectable: boolean = true;


    get selected(): boolean {
      return this._selected;
    }

    set selected(value: boolean) {
      if (this.selectable) {
        this._selected = value;

        if(value) {
          toArray(this.selectedClassNames).forEach(v => this.element.classList.add(v));
        }else{
          toArray(this.selectedClassNames).forEach(v => this.element.classList.remove(v));
        }
      }

    }

    get element(): HTMLElement {
      return this._elementRef.nativeElement;
    }


    constructor(...args: any[]) {
      super(...args);
    }
  }
}


export interface ISelection<T> {
  select(item: T): boolean;

  unselect(item: T): boolean;

  clear(): T;

  toggleSelect(item: T);

  selection: IEnumerable<T>
}
