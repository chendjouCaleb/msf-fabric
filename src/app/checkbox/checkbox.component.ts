import {Component} from "@angular/core";
import {List} from "@positon/collections";
import {MsfCheckboxGroup} from "../../components/checkbox/checkbox-group";
import {ColorTheme} from "../../components/helpers/theme";


@Component({
  templateUrl: "checkbox.component.html",
  selector: "app-callout"
})
export class CheckboxComponent {

  groupValue = new List();

  groupTheme: ColorTheme;

  groupRounded: boolean;
  groupDisabled: boolean;

  value: any = true;
  group2State = true;

  toggleGroup2State(){
    this.group2State = !this.group2State;
  }

  onChange(group: MsfCheckboxGroup) {
    console.log(group.checkboxItems.items.convertAll(t => t.checked).toArray())
  }
}
