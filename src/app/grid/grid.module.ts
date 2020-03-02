import {RouterModule, Routes} from "@angular/router";

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppLayoutModule} from "../layout/app.layout.module";
import {GridComponent} from "./grid.component";
import {GridMovieComponent} from "./grid-movie.component";
import {
  MsfButtonModule,
  MsfCheckboxModule,
  MsfContextualMenuModule,
  MsfDropdownModule,
  MsfGridModule
} from "../../components/public_api";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {path: "", component: GridComponent }
];

@NgModule({
  declarations: [ GridComponent, GridMovieComponent ],
  imports: [CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfCheckboxModule,
    MsfButtonModule, MsfContextualMenuModule, MsfDropdownModule, MsfGridModule, FormsModule]
})
export class GridModule {

}
