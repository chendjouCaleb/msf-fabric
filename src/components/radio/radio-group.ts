import {
  AfterContentInit, ChangeDetectorRef,
  Component,
  ContentChildren, ElementRef,
  EventEmitter,
  forwardRef,
  Input, OnDestroy,
  Output,
  QueryList
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MsfRadioChange, MsfRadioInput} from "./radio";
import {ColorTheme} from "../helpers/theme";
import {RadioItemsMap} from "./radio-items-map";
import {RadioItems} from "./radio-items";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {FocusMonitor} from "@angular/cdk/a11y";

// Increasing integer for generating unique ids for radio components.
let nextUniqueId = 0;

/**
 * Provider Expression that allows mat-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export const MSF_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MsfRadioGroup),
  multi: true
};

@Component({
  templateUrl: "radio-group.html",
  selector: "MsfRadioGroup",
  providers: [MSF_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
  host: {
    'role': 'radiogroup',
    'class': 'msf-radio-group'
  }

})
export class MsfRadioGroup implements AfterContentInit, ControlValueAccessor, OnDestroy {

  /** Whether the `value` has been set to its initial value. */
  private _isInitialized: boolean = false;


  /** The HTML name attribute applied to radio buttons in this group. */
  private _name: string = `msf-radio-group-${nextUniqueId++}`;


  /** Whether the radio group is required. */
  private _required: boolean = false;

  /**
   * Color theme of buttons radio.
   */
  private _theme: ColorTheme;

  /**
   * Event emitted when the group value changes.
   * Change events are only emitted when the value changes due to user interaction with
   * a radio button (the same behavior as `<input type-"radio">`).
   */
  @Output() readonly change: EventEmitter<MsfRadioChange> = new EventEmitter<MsfRadioChange>();

  /** Child radio buttons. */
  @ContentChildren(forwardRef(() => MsfRadioInput), {descendants: true})
  _radios: QueryList<MsfRadioInput>;


  constructor(private _changeDetector: ChangeDetectorRef,
              private _groupMap: RadioItemsMap,
              private _elementRef: ElementRef<HTMLElement>,
              private _focusMonitor: FocusMonitor) {

  }


  ngAfterContentInit(): void {


    this._radios.forEach(item => {
      item.changeDetector.detach();
      item.name = this._name;
      item.change.subscribe((data) => this.change.next(data));
      item.changeDetector.detectChanges();
      item.changeDetector.reattach();
    });

    this._focusMonitor.monitor(this._elementRef.nativeElement, true)
      .subscribe(() => {
        this._touch();
      });

    this.group._controlValueAccessorChangeFn = this._controlValueAccessorChangeFn;
    this._isInitialized = true;
  }


  @Input()
  get value(): any {
    return this.group.value;
  }

  set value(_value: any) {
    if (!this._radios) {
      return;
    }

    if (_value == null) {
      this._radios.forEach(item => item.checked = false);
    } else {

      let _selected = this._radios.find(item => item.value == _value);
      if (_selected) {
        _selected.checked = true;
      }else{
        this.group.select(null);
      }


    }
  }

  @Input()
  get theme(): ColorTheme {
    return this._theme;
  }

  set theme(value: ColorTheme) {
    if(this._radios){
      this._radios.forEach(item => item.theme = value);
    }
    this._theme=value;
  }


  @Input()
  get name() {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
    if (this._isInitialized) {
      this._radios.forEach(item => item.name = this._name);
    }
  }

  /** Whether the radio group is required. */
  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = value;
  }

  /**
   * Gets the selected radio of the group.
   */
  get selected(): MsfRadioInput {
    return this.group.selected;
  }

  /** Whether the radio group is disabled. */
  @Input()
  get disabled(): boolean {
    return this.group.items.trueForAll(item => item.disabled);
  }

  set disabled(state: boolean) {
    if (this._isInitialized) {
      state = coerceBooleanProperty(state);
      this.group.disabled = state;
    }

  }

  /** The method to be called in order to update ngModel */
  _controlValueAccessorChangeFn: (value: any) => void = () => { };

  /**
   * onTouch function registered via registerOnTouch (ControlValueAccessor).
   * @docs-private
   */
  onTouched: () => any = () => { };

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
    this.value = obj;
  }

  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn: any): void {
     this._controlValueAccessorChangeFn = fn;
    if(this.group){
      this.group._controlValueAccessorChangeFn = fn;
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
  }

  /**
   * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
   * @param isDisabled Whether the control should be disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetector.markForCheck();
  }

  get group(): RadioItems {
    return this._groupMap.get(this._name);
  }
}
