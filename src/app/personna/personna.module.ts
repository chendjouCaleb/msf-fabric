import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {AppLayoutModule} from "../layout/app.layout.module";
import {
  MsfIconModule,
  MsfButtonModule,
  MsfCheckboxModule,
  MsfRadioModule,
  MsfPersonnaModule
} from "../../components/public_api";
import {PersonnaComponent} from "./personna.component";
import {ColorPersonnaComponent} from "./color/color-personna.component";
import {InitialPersonnaComponent} from "./initial/initial-personna.component";
import {PresencePersonnaComponent} from "./presence/presence-personna.component";
import {SmallPersonnaComponent} from "./small/small-personna.component";
import {UnknownPersonnaComponent} from "./unknown/unknown-personna.component";
import {VariousPersonnaComponent} from "./various/various-personna.component";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {path: "", component: PersonnaComponent}
];


@NgModule({
  declarations: [PersonnaComponent, ColorPersonnaComponent, InitialPersonnaComponent, PresencePersonnaComponent,
  SmallPersonnaComponent, UnknownPersonnaComponent, VariousPersonnaComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfIconModule,
    MsfButtonModule, MsfCheckboxModule, MsfRadioModule, MsfPersonnaModule, FormsModule
  ],
  providers: []
})
export class PersonnaModule {
}
