import {ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef, PositionStrategy} from "@angular/cdk/overlay";
import {Injector, TemplateRef, Type, ViewChild} from "@angular/core";
import {MsCalloutRef, MsfCalloutRef} from "./callout-ref";
import {ComponentPortal, Portal, PortalInjector, TemplatePortal} from "@angular/cdk/portal";
import {MsfCalloutComponent} from "./callout.component";


export class MsfCallout {

  constructor(private overlay: Overlay, private injector: Injector) {}

  launch(origin: HTMLElement, target: Type<any> | TemplateRef<any>) {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'msf-callout-backdrop',
      panelClass: 'msf-callout-panel',
      width: 100,
      height: 200
    });

    let calloutContainerPortal = this._attachCalloutContainer(overlayRef);

    this._attachDialogContent(target, calloutContainerPortal, overlayRef);

    overlayRef.backdropClick().subscribe(() => overlayRef.dispose())
    //console.log(overlayRef.bac.classList)


  }

  private _attachCalloutContainer(overlay: OverlayRef): MsfCalloutComponent {
      const injector = new PortalInjector(this.injector, new WeakMap<any, any>());

      let portalComponent = new ComponentPortal(MsfCalloutComponent, null, injector);
      let containerRef = overlay.attach<MsfCalloutComponent>(portalComponent);
      return containerRef.instance;
  }

  private _attachDialogContent<T, R>(target: Type<any> | TemplateRef<any>,
                                     calloutContainer: MsfCalloutComponent,
                                     overlayRef: OverlayRef) {
    const calloutRef = new MsfCalloutRef<T, R>(overlayRef, calloutContainer);

    if(target instanceof TemplateRef){
      calloutContainer.attachTemplatePortal(new TemplatePortal<T>(target, null!, <any>{ $implicit: calloutRef }));
    }

    else {

    }
  }

  open<T>(origin: HTMLElement, content: any, data: any): MsCalloutRef<T> {
    const overlayRef = this.overlay.create(this.getOverlayConfig(origin));

    const calloutRef = new MsCalloutRef<T>(overlayRef, content, data);

    const injector = this.createInjector(calloutRef, this.injector);

    overlayRef.attach(new ComponentPortal(MsfCalloutComponent, null, injector));

    return calloutRef;
  }

  createInjector(popoverRef: MsCalloutRef, injector: Injector) {
    const tokens = new WeakMap([[MsCalloutRef, popoverRef]]);
    return new PortalInjector(injector, tokens);
  }

  private getOverlayConfig(origin: HTMLElement): OverlayConfig{
    return new OverlayConfig({
      width: 100,
      height: 100,
      hasBackdrop: true,
      backdropClass: 'msf_Callout-backdrop',
      panelClass: 'msf_Callout-panel',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.getOverlayPosition(origin),
    })
  }



  private getOverlayPosition(origin: HTMLElement): PositionStrategy {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(origin)
      .withPositions(this.getPositions())
      .withPush(false);

    return positionStrategy;
  }

  private getPositions(): ConnectionPositionPair[] {
    return [
      {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      },
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
      },
    ]
  }
}
