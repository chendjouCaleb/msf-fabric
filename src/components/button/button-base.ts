import { Input, ElementRef, OnInit, Directive } from '@angular/core';
import {ButtonSize} from "./msf-button/button";
import {ColorTheme} from "../helpers/theme";
import {CanColor, CanColorCtor, mixinColor} from "../helpers/behaviors/theme";
import {CanDepth, CanDepthCtor, mixinDepth} from "../helpers/behaviors/depth";

class ButtonBase {
  constructor(public _elementRef: ElementRef) {}
}

const _MsfButtonMixinBase:
  CanColorCtor & CanDepthCtor & typeof ButtonBase = mixinDepth(mixinColor(ButtonBase)  );


export abstract class MsfButtonBase extends _MsfButtonMixinBase implements CanColor, CanDepth {


  @Input()
  Size: ButtonSize = "2x";

    @Input()
  set disabled(state: boolean){
    this._elementRef.nativeElement.setAttribute("disabled", state.toString());
  }


  get disabled() {
    return this._elementRef.nativeElement.hasAttribute("disabled");
  }

  constructor(public _elementRef: ElementRef<HTMLElement>) {
      super(_elementRef);
  }

  get Outline() {
    return this._elementRef.nativeElement.hasAttribute("Outline")
    || this._elementRef.nativeElement.tagName === 'MSFOUTLINEBUTTON'
  }

  get hostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }


}
