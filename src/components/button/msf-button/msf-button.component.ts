import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { ColorTheme } from '../../utils/theme';

export type ButtonSize = "1x" | "2x" | "3x";

@Component({
  selector: 'MsfButton, MsfOutlineButton, MsfCommandButton, MsfSplitButton]',
  templateUrl: './msf-button.component.html',
  styleUrls: ["msf-button.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.tabindex]': 'disabled ? -1 : (tabIndex || 0)',
    '[attr.disabled]': 'disabled || null',
    '[attr.aria-disabled]': 'disabled.toString()',
    '(click)': '_haltDisabledEvents($event)'
  }
})
export class MsfButtonComponent implements OnInit {
  @Input()
  Icon: string;

  @Input()
  LeftIcon: string;

  @Input()
  Theme: ColorTheme = "standard";

  @Input()
  Size: ButtonSize = "2x";


  get disabled() {
    return this._elementRef.nativeElement.hasAttribute("disabled")
  }

  constructor(private _elementRef: ElementRef<HTMLElement>) { }

  ngOnInit() {
    this._elementRef.nativeElement.classList.add("msf-button");
    if(this.Theme){
      this._elementRef.nativeElement.classList.add(`msf-button-${this.Theme}`);
    }

    if(this.Outline){
      this._elementRef.nativeElement.classList.add("msf-button-outline");
    }

    if(this.CommandButton){
      this._elementRef.nativeElement.classList.add("msf-command-button");
    }

  }

  get Outline() {
    return this._elementRef.nativeElement.hasAttribute("Outline")
    || this._elementRef.nativeElement.tagName === 'MSFOUTLINEBUTTON'
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
