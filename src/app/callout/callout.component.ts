import {Component, TemplateRef, ViewChild} from "@angular/core";
import {MsfCallout} from "../../components/callout/callout";

@Component({
  templateUrl: "callout.component.html",
  selector: "app-callout"
})
export class CalloutComponent {
  constructor(private msfCallout: MsfCallout) {}

  @ViewChild("templateCalloutView", {static: false})
  templateCalloutContent: TemplateRef<any>;

  componentCallout(event: MouseEvent) {
    this.msfCallout.launch(event.target as HTMLElement, ComponentToRender);
  }

  templateCallout($event) {
    this.msfCallout.launch(event.target as HTMLElement, this.templateCalloutContent);
  }
}


@Component({
  template: "<h3>component to rend</h3>"
})
export class ComponentToRender {

}
