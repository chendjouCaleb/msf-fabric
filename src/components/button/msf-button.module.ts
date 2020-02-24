import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsfButton } from './msf-button/button';
import { MsfCommandButtonComponent } from './msf-command-button/msf-command-button.component';
import { MsfIconButton } from './msf-icon-button/icon-button';
import { MsfSplitButtonComponent } from './msf-split-button/msf-split-button.component';
import {MsfIconModule} from "../icon/public_api";

@NgModule({
    imports: [ CommonModule, MsfIconModule ],
    declarations: [ MsfButton, MsfCommandButtonComponent, MsfIconButton, MsfSplitButtonComponent ],
    exports: [ MsfButton, MsfIconButton, MsfCommandButtonComponent, MsfSplitButtonComponent ]
})
export class MsfButtonModule {

}
