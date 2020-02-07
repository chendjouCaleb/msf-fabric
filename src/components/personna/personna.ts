import {Component, Inject, Input, Optional} from "@angular/core";
import {
  MSF_PERSONNA_DEFAULT_OPTIONS,
  MsfPersonnaDefaultOptions,
} from "./personna-options";



/**
 * Personna are used for rendering an individual's avatar and presence.
 * They are used within the PeoplePicker components.
 */
@Component({
  templateUrl: "personna.html",
  selector: "MsfPersonna",
  host: {
    "class": "msf-personna"
  }
})
export class MsfPersonna {

  /**
   * Persona coin size in pixel.
   */
  @Input()
  coinSize: number | null;



  constructor(@Optional() @Inject(MSF_PERSONNA_DEFAULT_OPTIONS) private _defaultOptions: MsfPersonnaDefaultOptions) {}
}
