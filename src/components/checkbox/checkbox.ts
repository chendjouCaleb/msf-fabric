import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener, Inject,
  Input, OnDestroy, OnInit, Optional,
  Output
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CanColor, CanColorCtor, mixinColor} from "../helpers/behaviors/theme";
import {FocusMonitor} from "@angular/cdk/a11y";
import {MSF_CHECKBOX_DEFAULT_OPTIONS, MsfCheckboxDefaultOptions} from "./checkbox-options";
import {CheckboxItemsMap} from "./checkbox-items-map";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";




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


/**
 * Change event object emitted by MsfCheckbox.
 */
export class MsfCheckboxChange {
  /**
   * Ctor
   * @param source The source MatCheckbox of the event.
   * @param nativeEvent The native html event that triggered event
   * @param checked The new `checked` value of the checkbox.
   */
  constructor( public source: MsfCheckbox, public nativeEvent: Event, public checked: boolean) {}
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
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: [ 'theme']
})

export class MsfCheckbox extends _MsfCheckboxMixinBase implements ControlValueAccessor, CanColor, OnDestroy, OnInit{

  /**
   * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
   * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
   * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
   * set to false.
   */
  private _indeterminate: boolean = false;

  private _uniqueId: string =  `msf_checkbox-${++nextUniqueId}`;

  /**
   * Whether the checkbox is checked.
   */
  private _checked: boolean = false;

  /**
   * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
   * @docs-private
   */
  private _onTouched: () => any = () => {};

  private _currentAnimationClass: string = '';

  private _currentCheckState: TransitionCheckState = TransitionCheckState.Init;

  private _controlValueAccessorChangeFn: (value: any) => void = () => {};

  /** Name value will be applied to the input element if present */
  private _name: string = this._uniqueId;

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

  @Input()
  /** Whether the checkbox is required. */
  public required: boolean;

  /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
  @Input()
  id: string = this._uniqueId;

  @Input()
  rounded: boolean = false;




  /** The value attribute of the native input element */
  @Input()
  value: any;


  /** Event emitted when the checkbox's `checked` value changes. */
  @Output()
  readonly change: EventEmitter<MsfCheckboxChange> = new EventEmitter<MsfCheckboxChange>();

  /** Event emitted when the checkbox's `indeterminate` value changes. */
  @Output() readonly indeterminateChange: EventEmitter<boolean> = new EventEmitter<boolean>();





  constructor(public _elementRef: ElementRef<HTMLElement>,
              private _changeDetectorRef: ChangeDetectorRef,
              private _focusMonitor: FocusMonitor,
              private _itemsMap: CheckboxItemsMap,
              @Optional() @Inject(MSF_CHECKBOX_DEFAULT_OPTIONS) private _defaultOptions: MsfCheckboxDefaultOptions) {
    super(_elementRef);

    this._focusMonitor.monitor(_elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        // When a focused element becomes disabled, the browser *immediately* fires a blur event.
        // Angular does not expect events to be raised during change detection, so any state change
        // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
        // See https://github.com/angular/angular/issues/17793. To work around this, we defer
        // telling the form control it has been touched until the next tick.
        Promise.resolve().then(() => {
          this._onTouched();
          _changeDetectorRef.markForCheck();
        });
      }
    });
  }

  ngOnInit(): void {
    this._itemsMap.add(this);
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
    this._itemsMap.get(this.name).remove(this);
  }

  @Input()
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    AssertHelpers.isNotNull(value);
    let lastName = this._name;
    this._name = value;

    this._itemsMap.update(this, lastName);
  }

  @Input()
  get checked(): boolean {
    return this._checked;
  }

  set checked(state: boolean) {
    if (state != this.checked) {
      this._checked = state;
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
   * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
   * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
   * set to false.
   */
  @Input()
  get indeterminate(): boolean { return this._indeterminate; }
  set indeterminate(value: boolean) {

    if (value != this._indeterminate) {
      this._indeterminate = value;
      this.indeterminateChange.emit(this._indeterminate);
    }
  }



  @HostListener("click")
  onClick(event: Event) {
    if(this.disabled){
      return;
    }

    if(this.indeterminate) {
      this.indeterminate = false;
    }

    this.toggle();

    this._emitChangeEvent(event);
  }


  get element(): HTMLElement {
    return this._elementRef.nativeElement;
  }


  /** Dispatch change event with current value. */
  private _emitChangeEvent(event: Event): void {
    this.change.emit(new MsfCheckboxChange(this, event, this._checked));
    this._controlValueAccessorChangeFn(this.checked);
  }


  registerOnChange(fn: any): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this.checked = !!value;
  }

  _getAriaChecked(): 'true' | 'false' | 'mixed' {
    return this.checked ? 'true' : (this.indeterminate ? 'mixed' : 'false');
  }

  /** Toggles the `checked` state of the checkbox. */
  toggle(): void {
    this.checked = !this.checked;
  }

  get _changeDetector() {
    return this._changeDetectorRef;
  }

}
