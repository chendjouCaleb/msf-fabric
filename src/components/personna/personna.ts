import {AfterContentInit, Component, ContentChild, forwardRef, Inject, Input, Optional} from "@angular/core";
import {
  MSF_PERSONNA_DEFAULT_OPTIONS,
  MsfPersonnaDefaultOptions,
} from "./personna-options";
import {PersonnaSize} from "./personna-size";
import {MsfPersonnaFigure} from "./personna-figure";
import {MsfPersonnaText} from "./personna-text";



/**
 * Personna are used for rendering an individual's avatar and presence.
 * They are used within the PeoplePicker components.
 */
@Component({
  templateUrl: "personna.html",
  selector: "MsfPersonna",
  host: {
    "class": "msf-personna",
    "[attr.aria-labelledby]": "ariaLabelledby",
    "[attr.aria-label]": "ariaLabel"
  },
  inputs: ["depth", "theme"]
})
export class MsfPersonna implements AfterContentInit{

  /**
   * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
   * take precedence so this may be omitted.
   */
  @Input( )
  ariaLabel: string = '';

  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
   */
  @Input( )
  ariaLabelledby: string | null = null;

  /**
   * Persona coin size in pixel.
   */
  @Input()
  coinSize: number | null;


  private _size: PersonnaSize = "size56";

  @ContentChild(forwardRef(() => MsfPersonnaFigure))
  private _figure: MsfPersonnaFigure;


  @ContentChild(forwardRef(() => MsfPersonnaText))
  private _text: MsfPersonnaFigure;

  @Input()
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

    if(this._figure){
      this._figure.size = size;
    }

    if(this._text){
      this._text.size = size;
    }

    this._size = size;
  }



  constructor(@Optional() @Inject(MSF_PERSONNA_DEFAULT_OPTIONS) private _defaultOptions: MsfPersonnaDefaultOptions) {}

  ngAfterContentInit(): void {
    if(this._figure){
      this._figure.size = this.size;
    }

    if(this._text){
      this._text.size = this.size;
    }
  }
}
