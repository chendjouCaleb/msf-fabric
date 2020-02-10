import {Component} from "@angular/core";

@Component({
  templateUrl: "various-personna.component.html",
  selector: "app-various-personna",
  styles: [".personna-item{margin-top: 20px}"]
})
export class VariousPersonnaComponent {
  showDetails = true;
  imgSrc = "/assets/images/personna.jpg";
}
