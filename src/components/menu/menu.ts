import {
  AfterContentInit,
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren, ElementRef,
  forwardRef,
  Input,
  QueryList
} from "@angular/core";
import {MsfMenuItem} from "./menu-item";

@Component({
  template: '<ng-content></ng-content>',
  selector: 'MsfMenu',
  host: {
    'class': 'msf-menu',
    '[class.ms-depth-4]': 'depth'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MsfMenu implements AfterViewInit{
  @Input()
  depth: boolean = true;

  @ContentChildren(forwardRef(() => MsfMenuItem ), {descendants: true})
  items: QueryList<MsfMenuItem>;

  constructor(private _changeDetector: ChangeDetectorRef, private _elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    const _checkable = !this.items.toArray().every(item => !item._checkbox);
    const _hasIcon = !this.items.toArray().every(item => !item.icon);
    const _hasSecondaryText = !this.items.toArray().every(item => !item.secondaryText);

    const maxCheckboxWidth = Math.max(...this.items.toArray().map(item => item._checkboxWidth));
    const maxIconWidth = Math.max(...this.items.toArray().map(item => item._iconWidth));
    const maxLabelWidth = Math.max(...this.items.toArray().map(item => item._labelWidth));
    const maxSecondaryTextWidth = Math.max(...this.items.toArray().map(item => item._secondaryTextWidth));
    const maxSecondaryIconWidth = Math.max(...this.items.toArray().map(item => item._secondaryIconWidth));




    this.items.forEach(item => {
      item._showCheckbox = _checkable;
      item._showIcon = _hasIcon;
      item._showSecondaryText = _hasSecondaryText;

      item._checkboxWidth = maxCheckboxWidth;
      item._iconWidth = maxIconWidth;
      item._secondaryTextWidth = maxSecondaryTextWidth;
      item._secondaryIconWidth = maxSecondaryIconWidth;

      item._labelWidth = maxLabelWidth;

      item._markForCheck();
    })
  }

  get _width(): number {
    console.log(this._elementRef.nativeElement.getBoundingClientRect().width);
    return this._elementRef.nativeElement.getBoundingClientRect().width;
  }
}
