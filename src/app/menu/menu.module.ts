import {NgModule} from "@angular/core";
import {MenuComponent} from "./menu.component";
import {MsfButtonModule, MsfCheckboxModule, MsfMenuModule} from "../../components/public_api";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {AppLayoutModule} from "../layout/app.layout.module";

const routes: Routes = [
  {path: "", component: MenuComponent }
];

@NgModule({
  declarations: [ MenuComponent ],
  imports: [ CommonModule,  RouterModule.forChild(routes), AppLayoutModule,MsfCheckboxModule, MsfButtonModule, MsfMenuModule]
})
export class MenuModule {

}
