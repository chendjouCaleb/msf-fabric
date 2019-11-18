import {NgModule} from "@angular/core";
import {DropdownComponent} from "./dropdown.component";
import {MsfButtonModule, MsfContextualMenuModule} from "../../components/public_api";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {AppLayoutModule} from "../layout/app.layout.module";
import {MsfDropdownModule} from "../../components/dropdown/public_api";

const routes: Routes = [
  {path: "", component: DropdownComponent }
];

@NgModule({
  declarations: [ DropdownComponent ],
  imports: [ CommonModule,  RouterModule.forChild(routes), AppLayoutModule, MsfButtonModule, MsfContextualMenuModule,
  MsfDropdownModule]
})
export class DropdownModule {

}
