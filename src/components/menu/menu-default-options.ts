/** Default `mat-menu` options that can be overridden. */
import {MenuPositionX, MenuPositionY} from "./menu-position";
import {InjectionToken} from "@angular/core";

export interface MsfMenuDefaultOptions {
  /** The x-axis position of the menu. */
  xPosition: MenuPositionX;

  /** The y-axis position of the menu. */
  yPosition: MenuPositionY;

  /** Whether the menu should overlap the menu trigger. */
  overlapTrigger: boolean;

  /** Class to be applied to the menu's backdrop. */
  backdropClass: string;

  /** Whether the menu has a backdrop. */
  hasBackdrop?: boolean;
}

/** Injection token to be used to override the default options for `mat-menu`. */
export const MSF_MENU_DEFAULT_OPTIONS =
  new InjectionToken<MsfMenuDefaultOptions>('msf-menu-default-options', {
    providedIn: 'root',
    factory: MSF_MENU_DEFAULT_OPTIONS_FACTORY
  });

/** @docs-private */
export function MSF_MENU_DEFAULT_OPTIONS_FACTORY(): MsfMenuDefaultOptions {
  return {
    overlapTrigger: false,
    xPosition: 'rtr',
    yPosition: 'btt',
    backdropClass: 'cdk-overlay-transparent-backdrop',
  };
}
