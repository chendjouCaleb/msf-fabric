import {ColorTheme, MsfColor} from "../helpers/theme";
import {InjectionToken} from "@angular/core";
import {PersonaSize} from "./persona-size";


export type PersonaPresence = "away" | "blocked" | "busy" | "dnd" | "none" | "offline" | "online" | "progress";

export const PersonaPresences = ["away" , "blocked" , "busy" , "dnd" , "none" , "offline" , "online" , "progress"];

export const defaultPersonaPresenceIcons = {
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

export const DefaultPersonaPresenceColor = {};


export interface MsfPersonaDefaultOptions {
  theme: ColorTheme;
  rounded: boolean;
  coinSize: number;
  color: MsfColor;
  personIconName: string;
  unknownIconName: string;
  size: PersonaSize;

  presenceIconNames: {};
}

export const MSF_PERSONA_DEFAULT_OPTIONS =
  new InjectionToken<MsfPersonaDefaultOptions>('msf-persona-default-options', {
    providedIn: 'root',
    factory: MSF_PERSONA_DEFAULT_OPTIONS_FACTORY
  });

export function MSF_PERSONA_DEFAULT_OPTIONS_FACTORY(): MsfPersonaDefaultOptions {
  return {
    theme: null,
    color: "darkRed",
    size: "size56",
    rounded: true,
    coinSize: 3,
    personIconName: "Contact",
    unknownIconName: "StatusCircleQuestionMark",
    presenceIconNames: defaultPersonaPresenceIcons
  };
}
