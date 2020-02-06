import {ICollection, IEnumerable, IEnumerator, List} from "@positon/collections";
import {MsfCheckbox} from "./checkbox";
import {AbstractCollection} from "@positon/collections/dist/abstract-collection";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";

export class CheckboxItems extends AbstractCollection<MsfCheckbox> {
  private _items = new List<MsfCheckbox>();
  private _selected = new List<MsfCheckbox>();

  constructor(private _name: string) {
    super();
  }

  get(index: number) {
    return this._items.get(index);
  }

  /**
   * Add a item in the group.
   * @param item The item to add.
   */
  add(item: MsfCheckbox): boolean {
    AssertHelpers.isNotNull(item);

    if (item.name !== this._name) {
      throw new Error("The checkbox should have the same name of the group");
    }
    this._items.add(item);
    return false;
  }

  /**
   * Add a item in the group selection.
   * @param item The item to add.
   */
  select(item: MsfCheckbox): boolean {
    if (!this._items.contains(item)) {
      throw Error("The item does not belong to the group");
    }

    if (this.isSelected(item)) {
      return false;
    }

    this._selected.add(item);
    return true;
  }

  remove(item: MsfCheckbox): boolean {
    if (!this.contains(item)) {
      return false;
    }

    if (this.isSelected(item)) {
      this._selected.remove(item);
    }
    this._items.remove(item);

    return true;
  }

  isSelected(item: MsfCheckbox) {
    return this._selected.contains(item);
  }

  clear(): void {
    this._items.clear();
  }


  clone(): ICollection<MsfCheckbox> {
    return this._items.clone();
  }


  enumerator(): IEnumerator<MsfCheckbox> {
    return this._items.enumerator();
  }


  equals(collection: ICollection<MsfCheckbox>, compareFn?: (a: MsfCheckbox, b: MsfCheckbox) => boolean): boolean {
    let list = new List(collection);
    return this._items.equals(list, compareFn);
  }

  findAll(filter: (item: MsfCheckbox) => boolean): IEnumerable<MsfCheckbox> {
    return this._items.findAll(filter);
  }

  size(): number {
    return this._items.size();
  }

  get length(): number {
    return this.size();
  }

  get values(): List<any> {
    return this._selected.convertAll(t => t.value);
  }

  get selected(): List<MsfCheckbox> {
    return this._selected;
  }

  trueForAll(param: (item) => boolean) {
    return this._items.trueForAll(param);
  }
}
