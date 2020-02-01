import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfRadioInput} from "./radio";
import {RadioGroupMap} from "./radio-group-map";
import {MsfRadioGroup} from "./radio-group.component";


@NgModule({
  imports: [ CommonModule ],
  declarations: [ MsfRadioInput, MsfRadioGroup ],
  exports: [ MsfRadioInput, MsfRadioGroup ],
  providers: [RadioGroupMap]
})
export class MsfRadioModule {}
