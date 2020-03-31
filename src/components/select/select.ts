import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  forwardRef,
  HostBinding, HostListener,
  Input,
  QueryList, TemplateRef,
  ViewChild, ViewContainerRef
} from "@angular/core";
import {MsfSelectOption} from "./select-option";
import {CdkConnectedOverlay} from "@angular/cdk/overlay";
import {msfSelectAnimations} from "./select-animations";

@Component({
  templateUrl: 'select.html',
  selector: 'MsfSelect',
  animations: [
    msfSelectAnimations.transformPanelWrap,
    msfSelectAnimations.transformPanel
  ],
})
export class MsfSelect implements AfterViewInit, AfterContentInit {
  @HostBinding('class')
  className = 'msf-select';

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
