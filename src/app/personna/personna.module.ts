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

const routes: Routes = [
  {path: "", component: PersonnaComponent}
];


@NgModule({
  declarations: [PersonnaComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfIconModule,
    MsfButtonModule, MsfCheckboxModule, MsfRadioModule, MsfPersonnaModule
  ],
  providers: []
})
export class PersonnaModule {
}
