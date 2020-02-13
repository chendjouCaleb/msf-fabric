import {NgModule} from "@angular/core";
import {MsfGrid, MsfGridItem} from "./grid";

import {CommonModule} from "@angular/common";

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MsfGrid, MsfGridItem],
  exports: [ MsfGrid, MsfGridItem],
})
export class MsfGridModule {}
