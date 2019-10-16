import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsfButtonComponent } from './msf-button/msf-button.component';
import { MsfCommandButtonComponent } from './msf-command-button/msf-command-button.component';
import { MsfIconButtonComponent } from './msf-icon-button/msf-icon-button.component';
import { MsfSplitButtonComponent } from './msf-split-button/msf-split-button.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ MsfButtonComponent, MsfCommandButtonComponent, MsfIconButtonComponent, MsfSplitButtonComponent ],
    exports: [ MsfButtonComponent, MsfIconButtonComponent, MsfCommandButtonComponent, MsfSplitButtonComponent ]
})
export class MsfButtonModule {

}