import {AfterContentInit, Component, ContentChild, Input} from "@angular/core";
import {MsfInput} from "./input/msf-input";
import {MsfInputLabel} from "./input-label";

let nextUniqueId = 0;

@Component({
  template: `
      <label *ngIf="!hasContentLabel && label" MsfInputLabel [htmlFor]="id" >{{label}}</label>
      <ng-content></ng-content>
  `,
  selector: "MsfFormControl, [MsfFormControl]",
  host: {
    "class" : "msf-form-control",
    "[class.msf-disabled]" : "disabled"
  }
})
export class MsfFormControl implements AfterContentInit {
  private _uniqueId: string = `msf-form-control-${nextUniqueId++}`;

  private _id: string = this._uniqueId;

  private _disabled: boolean = false;

  @Input()
  get id() {
    return this._id;
  }

  set id(value: string) {
    if (value) {
      this._id = value;
    } else {
      this._id = this._uniqueId;
    }
  }


  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(state: boolean) {
    this._disabled = state;

    if(this._nativeInput){
      this._nativeInput.disabled = state;
    }

  }

  @Input()
  label: string;


  @ContentChild(MsfInput, {static: false})
  private _nativeInput: MsfInput;

  @ContentChild(MsfInputLabel, {static: false})
  private _nativeLabel: MsfInputLabel;


  ngAfterContentInit(): void {
    if(!this._nativeInput){
      throw new Error(`A text field must contains a html input with MsfInput directive.`)
    }

    this._nativeInput.id = this.id;
    this._nativeInput.disabled = this.disabled;

    if(this._nativeLabel) {
      this._nativeLabel.htmlFor = this.id;

    }
  }


  get hasContentLabel(): boolean {
    return this._nativeLabel != null;
  }


}
