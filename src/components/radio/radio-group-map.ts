import {Injectable} from "@angular/core";
import {Dictionary, IDictionary, List} from "@positon/collections";
import {MsfRadioInput} from "./radio";
import {RadioItems} from "./radio-items";

@Injectable({providedIn: "root"})
export class RadioGroupMap{
  private _items = new Dictionary<string, RadioItems>();

  add(item: MsfRadioInput) {
    if(!this._items.containsKey(item.name)) {
      this.items.put(item.name, new RadioItems(item.name));
    }

    this.items.get(item.name).add(item);
  }

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
