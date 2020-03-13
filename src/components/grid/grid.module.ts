import {NgModule} from "@angular/core";
import {MsfGrid, MsfGridItem} from "./grid";

import {CommonModule} from "@angular/common";
import {MsfCheckboxGrid} from "./checkbox-grid";

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MsfGrid, MsfGridItem, MsfCheckboxGrid ],
  exports: [ MsfGrid, MsfGridItem, MsfCheckboxGrid ],
})
export class MsfGridModule {}
