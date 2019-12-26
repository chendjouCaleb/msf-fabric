import {RouterModule, Routes} from "@angular/router";
import {MenuComponent} from "../menu/menu.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppLayoutModule} from "../layout/app.layout.module";
import {GridComponent} from "./grid.component";
import {GridMovieComponent} from "./grid-movie.component";
import {MsfButtonModule, MsfContextualMenuModule, MsfDropdownModule, MsfGridModule} from "../../components/public_api";

const routes: Routes = [
  {path: "", component: GridComponent }
];

@NgModule({
  declarations: [ GridComponent, GridMovieComponent ],
  imports: [ CommonModule,  RouterModule.forChild(routes), AppLayoutModule,
    MsfButtonModule, MsfContextualMenuModule, MsfDropdownModule, MsfGridModule]
})
export class GridModule {

}
