import {Component} from "@angular/core";
import {MsfRadioChange } from "../../components/radio/radio";

@Component({
  templateUrl: "radio.component.html",
  selector: "app-callout"
})
export class RadioComponent {
  group1Value: string;
  group2State = true;
  value: string = "Option 1";

  constructor() {
    setTimeout(() => {
      this.value = "Option 1";
    }, 2000);
  }

  group1OnChange(input: MsfRadioChange) {
    this.group1Value = input.value;
  }

  toggleGroup2State(){
    this.group2State = !this.group2State;
  }
}
