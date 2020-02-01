import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild
} from "@angular/core";
import {FocusMonitor} from "@angular/cdk/a11y";
import {applyThemeClass, ColorTheme} from "../helpers/theme";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";
import {RadioGroupMap} from "./radio-group-map";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {RadioGroup} from "./radio-group";

let nextUniqueId = 0;

/** Change event object emitted by MatRadio and MatRadioGroup. */
export class MsfRadioChange {
  constructor(
    /** The MatRadioButton that emits the change event. */
    public source: MsfRadioInput,
    /** The value of the MatRadioButton. */
    public value: any) {
  }
}

@Component({
  templateUrl: 'radio.html',
  selector: 'MsfRadio, [MsfRadio]',
  host: {
    'class': 'msf-radio',
    '[class.msf-checked]': 'checked',
    '[class.msf-disabled]': 'disabled',

    // Needs to be -1 so the `focus` event still fires.
    '[attr.tabindex]': 'disabled ? -1 : 0',
    '[attr.id]': 'id',
    '[attr.disabled]': 'disabled',
    '[attr.aria-labelledby]': 'ariaLabelledby',
    '[attr.aria-describedby]': 'ariaDescribedby',
    '[attr.aria-label]': 'ariaLabel'

  }
})
export class MsfRadioInput implements AfterContentInit{
  private _isInitialized: boolean = false;

  private _uniqueId: string = `msf-radio-${++nextUniqueId}`;

  /** The unique ID for the radio button. */
  @Input()
  get id(): string {
    return this._id;
  }

  set id( value: string) {
    this._id = value;

    if(this._isInitialized){
      this.forLabel = `label[for='${value}']`;
    }
  }

  private _id = this._uniqueId;

  set forLabel(value: string) {
    AssertHelpers.isNotNull(value);
    if (this._label) {
      this._label.removeEventListener("click", this._forLabelEvent);
    }
    this._forLabel = value;
    this._label = document.querySelector(value);

    if (this._label) {
      this._label.addEventListener("click", this._forLabelEvent);
    }
  }

  private _forLabel: string;
  private _label: HTMLElement;

  @Input()
  get forLabel() {
    return this._forLabel;
  }


  private _forLabelEvent = () => {
    this.onClick();
  };

  /**
   * ID of the native input element inside `<MsfRadioInput>`
   * This Id should be different to id property which is used for the MsfRadioInput
   */
  @Input()
  inputId: string = "";

  @Input()
  get theme(): ColorTheme {
    return this._theme
  }

  set theme(value: ColorTheme) {
    AssertHelpers.isNotNull(value);
    applyThemeClass(this.element, this._theme, value);
    this._theme = value;
  }

  private _theme: ColorTheme;

  /** Used to set the 'aria-label' attribute on the underlying input element. */
  @Input() ariaLabel: string;

  /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
  @Input() ariaLabelledby: string;

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input() ariaDescribedby: string;

  @Input()
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    let lastName = this.name;
    this._name = value;

    this._nameGroup.update(this, lastName);
  }

  private _name: string = this._uniqueId;

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


  /** Whether this radio is checked. */
  private _checked: boolean = false;


  /** Value assigned to this radio. */
  private _value: any = null;


  /** The native `<input type=radio>` element */
  @ViewChild("inputElement", {static: false})
  private _inputElement: ElementRef<HTMLInputElement>;

  constructor(private _elementRef: ElementRef<HTMLElement>,
              private _changeDetector: ChangeDetectorRef,
              private _nameGroup: RadioGroupMap,
              private _focusMonitor: FocusMonitor
  ) {
    this._nameGroup.add(this);
    setTimeout(() => {
      this.inputElement.addEventListener("change", () => {
        console.log(this.inputElement.checked)
      })
    }, 1000)
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

  ngOnInit() {
  }

  /** Focuses the radio button. */
  focus(): void {
    this._focusMonitor.focusVia(this._inputElement, 'keyboard');
  }


  ngOnDestroy() {
    if (this._label ) {
      this._label.removeEventListener("click", this._forLabelEvent);
    }

    this.group.remove(this);
  }

  /** Dispatch change event with current value. */
  private _emitChangeEvent(): void {
    this.change.emit(new MsfRadioChange(this, this._value));
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
    this._checked = value;
    this._changeDetector.detectChanges();
  }

  @HostListener("click")
  onClick() {
    if(this.disabled){
      return;
    }
    if (!this._checked) {
      this.checked = true;
    }
    this._emitChangeEvent();
  }


  get element(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  get inputElement(): HTMLInputElement {
    return this._inputElement.nativeElement;
  }

  get group(): RadioGroup {
    return this._nameGroup.get(this.name);
  }

  ngAfterContentInit(): void {
    this._isInitialized = true;

    this.forLabel = `label[for='${this.id}']`
  }

}
