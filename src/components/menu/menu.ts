import {
  AfterContentInit,
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren, ElementRef,
  forwardRef, HostBinding,
  Input,
  QueryList, TemplateRef, ViewChild
} from "@angular/core";
import {MsfMenuItem} from "./menu-item";
import {Subject} from "rxjs";
import {Direction} from "@angular/cdk/bidi";
import {msfMenuAnimations} from "./menu-animations";

@Component({
  templateUrl: 'menu.html',
  exportAs: 'MsfMenu',
  selector: 'MsfMenu',
  host: {
    'class': 'msf-menu'

  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    msfMenuAnimations.transformMenu

  ],
})
export class MsfMenu implements AfterViewInit {
  /** Current state of the panel animation. */
  _panelAnimationState: 'void' | 'enter' = 'void';

  /** Emits whenever an animation on the menu completes. */
  _animationDone = new Subject<AnimationEvent>();

 /** Whether the menu is animating. */
  _isAnimating: boolean;

  /** Parent menu of the current menu panel. */
  parentMenu: MsfMenu | undefined;

  /** Layout direction of the menu. */
  direction: Direction;

  @Input()
  depth: boolean = true;

  @ContentChildren(forwardRef(() => MsfMenuItem), {descendants: true})
  items: QueryList<MsfMenuItem>;

  @ViewChild(TemplateRef, {static: false}) templateRef: TemplateRef<any>;

  constructor(private _changeDetector: ChangeDetectorRef, private _elementRef: ElementRef<HTMLElement>) {
    this._elementRef.nativeElement.style.pointerEvents = 'none';
  }

  ngAfterViewInit(): void {
  }

  computeElementWidth(): void {
    this.items.forEach(i => i.computeSize());

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

      if(item._checkboxRef){
        item._checkboxRef.nativeElement.style.width = maxCheckboxWidth + 'px';
      }

      item._iconWidth = maxIconWidth;
      item._secondaryTextWidth = maxSecondaryTextWidth;
      item._secondaryIconWidth = maxSecondaryIconWidth;

      item.labelRef.nativeElement.style.width  = maxLabelWidth + "px";
      console.log(maxLabelWidth)

      item._markForCheck();
    })
  }

  get _width(): number {
    console.log(this._elementRef.nativeElement.getBoundingClientRect().width);
    return this._elementRef.nativeElement.getBoundingClientRect().width;
  }


  /** Starts the enter animation. */
  _startAnimation() {
    // @breaking-change 8.0.0 Combine with _resetAnimation.
    this._panelAnimationState = 'enter';
  }

  /** Resets the panel animation to its initial state. */
  _resetAnimation() {
    // @breaking-change 8.0.0 Combine with _startAnimation.
    this._panelAnimationState = 'void';
  }

  /** Callback that is invoked when the panel animation completes. */
  _onAnimationDone(event: AnimationEvent) {
    this._animationDone.next(event);
    this._isAnimating = false;
    this._changeDetector.detectChanges();
  }

  _onAnimationStart(event: AnimationEvent) {
    this._isAnimating = true;
    this._changeDetector.detectChanges();
    console.log("start animation")
  }
}
