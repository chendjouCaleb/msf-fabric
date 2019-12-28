import { Dictionary } from "@positon/collections";
import {IconProvider} from "./icon-provider";
import {Injectable} from "@angular/core";

@Injectable()
export class IconRegistry extends Dictionary<string, IconProvider>{
  defaultProviderName: string;
}
