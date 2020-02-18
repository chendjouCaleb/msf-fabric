import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfTextField} from "./text-field";
import {MsfInput} from "./input/msf-input";
import {MsfInputLabel} from "./input-label";
import {MsfFormControl} from "./form-control";
import {MsfIconModule} from "../icon/msf-icon.module";

@NgModule({
  imports: [ CommonModule, MsfIconModule ],
  declarations: [ MsfTextField, MsfInput, MsfInputLabel, MsfFormControl ],
  exports: [ MsfTextField, MsfInput, MsfInputLabel, MsfFormControl ]
})
export class MsfTextFieldModule { }
