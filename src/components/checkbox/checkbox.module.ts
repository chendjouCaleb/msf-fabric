import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfCheckbox} from "./checkbox";
import {MsfCheckboxGroup} from "./checkbox-group";

@NgModule({
  imports: [ CommonModule ],
  declarations: [  MsfCheckbox, MsfCheckboxGroup ],
  exports: [ MsfCheckbox, MsfCheckboxGroup]
})
export class MsfCheckboxModule {

}
