import {Dictionary} from "@positon/collections";

export class IconProvider {

  className: string;
  classPrefix: string;

  mapping: Dictionary<string, string> = new Dictionary<string, string>();
}
