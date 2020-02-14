import {NgModule} from "@angular/core";
import {MsfCommandBar} from "./command-bar";
import {MsfCommandBarButton, MsfCommandBarSplitButton} from "./command-bar-button";
import {CommonModule} from "@angular/common";
import {MsfIconModule} from "../icon/msf-icon.module";

@NgModule({
  imports: [ CommonModule, MsfIconModule],
  declarations: [ MsfCommandBar, MsfCommandBarButton, MsfCommandBarSplitButton ],
  exports: [ MsfCommandBar, MsfCommandBarButton, MsfCommandBarSplitButton ],
})
export class MsfCommandBarModule{}
