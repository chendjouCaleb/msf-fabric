import {Component} from "@angular/core";

@Component({
  templateUrl: "small-personna.component.html",
  selector: "app-small-personna",
  styles: [ ".personna-item {margin-top: 20px}"]
})
export class SmallPersonnaComponent {
  imgSrc = "/assets/images/personna.jpg";
}
