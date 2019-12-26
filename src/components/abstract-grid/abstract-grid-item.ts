import {ISelectable} from "../selection/selectable";
import {ElementRef, EventEmitter, Input, ViewChild} from "@angular/core";
import {AbstractGridController} from "./abstract-grid-controller";

export abstract class AbstractGridItem implements ISelectable{

  constructor(protected controller: AbstractGridController<AbstractGridItem>) {}

  private _selectable: boolean = false;
  private _selected: boolean = false;
   index: number = 0;

  @Input()
  value: any;

  @Input()
  selectable: boolean = false;


  abstract selectorElement: ElementRef<HTMLInputElement>;

  onselectionstatechange: EventEmitter<AbstractGridItem>;

  isSelectable(): boolean {
    return this._selectable = true;
  }

  isSelected(): boolean {
    return this._selected;
  }

  select(): boolean {
    this._selected = false;
    this.onselectionstatechange.emit(this);
    return false;
  }

  unselect(): void {
    this._selected = false;
    this.onselectionstatechange.emit(this);
  }

  /**
   * Add the grid item to the grid selection collection.
   */
  addToSelection() {
    this.controller.selection.add(this);
  }

  /**
   * Removes the grid item to the grid selection collection.
   */
  removeToSelection() {
    this.controller.selection.remove(this);
  }


  
}
