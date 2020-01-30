import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PortalModule} from "@angular/cdk/portal";
import {OverlayModule} from "@angular/cdk/overlay";
import {MsfDialogContainer} from "./dialog-container";
import {MsfDialog} from "./dialog";
import {MAT_DIALOG_SCROLL_STRATEGY_PROVIDER} from "./dialog-scrool";

@NgModule({
  imports: [ CommonModule, PortalModule, OverlayModule],
  declarations: [ MsfDialogContainer ],
  entryComponents: [ MsfDialogContainer ],
  providers: [ MsfDialog, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER ]
})
export class MsfDialogModule {

}
