import {Component, ElementRef, HostBinding, Inject, Input, OnInit, Optional} from "@angular/core";
import {CanColor, CanColorCtor, mixinColor} from "../helpers/behaviors/theme";
import {PersonaSize} from "./persona-size";
import {MSF_PERSONA_DEFAULT_OPTIONS, MsfPersonaDefaultOptions, PersonaPresence} from "./persona-options";
import {MsfColor} from "../helpers/theme";
import {CanDepth, CanDepthCtor, mixinDepth} from "../helpers/behaviors/depth";
import {MSF_CHECKBOX_DEFAULT_OPTIONS, MsfCheckboxDefaultOptions} from "../checkbox/checkbox-options";

class MsfPersonaFigureBase {
  constructor(public _elementRef: ElementRef) {
  }
}

const _MsfPersonaFigureMixinBase:
  CanColorCtor & CanDepthCtor & typeof MsfPersonaFigureBase = mixinDepth(mixinColor(MsfPersonaFigureBase));


@Component({
  templateUrl: "persona-figure.html",
  selector: "MsfPersonaFigure",
  host: {
    "class": "msf-persona-figure",
    "[class.msf-rounded]": "rounded"
  }
})
export class MsfPersonaFigure extends _MsfPersonaFigureMixinBase implements CanColor, CanDepth, OnInit {
  private _size: PersonaSize = "size48";

  private _textInitial: string;

  _bgColor: string;

  @Input()
  rounded: boolean = true;



  @Input()
  presence: PersonaPresence;

  @Input()
  showIcon: boolean;


  @Input()
  imageUrl: string;



  @Input()
  get color(): MsfColor { return this._color }

  set color(value: MsfColor) {
    this._color = value;
    this._bgColor = `ms-bgColor-${value}`;
  }
  _color: MsfColor | null;


  @Input()
  get unknown(): boolean { return this._unknown}

  set unknown(state: boolean) {
    this._unknown = state;
    if(state){
      this.color = 'gray40'
    }

  }
  private _unknown: boolean;




  @Input()
  showPresence: boolean;

  @Input()
  /** Decides the size of the control. */
  get size(): PersonaSize {
    return this._size;
  }

  set size(value: PersonaSize) {
    this.elementRef.nativeElement.classList.remove(`msf-persona-figure-${this.size}`);
    this.elementRef.nativeElement.classList.add(`msf-persona-figure-${value}`);
    this._size = value;
  }


  get width(): string {
    return this.size.replace("size", "");
  }

  @Input()
  get textInitial(): string {
    return this._textInitial;
  }

  set textInitial(value: string) {
    if(value && value.length > 2){
      throw new Error("The initial must be one or two letter.");
    }

    this._textInitial = value;
  }

  @Input()
  set text(value: string) {
    if(value){
      this.textInitial = this._getInitial(value);
    }
  }

  _getInitial(value: string) {
    if (!value || value.trim().length == 0) {
      return null;
    }
    let segments = value.trim().split(" ");


    if (segments.length == 1) {
      return segments[0][0].toUpperCase();
    }
    return `${segments[0][0]}${segments[1][0]}`.toUpperCase();

  }

  get personIconName(): string {
    if (this._defaultOptions && this._defaultOptions.personIconName) {
      return this._defaultOptions.personIconName;
    }
    return "Contact";
  }

  get unknownIconName(): string {
    if (this._defaultOptions && this._defaultOptions.unknownIconName) {
      return this._defaultOptions.unknownIconName;
    }
    return "StatusCircleQuestionMark";
  }

  constructor(public elementRef: ElementRef<HTMLElement>,
              @Optional() @Inject(MSF_PERSONA_DEFAULT_OPTIONS) private _defaultOptions: MsfPersonaDefaultOptions) {
    super(elementRef);
  }

  ngOnInit(): void {
    if (!this.color && this._defaultOptions && this._defaultOptions.color) {
      this.color = this._defaultOptions.color;
    }
  }

  get presenceIconName(): string {
    if(this._defaultOptions && this._defaultOptions.presenceIconNames){
      return this._defaultOptions.presenceIconNames[this.presence];
    }
    return '';
  }

  get canShowIcon(): boolean {
    return this.presenceIconName && this.size != 'size8' && this.size != 'size24' && this.size != 'size32';
  }
}
