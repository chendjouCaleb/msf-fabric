import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {AppLayoutModule} from "../layout/app.layout.module";

import {TextFieldComponent} from "./text-field.component";
import {MsfButtonModule, MsfTextFieldModule} from "../../components/public_api";

const routes: Routes = [
  {path: "", component: TextFieldComponent},
];

@NgModule({
  declarations: [ TextFieldComponent ],
  imports: [
    CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfButtonModule, MsfTextFieldModule
  ]
})
export class TextFieldModule {
}
