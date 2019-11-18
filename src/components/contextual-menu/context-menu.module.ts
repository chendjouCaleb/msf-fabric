import {NgModule} from "@angular/core";
import {MsfContextualMenuComponent} from "./contextual-menu.component";
import {MsfContextualMenuItemComponent} from "./contextual-menu-item.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MsfContextualMenuComponent, MsfContextualMenuItemComponent],
  exports: [ MsfContextualMenuComponent, MsfContextualMenuItemComponent],
})
export class MsfContextualMenuModule {

}
