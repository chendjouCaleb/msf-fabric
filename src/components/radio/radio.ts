import {
  AfterContentInit, ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener, Inject,
  Input, OnDestroy, OnInit, Optional,
  Output,
  ViewChild
} from "@angular/core";
import {FocusMonitor} from "@angular/cdk/a11y";
import {applyThemeClass, ColorTheme} from "../helpers/theme";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";
import {RadioItemsMap} from "./radio-items-map";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {RadioItems} from "./radio-items";
import {CanColor, CanColorCtor, mixinColor} from "../helpers/behaviors/theme";
import {MSF_RADIO_DEFAULT_OPTIONS, MsfRadioDefaultOptions} from "./radio-options";
import {CanDepth, CanDepthCtor, mixinDepth} from "../helpers/behaviors/depth";

let nextUniqueId = 0;

/** Change event object emitted by MatRadio and MatRadioGroup. */
export class MsfRadioChange {
  /**
   * The constructor.
   * @param source he MatRadioButton that emits the change event.
   * @param value The value of the MatRadioButton.
   */
  constructor( public source: MsfRadioInput, public value: any) { }
}

class MsfRadioInputBase {
  constructor(public _elementRef: ElementRef) {}
}

const _MsfCheckboxMixinBase:
  CanColorCtor & CanDepthCtor & typeof MsfRadioInputBase = mixinDepth(mixinColor(MsfRadioInputBase) );




@Component({
  templateUrl: 'radio.html',
  selector: 'MsfRadio, [MsfRadio]',
  host: {
    'class': 'msf-radio',
    '[class.msf-checked]': 'checked',
    '[class.msf-disabled]': 'disabled',

    '[attr.tabindex]': 'disabled ? -1 : 0',
    '[attr.id]': 'id',
    '[attr.disabled]': 'disabled',
    '[attr.aria-labelledby]': 'ariaLabelledby',
    '[attr.aria-describedby]': 'ariaDescribedby',
    '[attr.aria-label]': 'ariaLabel'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: [ 'theme', 'depth']
})

/**
 * The radio input component.
 * Code inspired by Angular Material.
 * Design inspired by Microsoft Fabric.
 *
 * @author Chendjou Caleb deGrace
 * @version 1.
 */
export class MsfRadioInput extends _MsfCheckboxMixinBase implements CanColor, CanDepth, AfterContentInit, OnInit, OnDestroy{
  /**
   * ID of the native input element inside `<MsfRadioInput>`
   * This Id should be different to id property which is used for the MsfRadioInput
   */
  @Input()
  inputId: string = "";



  /** Used to set the 'aria-label' attribute on the underlying input element. */
  @Input() ariaLabel: string;

  /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
  @Input() ariaLabelledby: string;

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input() ariaDescribedby: string;

  /** Whether this radio button is disabled. */
  @Input()
  disabled: boolean = false;

  /**
   * Event emitted when the checked state of this radio button changes.
   * Change events are only emitted when the value changes due to user interaction with
   * the radio button (the same behavior as `<input type-"radio">`).
   */
  @Output()
  readonly change: EventEmitter<MsfRadioChange> = new EventEmitter<MsfRadioChange>();

  /**
   * Tells whether the component is initialised.
   */
  private _isInitialized: boolean = false;

  private _uniqueId: string = `msf-radio-${++nextUniqueId}`;

  /** The unique ID for the radio button. */
  private _id = this._uniqueId;

  /**
   * The css selector of the HTML label of the radio.
   */
  private _forLabel: string;


  /**
   * The html label of the input radio?
   */
  private _label: HTMLElement;

  /**
   * The name of the input radio. The modification of name
   * change the group of the radio.
   */
  private _name: string = this._uniqueId;


  /** Whether this radio is checked. */
  private _checked: boolean = false;


  /** Value assigned to this radio. */
  private _value: any = null;


  /** The native `<input type=radio>` element */
  @ViewChild("inputElement", {static: false})
  private _inputElement: ElementRef<HTMLInputElement>;






  constructor(public _elementRef: ElementRef<HTMLElement>,
              private _changeDetector: ChangeDetectorRef,
              private _nameGroup: RadioItemsMap,
              private _focusMonitor: FocusMonitor,
              @Optional() @Inject(MSF_RADIO_DEFAULT_OPTIONS)
              private _providerOverride?: MsfRadioDefaultOptions
  ) {
    super(_elementRef);
    this._nameGroup.add(this);

  }



  ngOnInit() {
    if(!this.theme && this._providerOverride && this._providerOverride.color) {
      this.theme = this._providerOverride.color;
    }
  }



  ngOnDestroy() {
    if (this._label ) {
      this._label.removeEventListener("click", this._forLabelEvent);
    }

    this.group.remove(this);
  }

  @HostListener("click")
  onClick() {

    if(this.disabled){
      return;
    }
    if (!this._checked) {
      this.checked = true;
      this.group._controlValueAccessorChangeFn(this.value);
      this._emitChangeEvent();
    }
  }



  ngAfterContentInit(): void {
    this._isInitialized = true;

    this.forLabel = `label[for='${this.id}']`
  }


  @Input()
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    let lastName = this.name;
    this._name = value;
    this._markForCheck();
    this._nameGroup.update(this, lastName);
  }


  @Input()
  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;

    if(this._isInitialized){
      this.inputElement.value = value;

      if (this.checked) {
        this.group.refreshValue();
      }
    }
  }


  @Input()
  get checked(): boolean {
    return this._checked;
  }

  set checked(value: boolean) {
    value = coerceBooleanProperty(value);

    if (value) {
      this._nameGroup.get(this.name).select(this);
    }
    else if(!value && this.group.selected == this){
      this.group.select(null);
    }
    this._checked = value;
    this._changeDetector.detectChanges();
  }


  @Input()
  get id(): string { return this._id; }

  set id( value: string) {
    this._id = value;

    if(this._isInitialized){
      this.forLabel = `label[for='${value}']`;
    }
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
    this._label = document.querySelector(value);

    if (this._label) {
      this._label.addEventListener("click", this._forLabelEvent);
    }
  }


  get label(): HTMLElement {
    return this._label;
  }


  private _forLabelEvent = () => {
    this.onClick();
  };



  get element(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  get inputElement(): HTMLInputElement {
    return this._inputElement.nativeElement;
  }

  get group(): RadioItems {
    return this._nameGroup.get(this.name);
  }

  get changeDetector(): ChangeDetectorRef{
    return this._changeDetector;
  }


  /**
   * Marks the radio button as needing checking for change detection.
   * This method is exposed because the parent radio group will directly
   * update bound properties of the radio button.
   */
  _markForCheck() {
    // When group value changes, the button will not be notified. Use `markForCheck` to explicit
    // update radio button's status
    this._changeDetector.markForCheck();
  }

  /** Dispatch change event with current value. */
  private _emitChangeEvent(): void {
    this.change.emit(new MsfRadioChange(this, this._value));
  }


}
