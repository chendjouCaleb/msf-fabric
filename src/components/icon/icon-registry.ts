import { Dictionary } from "@positon/collections";
import {IconProvider} from "./icon-provider";

export class IconRegistry extends Dictionary<string, IconProvider>{
  defaultProviderName: string;
}
