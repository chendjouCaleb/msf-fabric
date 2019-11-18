import { Input, ElementRef, OnInit } from '@angular/core';
import {ButtonSize} from "./msf-button/msf-button.component";
import {ColorTheme} from "../helpers/theme";

export class MsfButtonBaseComponent implements OnInit{

  private _theme: ColorTheme;

  @Input()
  set theme(theme: ColorTheme) {
    this._theme= theme;
    if(theme){
      if(this.Outline){
        this._elementRef.nativeElement.classList.add(`msf-button-outline-${this.theme}`);
      }else{
        this._elementRef.nativeElement.classList.add(`msf-button-${this.theme}`);
      }
    }
  }

  get theme(): ColorTheme {
    return this._theme;
  }
  @Input()
  Size: ButtonSize = "2x";

    @Input()
  set disabled(state: boolean){
    this._elementRef.nativeElement.setAttribute("disabled", state.toString());
  }


  get disabled() {
    return this._elementRef.nativeElement.hasAttribute("disabled");
  }

  constructor(protected _elementRef: ElementRef<HTMLElement>) { }

  ngOnInit() {
    this._elementRef.nativeElement.classList.add("msf-button");



}

  get Outline() {
    return this._elementRef.nativeElement.hasAttribute("Outline")
    || this._elementRef.nativeElement.tagName === 'MSFOUTLINEBUTTON'
  }

  get hostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }


}
