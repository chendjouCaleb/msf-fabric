import {Component} from "@angular/core";

@Component({
  templateUrl: "various-persona.component.html",
  selector: "app-various-persona",
  styles: [".persona-item{margin-top: 20px}"]
})
export class VariousPersonaComponent {
  showDetails = true;
  imgSrc = "/assets/images/persona.jpg";
}
