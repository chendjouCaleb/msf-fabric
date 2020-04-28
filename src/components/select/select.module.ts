import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfSelect } from "./select";
import {MsfIconModule} from "../icon/public_api";
import {MsfSelectOption} from "./select-option";
import {OverlayModule} from "@angular/cdk/overlay";
import {MsfSelectOptionGroup} from "./select-option-group";
import {MsfSelectTemplate} from "./select-template";

@NgModule({
  imports: [ CommonModule, MsfIconModule, OverlayModule ],
  declarations: [ MsfSelect, MsfSelectOption, MsfSelectOptionGroup, MsfSelectTemplate ],
  exports: [ MsfSelect, MsfSelectOption, MsfSelectOptionGroup, MsfSelectTemplate ]
})
export class MsfSelectModule {}
