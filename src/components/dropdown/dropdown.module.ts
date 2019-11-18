import {NgModule} from "@angular/core";
import {MsfDropdown} from "./dropdown.directive";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ MsfDropdown ],
    exports: [ MsfDropdown]
})
export class MsfDropdownModule {}