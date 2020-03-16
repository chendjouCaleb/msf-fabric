import {Component, ElementRef, Inject, Input, Optional} from "@angular/core";
import {PersonaSize} from "./persona-size";
import {MSF_PERSONA_DEFAULT_OPTIONS, MsfPersonaDefaultOptions} from "./persona-options";

@Component({
  templateUrl: "persona-text.html",
  selector: "MsfPersonaText",
  host: {
    "class" : "msf-persona-text"
  }
})
export class MsfPersonaText {
  private _size: PersonaSize;

  @Input()
  /** Decides the size of the control. */
  get size(): PersonaSize {
    return this._size;
  }

  set size(value: PersonaSize) {
    let size: PersonaSize;
    if (value) {
      size = value;
    } else if (this._defaultOptions && this._defaultOptions.size) {
      size = this._defaultOptions.size;
    }

    this.elementRef.nativeElement.classList.remove(`msf-persona-text-${this.size}`);
    this.elementRef.nativeElement.classList.add(`msf-persona-text-${size}`);
    this._size = size;
  }

  constructor(public elementRef: ElementRef<HTMLElement>,
              @Optional() @Inject(MSF_PERSONA_DEFAULT_OPTIONS) private _defaultOptions: MsfPersonaDefaultOptions) {

  }
}
