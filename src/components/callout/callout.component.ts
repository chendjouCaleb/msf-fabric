import {MsfCalloutContent, MsCalloutRef} from "./callout-ref";
import {Component, ComponentRef, EmbeddedViewRef, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal} from "@angular/cdk/portal";

@Component({
  templateUrl: "callout.component.html"
})
export class MsfCalloutComponent extends BasePortalOutlet{
  /** The portal outlet inside of this container into which the dialog content will be loaded. */
  @ViewChild(CdkPortalOutlet, {static: true})
  _portalOutlet: CdkPortalOutlet;

  content: MsfCalloutContent;
  context;

  constructor( ) {
    super();
  }


  ngOnInit() {

  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this._portalOutlet.attachComponentPortal(portal);
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    return this._portalOutlet.attachTemplatePortal(portal);
  }
}
