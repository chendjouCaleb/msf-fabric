import {Injectable} from "@angular/core";
import {Dictionary, IDictionary, List} from "@positon/collections";
import {MsfRadioInput} from "./radio";
import {RadioGroup} from "./radio-group";

@Injectable({providedIn: "root"})
export class RadioGroupMap{
  private _items = new Dictionary<string, RadioGroup>();

  add(item: MsfRadioInput) {
    if(!this._items.containsKey(item.name)) {
      this.items.put(item.name, new RadioGroup(item.name));
    }

    this.items.get(item.name).add(item);
  }

  update(item: MsfRadioInput, lastName: string) {
    if(this.items.containsKey(lastName)){
      this.items.get(lastName).remove(item);
    }


    this.add(item);
  }

  get(name: string): RadioGroup {
    return this._items.get(name);
  }

  get items(): IDictionary<string, RadioGroup> {
    return this._items;
  }
}
