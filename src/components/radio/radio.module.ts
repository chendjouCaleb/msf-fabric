import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfRadioInput} from "./radio";
import {RadioItemsMap} from "./radio-items-map";
import {MsfRadioGroup} from "./radio-group";


@NgModule({
  imports: [ CommonModule ],
  declarations: [ MsfRadioInput, MsfRadioGroup ],
  exports: [ MsfRadioInput, MsfRadioGroup ],
  providers: [RadioItemsMap]
})
export class MsfRadioModule {}
