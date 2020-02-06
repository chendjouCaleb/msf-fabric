import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  QueryList
} from "@angular/core";
import {MsfRadioChange} from "../radio/radio";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ColorTheme} from "../helpers/theme";
import {MsfCheckbox} from "./checkbox";
import {FocusMonitor} from "@angular/cdk/a11y";
import {CheckboxItems} from "./checkbox-items";
import {CheckboxItemsMap} from "./checkbox-items-map";
import {List} from "@positon/collections";
import {coerceBooleanProperty} from "@angular/cdk/coercion";


// Increasing integer for generating unique ids for checkbox components.
let nextUniqueId = 0;

/**
 * Provider Expression that allows mat-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export const MSF_CHECKBOX_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MsfCheckboxGroup),
  multi: true
};

@Component({
  templateUrl: "checkbox-group.html",
  selector: "MsfCheckboxGroup",
  providers: [MSF_CHECKBOX_GROUP_CONTROL_VALUE_ACCESSOR],
  host: {
    'role': 'checkboxgroup',
    'class': 'msf-checkbox-group'
  }
})
export class MsfCheckboxGroup implements AfterContentInit, ControlValueAccessor, OnDestroy {

  /** Whether the component is initialized. */
  private _isInitialized: boolean = false;


  /** The HTML name attribute applied to checkbox buttons in this group. */
  private _name: string = `msf-checkbox-group-${nextUniqueId++}`;

  /**
   * Color theme of checkbox.
   */
  private _theme: ColorTheme;



  /**
   * Event emitted when the group value changes.
   * Change events are only emitted when the value changes due to user interaction with
   * a checkbox button (the same behavior as `<input type-"checkbox">`).
   */
  @Output() readonly change: EventEmitter<MsfCheckboxGroup> = new EventEmitter<MsfCheckboxGroup>();

  /** Child radio buttons. */
  @ContentChildren(forwardRef(() => MsfCheckbox), {descendants: true})
  _checkboxChildren: QueryList<MsfCheckbox>;


  constructor(private _changeDetector: ChangeDetectorRef,
              private _groupMap: CheckboxItemsMap,
              private _elementRef: ElementRef<HTMLElement>,
              private _focusMonitor: FocusMonitor) {

  }


  ngAfterContentInit(): void {


    this._checkboxChildren.forEach(item => {
      item._changeDetector.detach();
      item.name = this._name;
      item.change.subscribe(( ) => {
        this.change.next(this);
        this._controlValueAccessorChangeFn(this.values);
      });
      item._changeDetector.detectChanges();
      item._changeDetector.reattach();
    });

    this._focusMonitor.monitor(this._elementRef.nativeElement, true)
      .subscribe(() => {
        this._touch();
      });

    this._isInitialized = true;

    console.log(this.checkboxItems.size())
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
  }


  get values(): List<any> {
    return this.checkboxItems.values;
  }

  get selected(): List<MsfCheckbox> {
    return this.checkboxItems.selected;
  }


  @Input()
  get theme(): ColorTheme {
    return this._theme;
  }

  set theme(value: ColorTheme) {
    if (this._isInitialized) {
      this._checkboxChildren.forEach(item => item.theme = value);
    }
    this._theme = value;
  }


  @Input()
  get name() {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
    if (this._isInitialized) {
      this._checkboxChildren.forEach(item => item.name = this._name);
    }
  }


  /** Whether the radio group is disabled. */
  @Input()
  get disabled(): boolean {
    return this.checkboxItems.items.trueForAll(item => item.disabled);
  }

  set disabled(state: boolean) {
    if (this._isInitialized) {
      state = coerceBooleanProperty(state);
      this.checkboxItems.items.forEach(item => item.disabled = state);
    }
  }



  /** Whether the checkbox group is rounded. */
  @Input()
  get rounded(): boolean {
    return this.checkboxItems.items.trueForAll(item => item.rounded);
  }

  set rounded(state: boolean) {
    if (this._isInitialized) {
      state = coerceBooleanProperty(state);
      this.checkboxItems.items.forEach(item => item.rounded = state);
    }

  }


  /** The method to be called in order to update ngModel */
  _controlValueAccessorChangeFn: (value: any) => void = () => {
  };

  /**
   * onTouch function registered via registerOnTouch (ControlValueAccessor).
   * @docs-private
   */
  onTouched: () => any = () => {
  };

  /**
   * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
   * radio buttons upon their blur.
   */
  _touch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  writeValue(obj: any): void {
    console.log("Write value: " );
  }

  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn: any): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
   * @param isDisabled Whether the control should be disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetector.markForCheck();
  }


  get checkboxItems(): CheckboxItems {
    return this._groupMap.get(this._name);
  }
}
