import {Directive, Input} from "@angular/core";
import {FormGroupDirective, NgControl, NgForm} from "@angular/forms";
import {ErrorStateMatcher} from "../../helpers/error/error-options";

// Invalid input type. Using one of these will throw an MatInputUnsupportedTypeError.
const MSF_INPUT_INVALID_TYPES = [
  'button',
  'checkbox',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit'
];

let nextUniqueId = 0;

// Boilerplate for applying mixins to MatInput.
/** @docs-private */
class MsfInputBase {
  constructor(public _defaultErrorStateMatcher: ErrorStateMatcher,
              public _parentForm: NgForm,
              public _parentFormGroup: FormGroupDirective,
              /** @docs-private */
              public ngControl: NgControl) {}
}

@Directive({
  selector: "[MsfInput]",
  host: {
    "class" : "msf-input",
    "[attr.id]" : "id",
    "[disabled]" : "disabled"
  }
})
export class MsfInput {
  protected _uid = `msf-input-${nextUniqueId++}`;


  @Input()
  disabled: boolean = false;

  @Input()
  get id(): string { return this._id; }
  set id(value: string) { this._id = value || this._uid; }
  protected _id: string;
}
