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
import {CheckboxItems} from "./checkbox-items";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {DOCUMENT} from "@angular/common";




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
   * The css selector of the HTML label of the radio.
   */
  private _forLabel: string;


  /**
   * The html label of the input radio?
   */
  private _label: HTMLElement;

  /** Name value will be applied to the input element if present */
  private _name: string = this._uniqueId;

  /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
  private _id: string = this._uniqueId;

  /**
   * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
   * @docs-private
   */
  private _onTouched: () => any = () => {};
  private _controlValueAccessorChangeFn: (value: any) => void = () => {};



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

  /** Whether this checkbox button is disabled. */
  @Input()
  disabled: boolean = false;

  @Input()
  /** Whether the checkbox is required. */
  public required: boolean;



  @Input()
  rounded: boolean | null = null;




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
              @Inject(DOCUMENT) private _document: Document,
              @Optional() @Inject(MSF_CHECKBOX_DEFAULT_OPTIONS) private _defaultOptions: MsfCheckboxDefaultOptions) {
    super(_elementRef);

    this._itemsMap.add(this);


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


    if(!this.theme && this._defaultOptions && this._defaultOptions.theme) {
      this.theme = this._defaultOptions.theme;
    }

    if(this.rounded == null && this._defaultOptions && this._defaultOptions.rounded != null) {
      this.rounded = this._defaultOptions.rounded;
    }

    if(this._forLabel){
      this.forLabel = this._forLabel;
    }
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
    state = coerceBooleanProperty(state);
    if (state === this.checked) {
      return;
    }
    this._checked = state;
    this._changeDetectorRef.markForCheck();

    if(state){
      this.items.select(this);
    }else {
      this.items.unselect(this);
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

  @Input()
  get id(): string { return this._id; }

  set id( value: string) {
    this._id = value;
    this.forLabel = `label[for='${value}']`;
  }

  @Input()
  get forLabel() {
    return this._forLabel;
  }

  set forLabel(value: string) {

    if (this._label) {
      this._label.removeEventListener("click", this._forLabelEvent);
    }
    this._forLabel = value;
    this._label = this._document.querySelector(value);

    if (this._label) {
      this._label.addEventListener("click", this._forLabelEvent);
    }
  }


  get label(): HTMLElement {
    return this._label;
  }


  private _forLabelEvent = (event:Event) => {
    this.onClick(event);
  };


  @HostListener("click", ["$event"])
  onClick(event: Event) {
    event.stopPropagation();
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


  get items(): CheckboxItems {
    return this._itemsMap.get(this.name);
  }

}
