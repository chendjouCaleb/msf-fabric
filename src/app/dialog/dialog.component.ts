import {Component, TemplateRef, ViewChild} from "@angular/core";
import {MsfDialog} from "../../components/dialog/dialog";

@Component({
  templateUrl: "dialog.component.html",
  selector: "app-dialog"
})
export class DialogComponent {
  constructor(private msfDialog: MsfDialog) {}

  @ViewChild("templateDialogView")
  templateDialogContent: TemplateRef<any>;

  componentDialog() {
    this.msfDialog.open(ComponentToRender);
  }

  templateDialog() {
    this.msfDialog.open(this.templateDialogContent, {hasBackdrop: true});
  }
}


@Component({
  template: "<h3>component to rend</h3>"
})
export class ComponentToRender {

}
