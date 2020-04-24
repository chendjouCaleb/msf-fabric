/** Injection token that can be used to specify default modal options. */
import {InjectionToken} from "@angular/core";
import {MsfModalOptions} from "./modal-options";

export const MSF_MODAL_DEFAULT_OPTIONS =
  new InjectionToken<MsfModalOptions>('msf-modal-default-options');

