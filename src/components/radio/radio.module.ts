import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfRadioInput} from "./radio";
import {RadioGroupMap} from "./radio-group-map";


@NgModule({
  imports: [ CommonModule ],
  declarations: [ MsfRadioInput ],
  exports: [ MsfRadioInput ],
  providers: [RadioGroupMap]
})
export class MsfRadioModule {}
