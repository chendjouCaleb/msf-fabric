import {Injectable} from "@angular/core";
import {Dictionary, IDictionary } from "@positon/collections";

import {CheckboxItems} from "./checkbox-items";
import {MsfCheckbox} from "./checkbox";

/**
 * This service is used to group all checkbox according to their name.
 *
 * when a checkbox change a name, the update function
 * of this service change the group of this checkbox.
 */
@Injectable({providedIn: "root"})
export class CheckboxItemsMap{
  private _items = new Dictionary<string, CheckboxItems>();

  /**
   * Adds a new checkbox in a group.
   * @param item The checkbox to put.
   */
  add(item: MsfCheckbox) {
    if(!this._items.containsKey(item.name)) {
      this.items.put(item.name, new CheckboxItems(item.name));
    }

    this.items.get(item.name).add(item);
  }

  /**
   * Changes to group of a checkbox.
   * This function should be called when the name of the checkbox change.
   * @param item The checkbox to update.
   * @param lastName The old name of checkbox.
   */
  update(item: MsfCheckbox, lastName: string) {
    if(this.items.containsKey(lastName)){
      this.items.get(lastName).remove(item);
    }


    this.add(item);
  }

  get(name: string): CheckboxItems {
    return this._items.get(name);
  }

  get items(): IDictionary<string, CheckboxItems> {
    return this._items;
  }
}
