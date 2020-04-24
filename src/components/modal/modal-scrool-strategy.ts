/** Injection token that determines the scroll handling while the modal is open. */
import {Overlay, ScrollStrategy} from "@angular/cdk/overlay";
import {InjectionToken} from "@angular/core";

export const MSF_MODAL_SCROLL_STRATEGY =
  new InjectionToken<() => ScrollStrategy>('msf-modal-scroll-strategy');


/** @docs-private */
export function MSF_MODAL_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.block();
}

/** @docs-private */
export function MSF_MODAL_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay):
  () => ScrollStrategy {
  return () => overlay.scrollStrategies.block();
}

/** @docs-private */
export const MSF_MODAL_SCROLL_STRATEGY_PROVIDER = {
  provide: MSF_MODAL_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: MSF_MODAL_SCROLL_STRATEGY_PROVIDER_FACTORY,
};


