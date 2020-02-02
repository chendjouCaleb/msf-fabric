import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {AppLayoutModule} from "../layout/app.layout.module";

import {CheckboxComponent} from "./checkbox.component";
import {MsfButtonModule, MsfIconModule, MsfCheckboxModule} from "../../components/public_api";
import {FormsModule} from "@angular/forms";


const routes: Routes = [
  {path: "", component: CheckboxComponent},
];




@NgModule({
  declarations: [ CheckboxComponent ],
  imports: [
    CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfButtonModule,
    MsfCheckboxModule, FormsModule, MsfIconModule
  ]
})
export class CheckboxModule {
}
