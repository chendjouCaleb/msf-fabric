import {Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild} from "@angular/core";
import {MsfBaseComponent} from "../helpers/base-component";
import {coerceBooleanProperty} from "../utils/boolean-property";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

// Increasing integer for generating unique ids for checkbox components.
let nextUniqueId = 0;


/**
 * Provider Expression that allows Checkbox to register as a ControlValueAccessor.
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
  nativeEvent: Event;
}



@Component({
  templateUrl: "checkbox.html"
})
export class MsfCheckbox extends MsfBaseComponent{
  /**
   * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
   * take precedence so this may be omitted.
   */
  @Input( )
  ariaLabel: string = '';

  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
   */
  @Input( )
  ariaLabelledby: string | null = null;

  private _uniqueId: string = "msf_Checkbox-${++nextUniqueId}";

  /** Returns the unique id for the visual hidden input. */
  private _inputId: string;


  /** Whether the checkbox is required. */
  private _required: boolean;


  /**
   * Whether the checkbox is checked.
   */
  private _checked: boolean = false;

  /**
   * Whether the checkbox is disabled.
   */
  private _disabled: boolean = false;

  /**
   * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
   * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
   * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
   * set to false.
   */
  private _indeterminate: boolean = false;


  /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
  @Input("id")
  id: string = this._uniqueId;



  /**
   * Returns the unique id for the visual hidden input.
   */
  get inputId(): string { return `${this.id || this._uniqueId}-input`; }





  /** Name value will be applied to the input element if present */
  @Input()
  name: string | null = null;

  @Input()
  value: any;


  /** Event emitted when the checkbox's `checked` value changes. */
  @Output()
  readonly change: EventEmitter<MsfCheckboxChange> = new EventEmitter<MsfCheckboxChange>();


  /** The native `<input type="checkbox">` element */
  @ViewChild('input', {static: false})
  _inputElement: ElementRef<HTMLInputElement>;



}
