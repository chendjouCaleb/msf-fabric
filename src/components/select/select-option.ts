import {Component, HostBinding, Input} from "@angular/core";

@Component({
  selector: 'MsfSelectOption',
  template: `<ng-content></ng-content>`
})
export class MsfSelectOption {
  @HostBinding('class')
  className = 'msf-select-option';

  @Input()
  disabled: boolean;

  @Input()
  value: any;

  @Input()
  selected: boolean;
}
