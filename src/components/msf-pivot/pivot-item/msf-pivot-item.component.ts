import {Component, EventEmitter, Input, Output} from "@angular/core";
import {RouterLink} from "@angular/router";
import {MsfPivotComponent} from "../pivot/msf-pivot.component";
import {ColorTheme} from "../../utils/theme";

@Component({
  templateUrl: "msf-pivot-item.component.html"
})
export class MsfPivotItemComponent {

  /**
   * Aria label for the pivot.
   */
  @Input()
  ariaLabel: string;


  /**
   * Reference to the element that the pivot is labelled by.
   * Will be cleared if aria-label is set at the same time.
   */
  @Input()
  ariaLabelledBy: string;


  /**
   * Whether the component is disabled.
   */
  @Input()
  disabled: boolean;



  @Input()
  theme: ColorTheme;

  @Input()
  routerLink: RouterLink;

  @Input()
  label: string;

  /**
   * Event to fire when the pivot is activate by the user.
   */
  onselect: EventEmitter<MsfPivotItemComponent> = new EventEmitter<MsfPivotItemComponent>();

  /**
   * Whether the pivot is currently active.
   */
  private _isSelected: boolean = false;


  /**
   * The position of the pivot in the pivots group.
   */
  private _index: number;

  select() {

  }




}
