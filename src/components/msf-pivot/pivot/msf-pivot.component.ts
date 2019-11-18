import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ColorTheme} from "../../helpers/theme";
import {MsfPivotItemComponent} from "../pivot-item/msf-pivot-item.component";

@Component({
  templateUrl: "msf-pivot.component.html"
})
export class MsfPivotComponent {
  @Input()
  public theme: ColorTheme;

  @Input()
  public defaultSelectedItem: MsfPivotItemComponent;

  @Input()
  LabelAlignment: string;


  @Output()
  public onchange:EventEmitter<MsfPivotComponent> = new EventEmitter<MsfPivotComponent>();


  /**
   * The index of the active pivot item.
   */
  public selectedItemIndex: number;
  public selectedItem: MsfPivotItemComponent;
}
