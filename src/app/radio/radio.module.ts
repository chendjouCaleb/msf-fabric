import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {AppLayoutModule} from "../layout/app.layout.module";

import {RadioComponent} from "./radio.component";
import {MsfButtonModule, MsfRadioModule} from "../../components/public_api";

const routes: Routes = [
  {path: "", component: RadioComponent},
];




@NgModule({
  declarations: [ RadioComponent ],
  imports: [
    CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfButtonModule, MsfRadioModule
  ]
})
export class RadioModule {
}
