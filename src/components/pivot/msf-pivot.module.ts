import {NgModule} from "@angular/core";
import {MsfIconModule} from "../icon/msf-icon.module";
import {CommonModule} from "@angular/common";
import {MsfPivot} from "./pivot/pivot";
import {MsfPivotBody} from "./pivot-body/pivot-body";
import {MsfPivotLabel} from "./label/pivot-label";

import {MsfPivotContent} from "./content/pivot-content";
import {MsfPivotLinker} from "./pivot-linker";
import {MsfPivotHeader} from "./header/pivot-header";


@NgModule({
  imports: [ CommonModule, MsfIconModule ],
  declarations: [ MsfPivot, MsfPivotBody, MsfPivotLabel, MsfPivotContent, MsfPivotHeader],
  exports: [ MsfPivot, MsfPivotBody, MsfPivotLabel, MsfPivotContent, MsfPivotHeader ],
  providers: [ MsfPivotLinker ]
})
export class MsfPivotModule {

}
