import {MsfContextualMenuComponent} from "../contextual-menu/contextual-menu.component";
import {MsfDropdown} from "./dropdown.directive";

export type MsfDropdownOpenEvent = "mouseenter" | "click" | "contextmenu" | "focus";
export type MsfDropdownCloseEvent = "mouseout" | "click" | "blur";

export interface MsfContextualMenuEvent {
  source: MouseEvent | KeyboardEvent;
  trigger: MsfDropdown;
  menu: MsfContextualMenuComponent;
}


