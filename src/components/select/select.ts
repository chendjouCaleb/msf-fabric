import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren, ElementRef, EventEmitter,
  forwardRef,
  HostBinding,
  Input, Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import {MSF_SELECT_OPTION_PARENT_COMPONENT, MsfSelectOption, MsfSelectOptionParentComponent} from "./select-option";
import {CdkConnectedOverlay} from "@angular/cdk/overlay";
import {msfSelectAnimations} from "./select-animations";
import {MsfSelectTemplate, MsfSelectTemplateContext} from "./select-template";
import {ControlValueAccessor} from "@angular/forms";


/** Change event object that is emitted when the select value has changed. */
export class MsfSelectChange {
  constructor(
    /** Reference to the select that emitted the change event. */
    public source: MsfSelect,
    /** Current value of the select that emitted the event. */
    public value: any) {
  }
}

@Component({
  templateUrl: 'select.html',
  selector: 'MsfSelect',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    msfSelectAnimations.transformPanelWrap,
    msfSelectAnimations.transformPanel
  ],
  providers: [
    {provide: MSF_SELECT_OPTION_PARENT_COMPONENT, useExisting: MsfSelect}
  ]
})
export class MsfSelect implements AfterViewInit, AfterContentInit, MsfSelectOptionParentComponent, ControlValueAccessor {
  @HostBinding('class')
  className = 'msf-select';

  @Input()
  label: string;

  @Input()
  placeholder: string = 'Select a value';

  @Input()
  selected: string;

  @Input()
  public required = false;

  @Input()
  public disabled = false;

  @Input()
  values: any[] = [];

  @Input()
  value: any;

  @Input()
  multiple = false;

  @Output()
  change: EventEmitter<MsfSelectChange> = new EventEmitter<MsfSelectChange>();


  @ViewChild(CdkConnectedOverlay, {static: false}) overlayDir: CdkConnectedOverlay;

  @ViewChild("defaultTemplate", {read: TemplateRef})
  defaultTemplate: TemplateRef<any>;

  @ContentChild(forwardRef(() => MsfSelectTemplate))
  contentTemplate: MsfSelectTemplate;

  @ViewChild('contentView', {read: ViewContainerRef})
  contentView: ViewContainerRef;

  @ViewChild('content')
  contentLayout: ElementRef<HTMLElement>;

  @ContentChildren(forwardRef(() => MsfSelectOption), {descendants: true})
  options: QueryList<MsfSelectOption>;

  private _openPanel: boolean = false;

  constructor(private _changeDetector: ChangeDetectorRef) {
  }

  get openPanel(): boolean {
    return this._openPanel;
  }

  ngAfterViewInit(): void {
    //this.contentLayout.nativeElement.style.width = this.contentLayout.nativeElement.offsetWidth + 'px';
    this.options.forEach(item => {
      item.onSelectionChange.subscribe(() => {
        if (item.selected) {
          if (!this.multiple) {
            this.unselect(item);
            this.value = item.value;
            this._changeValue(this.value);
            this._close();
          }
          if (this.multiple) {


            this.values.push(item.value);
            this._changeValues(this.values);
          }
        }

        if (!item.selected && this.multiple) {
          this.values = this.values.filter(v => v !== item.value);
          this._changeValues(this.values);
        }
      })
    })

  }

  _changeValue(value: any) {
    this._changeDetector.detectChanges();

    this.contentView.clear();
    this.contentView.createEmbeddedView(this.template, {value: this.value});
    this._changeDetector.detectChanges();
  }


  _changeValues(values: any[]) {
    this._changeDetector.detectChanges();

      this.contentView.clear();
      this.contentView.createEmbeddedView(this.template, {values});
      this._changeDetector.detectChanges();
  }

  unselect(ex: MsfSelectOption) {
    this.options.filter(i => i !== ex).forEach(i => i.deselect());
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
    this._changeDetector.detectChanges();
  }

  ngAfterContentInit(): void {
  }

  get template(): TemplateRef<MsfSelectTemplateContext> {
    if (this.contentTemplate) {
      return this.contentTemplate.template;
    }
    return this.defaultTemplate;
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    console.log("write value")
  }
}
