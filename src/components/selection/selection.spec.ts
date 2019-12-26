import {ISelectable} from "./selectable";
import {Selection} from "./selection";
import {EventEmitter} from "@angular/core";
import {List} from "@positon/collections";

describe("selection spec", () => {

  let selection:Selection<Selectable>;

  beforeEach(() => {
    selection = new Selection();
  });

  test("add item", () => {
    let item = new Selectable();
    expect(selection.add(item)).toBeTruthy();
    expect(selection.contains(item)).toBeTruthy();
    expect(item.isSelected()).toBeTruthy();
  });

  test("try ass same item two time", () => {
    let item = new Selectable();
    selection.add(item);
    expect(selection.add(item)).toBeFalsy();
    expect(selection.size()).toBe(1);
  });

  test("try add non selectable item", () => {
    let item = new Selectable();
    item.selectable = false;
    expect(selection.add(item)).toBeFalsy();
    expect(selection.contains(item)).toBeFalsy();
    expect(item.isSelected()).toBeFalsy();
  });

  test("try add non selectable state is false", () => {
    selection.isSelectable = false;
    let item = new Selectable();

    expect(selection.add(item)).toBeFalsy();
    expect(selection.contains(item)).toBeFalsy();
    expect(item.isSelected()).toBeFalsy();
  });

  test("set selectable state to false will clear selection", () => {
    selection.add(new Selectable());
    selection.add(new Selectable());

    selection.isSelectable = false;

    expect(selection.size()).toBe(0);
  });



  test("remove item", () => {
    let item = new Selectable();

    selection.add(item);

    expect(selection.remove(item)).toBeTruthy();
    expect(selection.contains(item)).toBeFalsy();
    expect(item.isSelected()).toBeFalsy();
  });

  test("try remove non selected item", () => {
    let item = new Selectable();

    expect(selection.remove(item)).toBeFalsy();
    expect(selection.contains(item)).toBeFalsy();
    expect(item.isSelected()).toBeFalsy();
  });
});

class Selectable implements ISelectable {
  private _selected: boolean;
  private _selectable: boolean = true;

  onselectionstatechange: EventEmitter<ISelectable>;

  isSelectable(): boolean {
    return this._selectable;
  }

  isSelected(): boolean {
    return this._selected;
  }

  select(): boolean {
    return this._selected = true;
  }

  unselect(): boolean {
    return this._selected = false;
  }


  set selectable(value: boolean) {
    this._selectable = value;
  }
}
