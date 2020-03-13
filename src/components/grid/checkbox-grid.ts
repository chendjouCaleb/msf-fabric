import {Directive} from "@angular/core";
import {MsfCheckbox} from "../checkbox/checkbox";

@Directive({
  selector: '[MsfCheckboxGrid]'
})
export class MsfCheckboxGrid {

  constructor(public checkbox: MsfCheckbox) { }
}
