import {Component, ElementRef, Inject, Input, OnInit, Optional} from "@angular/core";
import {CanColor, CanColorCtor, mixinColor} from "../helpers/behaviors/theme";
import {PersonnaSize} from "./personna-size";
import {MSF_PERSONNA_DEFAULT_OPTIONS, MsfPersonnaDefaultOptions, PersonnaPresence} from "./personna-options";
import {MsfColor} from "../helpers/theme";
import {CanDepth, CanDepthCtor, mixinDepth} from "../helpers/behaviors/depth";
import {MSF_CHECKBOX_DEFAULT_OPTIONS, MsfCheckboxDefaultOptions} from "../checkbox/checkbox-options";

class MsfPersonnaFigureBase {
  constructor(public _elementRef: ElementRef) {
  }
}

const _MsfPersonnaFigureMixinBase:
  CanColorCtor & CanDepthCtor & typeof MsfPersonnaFigureBase = mixinDepth(mixinColor(MsfPersonnaFigureBase));


@Component({
  templateUrl: "personna-figure.html",
  selector: "MsfPersonnaFigure",
  host: {
    "class": "msf-personna-figure",
    "[class.msf-rounded]": "rounded"
  }
})
export class MsfPersonnaFigure extends _MsfPersonnaFigureMixinBase implements CanColor, CanDepth, OnInit {
  private _size: PersonnaSize = "size48";

  private _textInitial: string;

  @Input()
  rounded: boolean = true;





  @Input()
  coinSize: number;


  @Input()
  presence: PersonnaPresence;

  @Input()
  showIcon: boolean;


  @Input()
  imageUrl: string;



  @Input()
  color: MsfColor | null;


  @Input()
  unknown: boolean;


  @Input()
  showPresence: boolean;

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

    this.elementRef.nativeElement.classList.remove(`msf-personna-figure-${this.size}`);
    this.elementRef.nativeElement.classList.add(`msf-personna-figure-${size}`);
    this._size = size;
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
              @Optional() @Inject(MSF_PERSONNA_DEFAULT_OPTIONS) private _defaultOptions: MsfPersonnaDefaultOptions) {
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
