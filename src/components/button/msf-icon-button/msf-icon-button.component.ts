import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Strings } from '../../utils/string-utils';
import { MsfButtonBase } from '../button-base';

@Component({
  selector: 'MsfIconButton, [MsfIconButton]',
  templateUrl: './msf-icon-button.component.html',
  host: {
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.tabindex]': 'disabled ? -1 : 0',
    'class': 'msf-icon-button'
  },
  inputs: [ 'theme']
})
export class MsfIconButtonComponent extends MsfButtonBase {

  @Input()
  Icon: string;


  constructor(public _elementRef: ElementRef<HTMLElement>) {
    super(_elementRef);
  }
  ngOnInit() {
    super.ngOnInit();
    this.Icon = Strings.upperFirst(this.Icon);

    if(!this.Icon){
      this.Icon = Strings.upperFirst(this.hostElement.textContent);
      console.log(this.hostElement.textContent)
    }


    if(this.IsRounded){
      this._elementRef.nativeElement.classList.add("msf-rounded-button");
    }
  }

  get IsRounded() {
    return this._elementRef.nativeElement.hasAttribute("Rounded")
  }

}
