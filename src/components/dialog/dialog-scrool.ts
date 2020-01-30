import {InjectionToken} from "@angular/core";
import {Overlay, ScrollStrategy} from "@angular/cdk/overlay";

/** Injection token that determines the scroll handling while the dialog is open. */
export const MSF_DIALOG_SCROLL_STRATEGY =
  new InjectionToken<() => ScrollStrategy>('msf-dialog-scroll-strategy');

/** @docs-private */
export function MSF_DIALOG_SCROLL_STRATEGY_FACTORY(overlay: Overlay):
  () => ScrollStrategy {
  return () => overlay.scrollStrategies.block();
}


/** @docs-private */
export function MSF_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay):
  () => ScrollStrategy {
  return () => overlay.scrollStrategies.block();
}

/** @docs-private */
export const MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = {
  provide: MSF_DIALOG_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: MSF_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
