import {Component} from "@angular/core";


@Component({
  templateUrl: "checkbox.component.html",
  selector: "app-callout"
})
export class CheckboxComponent {

  value: any = true;
  group2State = true;

  toggleGroup2State(){
    this.group2State = !this.group2State;
  }
}
