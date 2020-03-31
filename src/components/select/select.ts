import {
  AfterContentInit,
  AfterViewInit, ChangeDetectionStrategy,
  Component,
  ContentChild, Directive, DoCheck, ElementRef,
  forwardRef,
  HostBinding, HostListener,
  Input, OnChanges, OnDestroy, OnInit,
  QueryList, TemplateRef,
  ViewChild, ViewContainerRef, ViewEncapsulation
} from "@angular/core";
import {MSF_SELECT_OPTION_PARENT_COMPONENT, MsfSelectOption} from "./select-option";
import {CdkConnectedOverlay} from "@angular/cdk/overlay";
import {msfSelectAnimations} from "./select-animations";
import {ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from "@angular/forms";
import {ErrorStateMatcher} from "../helpers/error/error-options";
import {CanDisable, CanDisableCtor, mixinDisabled} from "../helpers/behaviors/disabled";
import {CanUpdateErrorState, CanUpdateErrorStateCtor, mixinErrorState} from "../helpers/behaviors/error-state";
import {HasTabIndex} from "../helpers/behaviors/tabindex";
import {Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {ActiveDescendantKeyManager} from "@angular/cdk/a11y";


/** Change event object that is emitted when the select value has changed. */
export class MsfSelectChange {
  constructor(
    /** Reference to the select that emitted the change event. */
    public source: MsfSelect,
    /** Current value of the select that emitted the event. */
    public value: any) { }
}

let nextUniqueId = 0;

class MsfSelectBase {
  constructor(public _elementRef: ElementRef,
              public _defaultErrorStateMatcher: ErrorStateMatcher,
              public _parentForm: NgForm,
              public _parentFormGroup: FormGroupDirective,
              public ngControl: NgControl) {}
}

const _MsfSelectMixinBase:
  CanDisableCtor &
  CanUpdateErrorStateCtor &
  typeof MsfSelectBase = (mixinDisabled(mixinErrorState(MsfSelectBase)));


/**
 * Allows the user to customize the trigger that is displayed when the select has a value.
 */
@Directive({
  selector: 'msf-select-trigger'
})
export class MsfSelectTrigger {}

@Component({
  templateUrl: 'select.html',
  selector: 'MsfSelect',
  exportAs: 'msfSelect',
  animations: [
    msfSelectAnimations.transformPanelWrap,
    msfSelectAnimations.transformPanel
  ],
  inputs: ['disabled'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    'role': 'listbox',
    '[attr.id]': 'id',
    '[attr.tabindex]': 'tabIndex',
    '[attr.aria-label]': '_getAriaLabel()',
    '[attr.aria-labelledby]': '_getAriaLabelledby()',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-invalid]': 'errorState',
    '[attr.aria-owns]': 'panelOpen ? _optionIds : null',
    '[attr.aria-multiselectable]': 'multiple',
    '[attr.aria-describedby]': '_ariaDescribedby || null',
    '[attr.aria-activedescendant]': '_getAriaActiveDescendant()',
    '[class.mat-disabled]': 'disabled',
    '[class.msf-select-invalid]': 'errorState',
    '[class.msf-select-required]': 'required',
    '[class.msf-select-empty]': 'empty',
    'class': 'msf-select',
    '(keydown)': '_handleKeydown($event)',
    '(focus)': '_onFocus()',
    '(blur)': '_onBlur()',
  },
  providers: [
    {provide: MSF_SELECT_OPTION_PARENT_COMPONENT, useExisting: MsfSelect}
  ]
})
export class MsfSelect extends _MsfSelectMixinBase implements AfterContentInit, OnChanges,
  OnDestroy, OnInit, DoCheck, ControlValueAccessor, CanDisable, HasTabIndex, CanUpdateErrorState{

  /** Whether or not the overlay panel is open. */
  private _panelOpen = false;

  /** Whether filling out the select is required in the form. */
  private _required: boolean = false;

  /** The placeholder displayed in the trigger of the select. */
  private _placeholder: string;

  /** Whether the component is in multiple selection mode. */
  private _multiple: boolean = false;

  /** Comparison function to specify which option is displayed. Defaults to object equality. */
  private _compareWith = (o1: any, o2: any) => o1 === o2;

  /** Unique id for this input. */
  private _uid = `msf-select-${nextUniqueId++}`;

  /** Emits whenever the component is destroyed. */
  private readonly _destroy = new Subject<void>();

  /** The last measured value for the trigger's client bounding rect. */
  _triggerRect: ClientRect;

  /** The aria-describedby attribute on the select for improved a11y. */
  _ariaDescribedby: string;

  /** Deals with the selection logic. */
  _selectionModel: SelectionModel<MsfSelectOption>;

  /** Manages keyboard events for options in the panel. */
  _keyManager: ActiveDescendantKeyManager<MsfSelectOption>;

  /** `View -> model callback called when value changes` */
  _onChange: (value: any) => void = () => {};

  /** `View -> model callback called when select has been touched` */
  _onTouched = () => {};

  /** The IDs of child options to be passed to the aria-owns attribute. */
  _optionIds: string = '';

  /** The value of the select panel's transform-origin property. */
  _transformOrigin: string = 'top';

  /** Emits when the panel element is finished transforming in. */
  _panelDoneAnimatingStream = new Subject<string>();

  /** Whether the select is focused. */
  get focused(): boolean {
    return this._focused || this._panelOpen;
  }

  private _focused = false;



  @Input()
  label: string;

  @Input()
  placeholder: string;

  @Input()
  selected: string;

  @Input()
  public required = false;

  @Input()
  public disabled = false;


  @ViewChild(CdkConnectedOverlay, {static: false}) overlayDir: CdkConnectedOverlay;

  @ContentChild(forwardRef(() => TemplateRef))
  template: TemplateRef<any>;

  @ViewChild('placeholder', {read: ViewContainerRef})
  placeholderRef: ViewContainerRef;

  @ContentChild(forwardRef(() => MsfSelectOption))
  options: QueryList<MsfSelectOption>;

  private _openPanel: boolean = false;

  get openPanel(): boolean {
    return this._openPanel;
  }

  ngAfterViewInit(): void {
    // if(this.template) {
    //   this.placeholderRef.createEmbeddedView(this.template, {value: 'ab'})
    // }

  }



  _onClick() {
    this._toggle();

    console.log(this.overlayDir.open)
  }

  _toggle() {
    if (!this._openPanel) {
      this._open();
    } else {
      this._close();
    }
  }

  _open() {
    this._openPanel = true;
  }

  _close() {
    this._openPanel = false;
  }

  ngAfterContentInit(): void { }
}
