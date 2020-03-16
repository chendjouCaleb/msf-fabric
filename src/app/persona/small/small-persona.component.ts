import {Component} from "@angular/core";

@Component({
  templateUrl: "small-persona.component.html",
  selector: "app-small-persona",
  styles: [ ".persona-item {margin-top: 20px}"]
})
export class SmallPersonaComponent {
  imgSrc = "/assets/images/persona.jpg";
}
