import {EventEmitter} from "@angular/core";

export interface ISelectable {
  select(): boolean;
  unselect(): void;
  isSelected(): boolean;
  isSelectable(): boolean;

  onselectionstatechange: EventEmitter<ISelectable>;

}
