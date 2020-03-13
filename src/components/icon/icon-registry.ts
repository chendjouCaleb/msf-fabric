import {Dictionary, IDictionary} from "@positon/collections";
import {IconProvider} from "./icon-provider";
import {Injectable} from "@angular/core";

/**
 * The registry to store and provide the icon providers .
 * @author Chendjou deGrace
 * @since 28/12/2019
 * @version 1.
 */
@Injectable()
export class IconRegistry implements IDictionary<string, IconProvider>{

    private _items = new Dictionary<string, IconProvider>();


    keys(): import("@positon/collections").ICollection<string> {
        return this._items.keys();
    }
    values(): import("@positon/collections").ICollection<IconProvider> {
      return this._items.values();
    }
    keyValues(): import("@positon/collections").ICollection<import("@positon/collections").KeyPairValue<string, IconProvider>> {
      return this._items.keyValues();
    }

    containsKey(key: string): boolean {
      return this._items.containsKey(key);
    }

    size(): number {
      return this._items.size();
    }
    remove(key: string): boolean {
      return this._items.remove(key);
    }
    isEmpty(): boolean {
      return this._items.isEmpty();
    }
    containsValue(value: IconProvider): boolean {
      return this._items.containsValue(value);
    }
    get(key: string): IconProvider {
      return this._items.get(key);
    }
    clear(): void {
        this._items.clear();
    }

    enumerator(): import("@positon/collections").IEnumerator<import("@positon/collections").KeyPairValue<string, IconProvider>> {
      return this._items.enumerator();
    }

    [Symbol.iterator](): import("@positon/collections").EnumeratorIterator<import("@positon/collections").KeyPairValue<string, IconProvider>> {
      return this._items[Symbol.iterator]();
    }
    forEach(action: (item: import("@positon/collections").KeyPairValue<string, IconProvider>) => void) {
      return this._items.forEach(action);
    }


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
    this._items.put(key, provider);
  }
}
