import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ColorTheme } from '../../utils/theme';
import { ButtonSize } from '../msf-button/msf-button.component';
import { Strings } from '../../utils/string-utils';

@Component({
  selector: 'MsfIconButton, [MsfIconButton]',
  templateUrl: './msf-icon-button.component.html',
  styles: []
})
export class MsfIconButtonComponent implements OnInit {

  @Input()
  Icon: string;

  @Input()
  Theme: ColorTheme = "standard";

  @Input()
  Size: ButtonSize = "2x";

  @Input()
  Disabled: boolean;

  constructor(private _elementRef: ElementRef) {
    
   }

  ngOnInit() {
    this.Icon = Strings.upperFirst(this.Icon);
  }

  get Outline(){
    return this._elementRef.nativeElement.hasAttribute("Outline")
  }
}
