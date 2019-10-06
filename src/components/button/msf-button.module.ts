import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsfButtonComponent } from './msf-button/msf-button.component';
import { MsfCommandButtonComponent } from './msf-command-button/msf-command-button.component';
import { MsfIconButtonComponent } from './msf-icon-button/msf-icon-button.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ MsfButtonComponent, MsfCommandButtonComponent, MsfIconButtonComponent ],
    exports: [ MsfButtonComponent, MsfIconButtonComponent, MsfCommandButtonComponent ]
})
export class MsfButtonModule {

}