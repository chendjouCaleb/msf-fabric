import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output, QueryList, ViewChildren
} from "@angular/core";
import {MsfContextualMenuEvent, MsfDropdownCloseEvent, MsfDropdownOpenEvent} from "./menu-trigger-event";
import {DomUtils} from "../utils/dom-utils";
import {animate} from "@angular/animations";
import {Position, relativePosition} from "../helpers/position";
import {coerceBooleanProperty} from "../utils/boolean-property";

export const NO_CLOSE_DROPDOWN_ATTR = "noCloseDropdown";

@Directive({
  selector: "[MsfDropdown]"
})
export class MsfDropdown implements OnInit, OnDestroy, AfterViewInit {
  private _isOpen: boolean = false;
  private _position: Position = new Position();

  @Input("MsfDropdown")
  target: HTMLElement;

  @Input()
  parent: MsfDropdown;

  @Input()
  xPosition: relativePosition = "properAlign";

  @Input()
  yPosition: relativePosition = "proper";

  @Input()
  openEvent: MsfDropdownOpenEvent = "click";

  @Input()
  closeEvents: MsfDropdownCloseEvent[] = ["click"];

  /**
   * The space(in pixel) between the ContextualMenu and the target
   */
  @Input()
  gapSpace: number = 10;

  /**
   * The width of the beak.
   */
  @Input()
  beakWidth: number = 0;

  /**
   * If true then the beak is visible. If false it will not be shown.
   */
  @Input()
  isBeakVisible: boolean = false;


  /**
   * Whether this menu is a submenu of another menu.
   */
  @Input()
  isSubMenu: boolean = false;

  /**
   * If true the context menu will render as the same width as the target element
   */
  @Input()
  useTargetWidth: boolean = false;


  /**
   * If true the context menu will have a minimum width equal to the width of the target element
   */
  @Input()
  useTargetAsMinWidth: boolean = false;

  @ViewChildren(MsfDropdown)
  children: QueryList<MsfDropdown>;


  /**
   * Callback for when the menu is being closed (removing from the DOM).
   */
  @Output()
  onMenuDismissed: EventEmitter<MsfContextualMenuEvent> = new EventEmitter<MsfContextualMenuEvent>();


  /**
   * Callback for when the menu has been opened.
   */
  @Output()
  onMenuOpened: EventEmitter<MsfContextualMenuEvent> = new EventEmitter<MsfContextualMenuEvent>();

  private _onElementClick = (event: MouseEvent) => {
    console.log(" try close menu")
    if (!this.isCloseEvent("click") || event.target === this.elementRef.nativeElement || this.isClosed ||
      this.isClosableElement(<HTMLElement>event.target)) {
      return;
    }

    this.closeMenu().then(() => console.log("Menu is closed"));
  };

  @HostListener("click", ["$event"])
  onClick(e) {
    if (this.openEvent === "click" && this.isClosed) {
      this.openMenu();
    } else if (this.isCloseEvent("click") && this.isOpen) {
      this.closeMenu();
    }
  }

  @HostListener("mouseenter")
  onMouseEnter() {
    if (this.openEvent !== "mouseenter") {
      return;
    }
    this.openMenu();
  }

  @HostListener("focus", ["$event"])
  onFocus() {

  }

  @HostListener("contextmenu", ["$event"])
  onContextMenu(event: MouseEvent) {
    if (this.openEvent !== "contextmenu") {
      return;
    }
    event.preventDefault();
    this._position.landmarkRect = () => {return{
      left: event.clientX,
      top: event.clientY,
      width: 0,
      height: 0
    }};
    this.openMenu();
    console.log("contextmenu")
  }

  @HostListener("mouseout")
  onMouseOut() {
    if (!this.isCloseEvent("mouseout")) {
      return;
    }

    console.log("mouseout")
  }



  private _onDropdownMouseOut = (event: MouseEvent) => {

  };

  private _onDropdownBlur = (event: FocusEvent) => {

  };


  private _onBlur = (event: FocusEvent) => {

  };


  openMenu(): boolean {
    if (this._isOpen) {
      this.closeMenu().then(() => this.openMenu());
    }
  console.log(document.documentElement.scrollLeft)

    let animate = () => {
      this.target.classList.remove("ms-motion-slideDownIn");
      this.target.removeEventListener("animationend", animate);
    };

    this.target.classList.remove("msf_DropdownClose");
    this.target.classList.add("msf_DropdownOpen", "ms-motion-slideDownIn");
    this.target.style.left = this._position.xFromPosition(this.xPosition) + document.documentElement.scrollLeft + "px";
    this.target.style.top = this._position.yFromPosition(this.yPosition) +document.documentElement.scrollTop + "px";

    this.target.addEventListener("animationend", animate);
    this._isOpen = true;
    console.log("Menu is open");
    return true;
  }

  closeMenu(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.isClosed) {
        resolve(false);
      }

      let hide = () => {

        this.target.classList.remove("ms-motion-slideUpOut");
        this.target.classList.remove("msf_DropdownOpen");
        this.target.classList.add("msf_DropdownClose");
        this.target.removeEventListener("animationend", hide);

        this._isOpen = false;
        resolve(true);
      };
      this.target.classList.add("ms-motion-slideUpOut");
      this.target.addEventListener("animationend", hide);
    });
  }



  constructor(private elementRef: ElementRef<HTMLElement>) {
    //this.elementRef.nativeElement.setAttribute(NO_CLOSE_DROPDOWN_ATTR, "true");
  }

  ngOnInit(): void {

    this._position.landmarkRect = () => {return{
      left: this.elementRef.nativeElement.getBoundingClientRect().left,
      top: this.elementRef.nativeElement.getBoundingClientRect().top,
      width: this.elementRef.nativeElement.offsetWidth,
      height: this.elementRef.nativeElement.offsetHeight
    }};

    this._position.elementRect = () => {return{
      left: this.target.getBoundingClientRect().left,
      top: this.target.getBoundingClientRect().top,
      width: this.target.offsetWidth,
      height: this.target.offsetHeight
    }};

    this._position.containerRect = () => {return {
      left:0,
      top:0,
      width: window.innerWidth,
      height: window.innerHeight
    }};

    this.target.classList.add("msf_DropdownClose");
    this.target.classList.add("msf_Dropdown");

    document.addEventListener("click", this._onElementClick);
  }

  ngOnDestroy(): void {
  }


  isCloseEvent(event: MsfDropdownCloseEvent) {
    return this.closeEvents.indexOf(event) >= 0;
  }


  get isOpen(): boolean {
    return this._isOpen;
  }

  get isClosed(): boolean {
    return !this._isOpen;
  }

  isClosableElement(element: HTMLElement) {
    let p = element, result = false;
    while (p && p !== this.target && !result) {

      if (p.hasAttribute(NO_CLOSE_DROPDOWN_ATTR.toLowerCase())) {
        result = true;
      }
      p = p.parentElement;
    }
    console.log(result);
    return result;
  }

  ngAfterViewInit(): void {
    console.log(this.children)
  }

}
