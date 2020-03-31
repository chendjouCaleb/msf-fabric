import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfIconModule, MsfSelectModule} from "../../components/public_api";
import {SelectComponent} from "./select.component";
import {AppLayoutModule} from "../layout/app.layout.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: "", component: SelectComponent }
];

@NgModule({
  imports: [CommonModule, AppLayoutModule, MsfIconModule, MsfSelectModule, RouterModule.forChild(routes)],
  declarations: [SelectComponent]
})
export class SelectModule {

}
