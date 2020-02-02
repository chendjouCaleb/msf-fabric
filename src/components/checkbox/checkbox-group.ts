import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MsfRadioChange} from "../radio/radio";

@Component({
  templateUrl: "checkbox-group.html",
  selector: "MsfCheckboxGroup"
})
export class MsfCheckboxGroup {




  /**
   * Event emitted when the group value changes.
   * Change events are only emitted when the value changes due to user interaction with
   * a radio button (the same behavior as `<input type-"radio">`).
   */
  @Output() readonly change: EventEmitter<MsfRadioChange> = new EventEmitter<MsfRadioChange>();

  /** Whether the radio group is disabled. */
  @Input()
  get disabled():boolean {
    return false;
  }

  set disabled(state: boolean) {

  }


}
