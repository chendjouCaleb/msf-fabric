import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OverlayModule} from "@angular/cdk/overlay";
import {PortalModule} from "@angular/cdk/portal";
import {MsfModal} from "./modal";
import {MsfModalPortal} from "./modal-portal";
import { MSF_MODAL_SCROLL_STRATEGY_PROVIDER} from "./modal-scrool-strategy";

@NgModule({
  imports: [CommonModule, OverlayModule, PortalModule],
  declarations: [MsfModalPortal],
  providers: [MsfModal, MSF_MODAL_SCROLL_STRATEGY_PROVIDER]
})
export class MsfModalModule {

}
