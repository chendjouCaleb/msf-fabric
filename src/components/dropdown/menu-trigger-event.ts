import {MsfContextualMenuComponent} from "../contextual-menu/contextual-menu.component";
import {MsfDropdown} from "./dropdown.directive";

export type MsfDropdownOpenEvent = "mouseenter" | "click" | "contextmenu";
export type MsfDropdownCloseEvent = "mouseout" | "click";

export interface MsfContextualMenuEvent {
  source: MouseEvent | KeyboardEvent;
  trigger: MsfDropdown;
  menu: MsfContextualMenuComponent;
}


