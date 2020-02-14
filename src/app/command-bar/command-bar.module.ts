import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutModule} from "../layout/app.layout.module";
import {MsfIconModule} from "../../components/icon/public_api";
import {CommandBarComponent} from "./command-bar.component";
import {MsfButtonModule, MsfCommandBarModule} from "../../components/public_api";

const routes: Routes = [

  {path: "", component: CommandBarComponent}
];




@NgModule({
  declarations: [ CommandBarComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfButtonModule, MsfIconModule, MsfCommandBarModule
  ],
  providers: [ ]
})
export class CommandBarModule {
}
