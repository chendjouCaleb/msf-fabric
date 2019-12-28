import {Dictionary} from "@positon/collections";

/**
 * Used to provide the description of an icon provider
 * like Material Design Icon.
 *
 * To use this provider, the icon system must have
 * a general class to add to
 */
export class IconProvider {
  className: string;
  classPrefix: string;

  mapping: Dictionary<string, string> = new Dictionary<string, string>();
}
