import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {AppLayoutModule} from "../layout/app.layout.module";

import {CalloutComponent, ComponentToRender} from "./callout.component";
import {MsfButtonModule, MsfCalloutModule} from "../../components/public_api";

const routes: Routes = [
  {path: "", component: CalloutComponent},
];




@NgModule({
  declarations: [ CalloutComponent, ComponentToRender ],
  imports: [
    CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfButtonModule, MsfCalloutModule
  ],
  entryComponents: [ ComponentToRender ]
})
export class CalloutModule {
}
