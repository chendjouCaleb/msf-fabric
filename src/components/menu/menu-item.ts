import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChild, ContentChildren,
  ElementRef, forwardRef, HostListener,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {CanDisable, CanDisableCtor, mixinDisabled} from "../helpers/behaviors/disabled";
import {FocusableOption} from "@angular/cdk/a11y";
import {Subject} from "rxjs";
import {ColorTheme} from "../helpers/theme";
import {MsfMenuItemCheckbox} from "./menu-item-checkbox";

class MsfMenuItemBase {
}

const _MatMenuItemMixinBase: CanDisableCtor & typeof MsfMenuItemBase =
  mixinDisabled(MsfMenuItemBase);


let _uniqueId = 0;

@Component({
  selector: 'MsfMenuItem',
  templateUrl: 'menu-item.html',
  exportAs: 'msfMenuItem',
  inputs: ['disabled'],
  host: {
    '[attr.role]': 'role',
    '[attr.for]': 'for',
    'class': 'msf-menuItem',
    '[class.msf-theme-error]': `theme === 'error'`,
    '[class.msf-theme-primary]': `theme === 'primary'`,
    '[class.msf-theme-success]': `theme === 'success'`,
    '[class.msf-menuItem-highlighted]': '_highlighted',
    '[class.msf-menuItem-submenu-trigger]': '_triggersSubmenu',
    '[attr.tabindex]': '_getTabIndex()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.disabled]': 'disabled || null',
    '[class.msf-disabled]': 'disabled'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MsfMenuItem extends _MatMenuItemMixinBase implements CanDisable, FocusableOption, OnDestroy, AfterViewInit, AfterContentInit {

  /** ARIA role for the menu item. */
  @Input() role: 'menuitem' | 'menuitemradio' | 'menuitemcheckbox' = 'menuitem';

  private _document: Document;


  /** Stream that emits when the menu item is hovered. */
  readonly _hovered: Subject<MsfMenuItem> = new Subject<MsfMenuItem>();

  /** Stream that emits when the menu item is hovered. */
  readonly _click: Subject<MsfMenuItem> = new Subject<MsfMenuItem>();

  /** Whether the menu item is highlighted. */
  _highlighted: boolean = false;

  /** Whether the menu item acts as a trigger for a sub-menu. */
  _triggersSubmenu: boolean = false;

  _showCheckbox: boolean = true;

  _showIcon: boolean = true;

  _showSecondaryText: boolean = true;


  @Input()
  icon: string;

  @Input()
  iconImage: string;

  @Input()
  secondaryIcon: string;

  @Input()
  secondaryIconImage: string;

  @Input()
  secondaryText: string;

  @Input()
  theme: ColorTheme;

  private _for = `msf-menu-item-${_uniqueId++}`;

  get for(): string {
    return this._for;
  }

  @ViewChild("checkboxRef")
  _checkboxRef: ElementRef<HTMLElement>;

  @ViewChild("iconRef")
  _iconRef: ElementRef<HTMLElement>;

  @ViewChild("labelRef")
  labelRef: ElementRef<HTMLElement>;

  @ViewChild("secondaryTextRef")
  _secondaryTextRef: ElementRef<HTMLElement>;

  @ViewChild("secondaryIconRef")
  _secondaryIconRef: ElementRef<HTMLElement>;

  @ContentChild(forwardRef(() => MsfMenuItemCheckbox))
  _checkbox: MsfMenuItemCheckbox;


  _checkboxWidth: number;

  _iconWidth: number;

  _labelWidth: number;

  _secondaryTextWidth: number;
  _secondaryIconWidth: number;


  constructor(private _changeDetector: ChangeDetectorRef, private _elementRef: ElementRef<HTMLElement>) {
    super();
  }

  ngAfterViewInit(): void { }

  computeSize() {
    this._labelWidth = this.labelRef.nativeElement.getBoundingClientRect().width;
    if (this._checkboxRef) {
      this._checkboxWidth = this._checkboxRef.nativeElement.getBoundingClientRect().width;
    }

    if (this._iconRef) {
      this._iconWidth = this._iconRef.nativeElement.getBoundingClientRect().width;
    }

    if (this._secondaryTextRef) {
      this._secondaryTextWidth = this._secondaryTextRef.nativeElement.getBoundingClientRect().width;
    }

    if (this._secondaryIconRef) {
      this._secondaryIconWidth = this._secondaryIconRef.nativeElement.getBoundingClientRect().width;
    }
  }

  ngAfterContentInit(): void {
    if (this.theme && this._checkbox) {
      this._checkbox.checkbox.theme = this.theme;
      this._checkbox.checkbox.id = this._for;
    }
  }


  @HostListener('click', ['$event'])
  _handleClickEvent(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this._click.next(this);
  }

  focus(origin?: "touch" | "mouse" | "keyboard" | "program" | null): void {
  }

  ngOnDestroy(): void {
  }

  /** Used to set the `tabindex`. */
  _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
  }

  _markForCheck() {
    this._changeDetector.detectChanges();
  }

}
