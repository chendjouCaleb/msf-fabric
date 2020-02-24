import {Component, Input, ElementRef, HostBinding} from '@angular/core';
import { MsfButtonBase } from '../button-base';

@Component({
  selector: 'MsfIconButton, [MsfIconButton]',
  templateUrl: './icon-button.html',
  host: {
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.tabindex]': 'disabled ? -1 : 0',
    'class': 'msf-button msf-icon-button'
  },
  inputs: [ 'theme', 'depth']
})
export class MsfIconButton extends MsfButtonBase {

  @Input()
  icon: string;

  @Input()
  iconImage: string;


  @HostBinding("class.msf-rounded")
  @Input()
  rounded: boolean = false;

  @HostBinding("class.msf-button-outline")
  @Input()
  outline: boolean = false;


  constructor(public _elementRef: ElementRef<HTMLElement>) {
    super(_elementRef);
  }
  ngOnInit() {

  }
}
