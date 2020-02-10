import {NgModule} from "@angular/core";
import {MsfGrid} from "./grid";
import {MsfGridItem} from "./grid-item";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MsfGrid, MsfGridItem],
  exports: [ MsfGrid, MsfGridItem],
})
export class MsfGridModule {}
