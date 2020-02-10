import {ColorTheme, MsfColor} from "../helpers/theme";
import {InjectionToken} from "@angular/core";
import {PersonnaSize} from "./personna-size";


export type PersonnaPresence = "away" | "blocked" | "busy" | "dnd" | "none" | "offline" | "online" | "progress";

export const PersonnaPresences = ["away" , "blocked" , "busy" , "dnd" , "none" , "offline" , "online" , "progress"];

export const defaultPersonnaPresenceIcons = {
  "away": "SkypeClock",
  "blocked": "Blocked",
  "busy": "CircleFill",
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
  coinSize: number;
  color: MsfColor;
  personIconName: string;
  unknownIconName: string;
  size: PersonnaSize;

  presenceIconNames: {};
}

export const MSF_PERSONNA_DEFAULT_OPTIONS =
  new InjectionToken<MsfPersonnaDefaultOptions>('msf-personna-default-options', {
    providedIn: 'root',
    factory: MSF_PERSONNA_DEFAULT_OPTIONS_FACTORY
  });

export function MSF_PERSONNA_DEFAULT_OPTIONS_FACTORY(): MsfPersonnaDefaultOptions {
  return {
    theme: null,
    color: "darkRed",
    size: "size56",
    rounded: true,
    coinSize: 3,
    personIconName: "Contact",
    unknownIconName: "StatusCircleQuestionMark",
    presenceIconNames: defaultPersonnaPresenceIcons
  };
}
