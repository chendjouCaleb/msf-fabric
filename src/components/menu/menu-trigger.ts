import {
  AfterContentInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Optional, Self,
  ViewContainerRef
} from "@angular/core";
import {
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  Overlay,
  OverlayRef,
  VerticalConnectionPos
} from "@angular/cdk/overlay";
import {MsfMenu} from "./menu";
import {TemplatePortal} from "@angular/cdk/portal";
import {MenuPositionX, MenuPositionY} from "./menu-position";
import {throwMsfMenuInvalidPositionX, throwMsfMenuInvalidPositionY} from "./menu-errors";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {MSF_MENU_DEFAULT_OPTIONS, MsfMenuDefaultOptions} from "./menu-default-options";
import {MsfMenuItem} from "./menu-item";

/** Default top padding of the menu panel. */
export const MENU_PANEL_TOP_PADDING = 8;

@Directive({
  selector: '[MsfMenuTrigger]',
  host: {
    'aria-haspopup': 'true',
    '[attr.aria-expanded]': 'menuOpen || null',
    '(mousedown)': '_handleMousedown($event)',
    '(keydown)': '_handleKeydown($event)',
    '(click)': '_handleClick($event)',
  },
  exportAs: 'matMenuTrigger'
})
export class MsfMenuTrigger implements AfterContentInit, OnDestroy {

  private _xPosition: MenuPositionX = this._defaultOptions.xPosition;
  private _yPosition: MenuPositionY = this._defaultOptions.yPosition;

  /** Class to be added to the backdrop element. */
  @Input() backdropClass: string = this._defaultOptions.backdropClass;

  /** Position of the menu in the X axis. */
  @Input()
  get xPosition(): MenuPositionX {
    return this._xPosition;
  }

  set xPosition(value: MenuPositionX) {
    this._xPosition = value;
  }

  /** Position of the menu in the Y axis. */
  @Input()
  get yPosition(): MenuPositionY {
    return this._yPosition;
  }

  set yPosition(value: MenuPositionY) {
    this._yPosition = value;
  }

  /** Whether the menu should overlap its trigger. */
  @Input()
  get overlapTrigger(): boolean {
    return this._overlapTrigger;
  }

  set overlapTrigger(value: boolean) {
    this._overlapTrigger = coerceBooleanProperty(value);
  }

  private _overlapTrigger: boolean = this._defaultOptions.overlapTrigger;


  /** Whether the menu has a backdrop. */
  @Input()
  get hasBackdrop(): boolean | undefined {
    return this._hasBackdrop;
  }

  set hasBackdrop(value: boolean | undefined) {
    this._hasBackdrop = coerceBooleanProperty(value);
  }

  private _hasBackdrop: boolean | undefined = this._defaultOptions.hasBackdrop;


  private _menuOpen: boolean = false;
  private _overlayRef: OverlayRef | null = null;

  private _portal: TemplatePortal;


  @Input('MsfMenuTrigger')
  menu: MsfMenu;

  constructor(private _overlay: Overlay, private _viewContainerRef: ViewContainerRef,
              @Inject(MSF_MENU_DEFAULT_OPTIONS) private _defaultOptions: MsfMenuDefaultOptions,
              @Optional() private _parentMenu: MsfMenu,
              @Optional() @Self() private _menuItemInstance: MsfMenuItem,
              private _element: ElementRef<HTMLElement>) {
  }


  ngAfterContentInit(): void {
  }

  ngOnDestroy(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }
  }

  /** Whether the menu triggers a sub-menu or a top-level one. */
  triggersSubmenu(): boolean {
    return !!(this._menuItemInstance && this._parentMenu);
  }

  _handleMousedown(event: MouseEvent) {
    console.log('Mouse down')
  }

  _handleClick(event: MouseEvent) {
    this.openMenu();
  }

  _handleKeydown(event: KeyboardEvent) {
  }

  /** Opens the menu. */
  openMenu(): void {
    if (this.menuOpen) {
      return;
    }
    //let [originX, originFallbackX]: HorizontalConnectionPos[] = ['start', 'end'];
    const overlay = this._overlay.create({
      hasBackdrop: true,
      backdropClass: this.backdropClass,
      positionStrategy: this._overlay.position().flexibleConnectedTo(this._element)
        .withLockedPosition()
        .withTransformOriginOn('.msf-menu')

        .withPositions([{originX: "end", originY: "top", overlayX: 'end', overlayY: 'bottom'}])
    });
    const portal = this._getPortal();
    const menu = overlay.attach(portal);

    this._setPosition(overlay.getConfig().positionStrategy as FlexibleConnectedPositionStrategy);

    setTimeout(() => this.menu.computeElementWidth(), 10)
    ;
    this.menu.items.forEach(item => item._checkbox ? item._checkbox.checkbox.id = item.for : '');
    this.menu.items.forEach(item => item._click.subscribe(() => item._checkbox ? '' : overlay.detach()));


    overlay.backdropClick().subscribe(() => overlay.detach());

  }

  /**
   * Sets the appropriate positions on a position strategy
   * so the overlay connects with the trigger correctly.
   * @param positionStrategy Strategy whose position to update.
   */
  private _setPosition(positionStrategy: FlexibleConnectedPositionStrategy) {
    let [originX, originFallbackX]: HorizontalConnectionPos[] = ['end', 'start'];
    let [overlayX, overlayFallbackX] = [originX, originFallbackX];

    if(this.xPosition === 'ltl') {
      [originX, originFallbackX] = ['start', 'end'];
      [overlayX, overlayFallbackX] = ['start', 'end'];
    }else if (this.xPosition === 'rtl') {
      [originX, originFallbackX] = ['end', 'start'];
      [overlayX, overlayFallbackX] = ['start', 'end'];
    } else if (this.xPosition === 'ltr' ) {
      [originX, originFallbackX] = ['start', 'end'];
      [overlayX, overlayFallbackX] = ['end', 'start'];
    }else if(this.xPosition == 'rtr') {
      [originX, originFallbackX] = ['end', 'start'];
      [overlayX, overlayFallbackX] = ['end', 'start'];
    }


    let [overlayY, overlayFallbackY]: VerticalConnectionPos[] =  ['top', 'bottom'];
    let [originY, originFallbackY] = [overlayY, overlayFallbackY];

    console.log(this.yPosition)
    if(this.yPosition === 'ttt') {
      [originY, originFallbackY] = ['top', 'bottom'];
      [overlayY, overlayFallbackY] = ['top', 'bottom'];
    }else if(this.yPosition === 'ttb') {
      [originY, originFallbackY] = ['top', 'bottom'];
      [overlayY, overlayFallbackY] = ['bottom', 'top'];
    }else if(this.yPosition === 'btt') {
      [originY, originFallbackY] = ['bottom', 'top'];
      [overlayY, overlayFallbackY] = ['top', 'bottom'];
    }else if(this.yPosition === 'btb') {
      [originY, originFallbackY] = ['bottom', 'top'];
      [overlayY, overlayFallbackY] = ['bottom', 'top'];
    }


    let offsetY = 0;

    if (this.triggersSubmenu()) {
      // When the menu is a sub-menu, it should always align itself
      // to the edges of the trigger, instead of overlapping it.
      overlayFallbackX = originX = this.xPosition === 'ltl' ? 'start' : 'end';
      originFallbackX = overlayX = originX === 'end' ? 'start' : 'end';
      offsetY = overlayY === 'bottom' ? MENU_PANEL_TOP_PADDING : -MENU_PANEL_TOP_PADDING;
    }


    positionStrategy.withPositions([
      {originX, originY, overlayX, overlayY, offsetY},
      {originX: originFallbackX, originY, overlayX: overlayFallbackX, overlayY, offsetY},
      {
        originX,
        originY: originFallbackY,
        overlayX,
        overlayY: overlayFallbackY,
        offsetY: -offsetY
      },
      {
        originX: originFallbackX,
        originY: originFallbackY,
        overlayX: overlayFallbackX,
        overlayY: overlayFallbackY,
        offsetY: -offsetY
      }
    ]);
  }

  /** Gets the portal that should be attached to the overlay. */
  private _getPortal(): TemplatePortal {

    if (!this._portal || this._portal.templateRef !== this.menu.templateRef) {
      this._portal = new TemplatePortal(this.menu.templateRef, this._viewContainerRef);
    }

    return this._portal;
  }

  get menuOpen(): boolean {
    return this._menuOpen;
  }
}
