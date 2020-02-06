import {ColorTheme} from "../helpers/theme";
import {InjectionToken} from "@angular/core";

export interface MsfCheckboxDefaultOptions {
  theme: ColorTheme;
}

export const MSF_CHECKBOX_DEFAULT_OPTIONS =
  new InjectionToken<MsfCheckboxDefaultOptions>('msf-checkbox-default-options', {
    providedIn: 'root',
    factory: MSF_CHECKBOX_DEFAULT_OPTIONS_FACTORY
  });

export function MSF_CHECKBOX_DEFAULT_OPTIONS_FACTORY(): MsfCheckboxDefaultOptions {
  return {
    theme: null
  };
}
