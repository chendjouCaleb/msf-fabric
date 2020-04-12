import {Directive} from "@angular/core";
import {MsfCheckbox} from "../checkbox/checkbox";

@Directive({
  selector: 'MsfCheckbox[MsfMenuItemCheckbox]'
})
export class MsfMenuItemCheckbox {
  constructor(public checkbox: MsfCheckbox) { }
}
