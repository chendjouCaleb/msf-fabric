import {InjectionToken} from "@angular/core";
import {ColorTheme} from "../helpers/theme";

export interface MsfRadioDefaultOptions {
  color: ColorTheme;
}

export const MSF_RADIO_DEFAULT_OPTIONS =
  new InjectionToken<MsfRadioDefaultOptions>('msf-radio-default-options', {
    providedIn: 'root',
    factory: MSF_RADIO_DEFAULT_OPTIONS_FACTORY
  });

export function MSF_RADIO_DEFAULT_OPTIONS_FACTORY(): MsfRadioDefaultOptions {
  return {
    color: 'error'
  };
}
