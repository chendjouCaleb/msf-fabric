import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {AppLayoutModule} from "../layout/app.layout.module";

import {RadioComponent} from "./radio.component";
import {MsfButtonModule, MsfRadioModule, MsfIconModule} from "../../components/public_api";
import {FormsModule} from "@angular/forms";


const routes: Routes = [
  {path: "", component: RadioComponent},
];




@NgModule({
  declarations: [ RadioComponent ],
  imports: [
    CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfButtonModule,
    MsfRadioModule, FormsModule, MsfIconModule
  ]
})
export class RadioModule {
}
