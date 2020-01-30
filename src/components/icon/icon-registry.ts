import { Dictionary } from "@positon/collections";
import {IconProvider} from "./icon-provider";
import {Injectable} from "@angular/core";

/**
 * The registry to store and provide the icon providers .
 * @author Chendjou deGrace
 * @since 28/12/2019
 * @version 1.
 */
@Injectable()
export class IconRegistry extends Dictionary<string, IconProvider>{

  /**
   * The key of the default icon provider.
   * This provider will be used by the HTML component
   * when the provider will be not filled.
   * Make sure that there are one provider which use this name in this registry.
   */
  defaultProviderName: string;

  /**
   * @inheritDoc
   * Adds a new icon provider.
   * @param key The name of the provider.
   * The icon component must use it  to use the icon provider by the provider.
   * @param provider The description of the provider.
   */
  put(key: string, provider: IconProvider) {
    super.put(key, provider);
  }
}
