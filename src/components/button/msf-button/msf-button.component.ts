import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation} from '@angular/core';

import { MsfButtonBaseComponent } from '../button-base';

export type ButtonSize = "1x" | "2x" | "3x";

@Component({
  selector: 'MsfButton, [MsfButton], MsfOutlineButton, [MsfOutlineButton], ' +
    'MsfCommandButton, [MsfCommandButton]]',
  templateUrl: './msf-button.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.tabindex]': 'disabled ? -1 : 0'
  }
})
export class MsfButtonComponent extends MsfButtonBaseComponent{
  @Input()
  Icon: string;

  @Input()
  LeftIcon: string;

  constructor(protected _elementRef: ElementRef<HTMLElement>) {
    super(_elementRef);
  }



  ngOnInit() {
    super.ngOnInit();

    if(this.CommandButton){
      this._elementRef.nativeElement.classList.add("msf-command-button");
    }

  }



  get CommandButton(){
    return this._elementRef.nativeElement.hasAttribute("MsfCommandButton")
    || this._elementRef.nativeElement.tagName === 'MSFCOMMANDBUTTON'
  }


  _haltDisabledEvents(event: Event) {
    console.log("click")
    // A disabled button shouldn't apply any actions
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
