import {List} from "@positon/collections";
import {MsfRadioChange, MsfRadioInput} from "./radio";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";
import {EventEmitter} from "@angular/core";
import {ColorTheme} from "../helpers/theme";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

export class RadioItems {
  private _items = new List<MsfRadioInput>();

  /** Selected value for the radio group. */
  private _value: any = null;


  /** The currently selected radio button. Should match value. */
  private _selected: MsfRadioInput | null = null;

  /** Whether the radio group is disabled. */
  private _disabled: boolean = false;

  /** Whether the radio group is required. */
  private _required: boolean = false;

  /**
   * Event emitted when the group value changes.
   * Change events are only emitted when the value changes due to user interaction with
   * a radio button (the same behavior as `<input type-"radio">`).
   */
  readonly change: EventEmitter<MsfRadioChange> = new EventEmitter<MsfRadioChange>();

  set theme(color: ColorTheme) {
    this.forEach(item => item.theme = color);
  }


  constructor(private _name: string) {
    AssertHelpers.isNotNull(_name);
  }

  uncheck() {
    this.items.forEach(item => item.checked = false);
  }

  select(item: MsfRadioInput) {
    if(item == null){
      this._selected = null;
      this._value = null;
      return;
    }
    if (!this.items.contains(item)) {
      throw Error("The item does not belong to the group");
    }

    if (this.selected === item) {
      return;
    }

    this.forEach(other => {
      if (other !== item) {
        other.checked = false;
      }
    });

    this._value = item.value;
    this._selected = item;

  }

  refreshValue() {
    if (!this.selected) {
      return;
    }

    if (this.selected.value !== this.value) {
      this._value = this.selected.value;
    }
  }

  add(item: MsfRadioInput) {
    AssertHelpers.isNotNull(item);
    this.items.add(item);
  }

  remove(item: MsfRadioInput) {
    this.items.remove(item);
    if (this._selected === item) {
      this._selected = null;
      this._value = null;
    }
  }

  get(index: number): MsfRadioInput {
    return this.items.get(index);
  }


  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    value = coerceBooleanProperty(value);
    this._disabled = value;
    this.forEach(item => {
      item.disabled = value;
      item._markForCheck();
    });
  }

  get length(): number {
    return this.items.size();
  }

  get items(): List<MsfRadioInput> {
    return this._items;
  }

  get name(): string {
    return this._name;
  }

  get value(): any {
    return this._value;
  }


  get selected(): MsfRadioInput | null {
    return this._selected;
  }

  forEach(callback: (a: MsfRadioInput) => void) {
    this.items.forEach(callback);
  }

  contains(item: MsfRadioInput): boolean {
    return this.items.contains(item);
  }
}
