import {NgModule} from "@angular/core";
import {MsfGridComponent} from "./grid.component";
import {MsfGridItemComponent} from "./grid-item.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MsfGridComponent, MsfGridItemComponent],
  exports: [ MsfGridComponent, MsfGridItemComponent],
})
export class MsfGridModule {}
