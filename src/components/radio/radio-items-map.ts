import {Injectable} from "@angular/core";
import {Dictionary, IDictionary } from "@positon/collections";
import {MsfRadioInput} from "./radio";
import {RadioItems} from "./radio-items";

/**
 * This service is used to group all radio according to their name.
 *
 * when a radio change a name, the update function
 * of this service change the group of this radio.
 */
@Injectable({providedIn: "root"})
export class RadioItemsMap{
  private _items = new Dictionary<string, RadioItems>();

  /**
   * Adds a new radio in a group.
   * @param item The radio to put.
   */
  add(item: MsfRadioInput) {
    if(!this._items.containsKey(item.name)) {
      this.items.put(item.name, new RadioItems(item.name));
    }

    this.items.get(item.name).add(item);
  }

  /**
   * Changes to group of a radio.
   * This function should be called when the name of the radio change.
   * @param item The radio to update.
   * @param lastName The old name of radio.
   */
  update(item: MsfRadioInput, lastName: string) {
    if(this.items.containsKey(lastName)){
      this.items.get(lastName).remove(item);
    }


    this.add(item);
  }

  get(name: string): RadioItems {
    return this._items.get(name);
  }

  get items(): IDictionary<string, RadioItems> {
    return this._items;
  }
}
