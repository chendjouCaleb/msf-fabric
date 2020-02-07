import {ColorTheme} from "../helpers/theme";
import {InjectionToken} from "@angular/core";


export type PersonnaPresence = "away" | "blocked" | "busy" | "dnd" | "none" | "offline" | "online" | "progress";

export const PersonnaPresences = ["away" , "blocked" , "busy" , "dnd" , "none" , "offline" , "online" , "progress"];

export const DefaultPersonnaPresenceIcon = {
  "away": "AwayStatus",
  "blocked": "Blocked",
  "busy": "StatusCircleInner",
  "dnd": "SkypeMinus",
  "none": "",
  "offline": "StatusCircleRing",
  "online": "StatusCircleCheckmark",
  "progress": "ProgressRingDots"
};
//ProgressLoopInner, ProgressLoopOuter

export const DefaultPersonnaPresenceColor = {};


export interface MsfPersonnaDefaultOptions {
  theme: ColorTheme;
  rounded: boolean;
  coinSize: number
}

export const MSF_PERSONNA_DEFAULT_OPTIONS =
  new InjectionToken<MsfPersonnaDefaultOptions>('msf-personna-default-options', {
    providedIn: 'root',
    factory: MSF_PERSONNA_DEFAULT_OPTIONS_FACTORY
  });

export function MSF_PERSONNA_DEFAULT_OPTIONS_FACTORY(): MsfPersonnaDefaultOptions {
  return {
    theme: null,
    rounded: true,
    coinSize: 3
  };
}
