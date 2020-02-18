import {Directive, Input} from "@angular/core";

@Directive({
  selector: "label[MsfInputLabel]",
  host: {
    "class": "msf-input-label msf-label",
    "[attr.for]": "htmlFor",
    "[class.msf-disabled]": "disabled"
  }
})
export class MsfInputLabel {
  /** The native for html attribute. The keyword 'for" is reserved keyword of javascript. */
  @Input()
  htmlFor: string;

  @Input()
  disabled: boolean = false;
}
