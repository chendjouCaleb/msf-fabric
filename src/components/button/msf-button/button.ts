import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, ViewEncapsulation} from '@angular/core';

import { MsfButtonBase } from '../button-base';

export type ButtonSize = "1x" | "2x" | "3x";

@Component({
  selector: 'MsfButton, [MsfButton], MsfOutlineButton, [MsfOutlineButton], ' +
    'MsfCommandButton, [MsfCommandButton]]',
  templateUrl: './button.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.tabindex]': 'disabled ? -1 : 0'
  },
  inputs: [ 'theme', 'depth']
})
export class MsfButton extends MsfButtonBase{
  @HostBinding("class")
  className: string = "msf-button";

  @HostBinding("class.msf-button-outline")
  get isOutline(): boolean {
    return this.hostElement.tagName.toUpperCase() === "MSFOUTLINEBUTTON" || this.outline;
  }

  @Input()
  outline: boolean = false;


  @Input()
  Icon: string;

  @Input()
  LeftIcon: string;

  constructor(public _elementRef: ElementRef<HTMLElement>) {
    super(_elementRef);
  }



  ngOnInit() {

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
