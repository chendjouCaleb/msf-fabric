import { IList} from "@positon/collections";
import {AbstractGridItem} from "./abstract-grid-item";
import {EventEmitter, Input, Output} from "@angular/core";
import {coerceBooleanProperty} from "../utils/boolean-property";
import {AbstractGridController} from "./abstract-grid-controller";
import {Selection} from "../selection/selection";

export abstract class AbstractGrid<T extends AbstractGridItem>{
  @Input()
  items: IList<T>;

  @Input()
  set selectable(state: boolean){
    const s = coerceBooleanProperty(state);
    this.controller.selection.isSelectable = s;

  }

  get selectable(): boolean { return this.controller.selection.isSelectable; }

  @Output()
  onchange: EventEmitter<T> = new EventEmitter();

  @Output()
  onselectionchange: EventEmitter<Selection<T>> = this.controller.selection.onchange;

  constructor(protected controller: AbstractGridController<T>) {}
}
