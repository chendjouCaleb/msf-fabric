import {Component, ElementRef, Inject, Input, Optional} from "@angular/core";
import {PersonnaSize} from "./personna-size";
import {MSF_PERSONNA_DEFAULT_OPTIONS, MsfPersonnaDefaultOptions} from "./personna-options";

@Component({
  templateUrl: "personna-text.html",
  selector: "MsfPersonnaText",
  host: {
    "class" : "msf-personna-text"
  }
})
export class MsfPersonnaText {
  private _size: PersonnaSize;

  @Input()
  /** Decides the size of the control. */
  get size(): PersonnaSize {
    return this._size;
  }

  set size(value: PersonnaSize) {
    let size: PersonnaSize;
    if (value) {
      size = value;
    } else if (this._defaultOptions && this._defaultOptions.size) {
      size = this._defaultOptions.size;
    }

    this.elementRef.nativeElement.classList.remove(`msf-personna-text-${this.size}`);
    this.elementRef.nativeElement.classList.add(`msf-personna-text-${size}`);
    this._size = size;
  }

  constructor(public elementRef: ElementRef<HTMLElement>,
              @Optional() @Inject(MSF_PERSONNA_DEFAULT_OPTIONS) private _defaultOptions: MsfPersonnaDefaultOptions) {

  }
}
