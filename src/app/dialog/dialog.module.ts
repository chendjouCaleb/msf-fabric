import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {AppLayoutModule} from "../layout/app.layout.module";

import {DialogComponent, ComponentToRender} from "./dialog.component";
import {MsfButtonModule, MsfDialogModule} from "../../components/public_api";

const routes: Routes = [
  {path: "", component: DialogComponent},
];

@NgModule({
  declarations: [ DialogComponent, ComponentToRender ],
  imports: [
    CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfButtonModule, MsfDialogModule
  ],
  entryComponents: [ ComponentToRender ]
})
export class DialogModule {
}
