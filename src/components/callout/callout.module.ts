import {NgModule} from "@angular/core";
import {OverlayModule} from "@angular/cdk/overlay";
import {PortalModule} from "@angular/cdk/portal";
import {MsfCallout} from "./callout";
import {MsfCalloutComponent} from "./callout.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [CommonModule, OverlayModule, PortalModule ],
  declarations: [ MsfCalloutComponent ],
  entryComponents: [ MsfCalloutComponent ],
  providers: [MsfCallout]
})
export class MsfCalloutModule {

}
