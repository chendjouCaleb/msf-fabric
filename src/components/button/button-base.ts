import { Input, ElementRef, OnInit } from '@angular/core';
import { ColorTheme } from 'dist/public_api';
import { ButtonSize } from 'dist/button/msf-button/msf-button.component';

export class MsfButtonBaseComponent implements OnInit{

    @Input()
  Theme: ColorTheme;

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
  

    if(this.Theme){
      if(this.Outline){
        this._elementRef.nativeElement.classList.add(`msf-button-outline-${this.Theme}`);
      }else{
        this._elementRef.nativeElement.classList.add(`msf-button-${this.Theme}`);
      }
      
    }
}

  get Outline() {
    return this._elementRef.nativeElement.hasAttribute("Outline")
    || this._elementRef.nativeElement.tagName === 'MSFOUTLINEBUTTON'
  }

  get hostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }
  
}