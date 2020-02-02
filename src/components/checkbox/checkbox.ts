import {Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {applyThemeClass, ColorTheme} from "../helpers/theme";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";
import {CanColor, CanColorCtor, mixinColor} from "../helpers/behaviors/theme";




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
  constructor(
  /** The source MatCheckbox of the event. */
  public source: MsfCheckbox,

  /** The native html event that triggered event */
  public nativeEvent: Event,
  /** The new `checked` value of the checkbox. */
  public checked: boolean) {}
}

class MsfCheckboxBase {
  constructor(public _elementRef: ElementRef) {}
}

const _MsfCheckboxMixinBase:
  CanColorCtor & typeof MsfCheckboxBase = mixinColor(MsfCheckboxBase );


@Component({
  templateUrl: "checkbox.html",
  selector: "MsfCheckbox",
  providers: [MSF_CHECKBOX_CONTROL_VALUE_ACCESSOR],
  host: {
    "class": "msf-checkbox",
    "[class.msf-checked]": "checked",
    "[class.msf-rounded]": "rounded",
    "[class.msf-disabled]": "disabled",

    // Needs to be -1 so the `focus` event still fires.
    "[attr.tabindex]": "disabled ? -1 : 0",
    "[attr.id]": "id",
    "[attr.disabled]": "disabled",
    "[attr.aria-labelledby]": "ariaLabelledby",
    "[attr.aria-label]": "ariaLabel"
  }
})
export class MsfCheckbox extends _MsfCheckboxMixinBase implements ControlValueAccessor, CanColor{
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

  /** Whether this radio button is disabled. */
  @Input()
  disabled: boolean = false;

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

  /** The color theme of the checkbox */
  private _theme: ColorTheme;

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



  @Input()
  rounded: boolean = false;


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


  constructor(public _elementRef: ElementRef<HTMLElement>) {
    super(_elementRef);
  }

  @Input()
  get checked(): boolean {
    return this._checked;
  }

  set checked(state: boolean) {
    this._checked = state;
  }

  // @Input()
  // get theme(): ColorTheme {
  //   return this._theme
  // }
  //
  // set theme(value: ColorTheme) {
  //   AssertHelpers.isNotNull(value);
  //   applyThemeClass(this.element, this._theme, value);
  //   this._theme = value;
  // }

  @HostListener("click")
  onClick(event: Event) {
    if(this.disabled){
      return;
    }

      this.checked = !this.checked;

    this._emitChangeEvent(event);
  }


  get element(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  get inputElement(): HTMLInputElement {
    return this._inputElement.nativeElement;
  }

  /** Dispatch change event with current value. */
  private _emitChangeEvent(event: Event): void {
    this.change.emit(new MsfCheckboxChange(this, event, this._checked));
    this._cb(this.checked);
  }

  private _cb: (_: any) => void = (_) => {};
  private _cbBlurred: any;

  registerOnChange(fn: any): void {
    this._cb = fn;
  }

  registerOnTouched(fn: any): void {
    this._cbBlurred = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    console.log('value writing')
    this.checked = !!value;
  }


}
