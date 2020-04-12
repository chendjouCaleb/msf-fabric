import {NgModule} from "@angular/core";
import {MsfMenu} from "./menu";
import {MsfMenuItem} from "./menu-item";
import {OverlayModule} from "@angular/cdk/overlay";
import {CommonModule} from "@angular/common";
import {MsfIconModule} from "../icon/public_api";
import {MsfCheckboxModule} from "../checkbox/checkbox.module";
import {MsfMenuItemGroup} from "./menu-item-group";
import {MsfMenuItemCheckbox} from "./menu-item-checkbox";

@NgModule({
  imports: [ OverlayModule, CommonModule, MsfIconModule, MsfCheckboxModule],
  declarations: [ MsfMenu, MsfMenuItem, MsfMenuItemGroup, MsfMenuItemCheckbox ],
  exports: [ MsfMenu, MsfMenuItem, MsfMenuItemGroup, MsfMenuItemCheckbox ]
})
export class MsfMenuModule {

}
