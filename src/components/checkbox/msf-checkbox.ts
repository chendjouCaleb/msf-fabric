import {Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild} from "@angular/core";
import {MsfBaseComponent} from "../helpers/base-component";
import {coerceBooleanProperty} from "../utils/boolean-property";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

// Increasing integer for generating unique ids for checkbox components.
let nextUniqueId = 0;


/**
 * Provider Expression that allows MsfCheckbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const MSF_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MsfCheckbox),
  multi: true
};


/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */
export enum TransitionCheckState {
  /** The initial state of the component before any user interaction. */
  Init,
  /** The state representing the component when it's becoming checked. */
  Checked,
  /** The state representing the component when it's becoming unchecked. */
  Unchecked,
  /** The state representing the component when it's becoming indeterminate. */
  Indeterminate
}



/** Change event object emitted by MatCheckbox. */
export class MsfCheckboxChange {
  /** The source MatCheckbox of the event. */
  source: MsfCheckbox;
  /** The new `checked` value of the checkbox. */
  checked: boolean;

  /** The native html event that triggered event */
  event: Event;
}



@Component({
  templateUrl: "radio.html"
})
export class MsfCheckbox extends MsfBaseComponent{
  private _uniqueId: string = "msf_Checkbox-${++nextUniqueId}";


  /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
  @Input("id")
  id: string;


  /**
   * Returns the unique id for the visual hidden input.
   */
  get inputId(): string { return `${this.id || this._uniqueId}-input`; }

  /** Whether the checkbox is required. */
  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }
  private _required: boolean;

  /** Whether the label should appear after or before the checkbox. Defaults to 'after' */
  @Input() LabelPosition: 'before' | 'after' = 'after';


  /** Name value will be applied to the input element if present */
  @Input("name")
  name: string | null = null;

  @Input("value")
  value: any;


  /** Event emitted when the checkbox's `checked` value changes. */
  @Output()
  readonly onChange: EventEmitter<MsfCheckboxChange> = new EventEmitter<MsfCheckboxChange>();


  /** Event emitted when the checkbox's `indeterminate` value changes. */
  @Output() readonly indeterminateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** The native `<input type="checkbox">` element */
  @ViewChild('input', {static: false})
  _inputElement: ElementRef<HTMLInputElement>;



}
