import {AfterContentInit, Component, ContentChild, forwardRef, Inject, Input, Optional} from "@angular/core";
import {
  MSF_PERSONA_DEFAULT_OPTIONS,
  MsfPersonaDefaultOptions,
} from "./persona-options";
import {PersonaSize} from "./persona-size";
import {MsfPersonaFigure} from "./persona-figure";
import {MsfPersonaText} from "./persona-text";



/**
 * Persona are used for rendering an individual's avatar and presence.
 * They are used within the PeoplePicker components.
 */
@Component({
  templateUrl: "persona.html",
  selector: "MsfPersona",
  host: {
    "class": "msf-persona",
    "[attr.aria-labelledby]": "ariaLabelledby",
    "[attr.aria-label]": "ariaLabel"
  },
  inputs: ["depth", "theme"]
})
export class MsfPersona implements AfterContentInit{

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




  private _size: PersonaSize = "size56";

  @ContentChild(forwardRef(() => MsfPersonaFigure))
  private _figure: MsfPersonaFigure;


  @ContentChild(forwardRef(() => MsfPersonaText))
  private _text: MsfPersonaFigure;

  @Input()
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

    if(this._figure){
      this._figure.size = size;
    }

    if(this._text){
      this._text.size = size;
    }

    this._size = size;
  }



  constructor(@Optional() @Inject(MSF_PERSONA_DEFAULT_OPTIONS) private _defaultOptions: MsfPersonaDefaultOptions) {}

  ngAfterContentInit(): void {
    if(this._figure){
      this._figure.size = this.size;
    }

    if(this._text){
      this._text.size = this.size;
    }
  }
}
