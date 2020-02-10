import {Component} from "@angular/core";
import {PersonnaPresences} from "../../../components/personna/personna-options";
import {PersonnaSize} from "../../../components/personna/personna-size";

@Component({
  templateUrl: "presence-personna.component.html",
  selector: "app-presence-personna"
})
export class PresencePersonnaComponent {
    imageUrl = "/assets/images/personna.jpg";
    presences = PersonnaPresences.filter(p => p != "none");
    sizes: PersonnaSize[] = [ "size24", "size48", "size72", "size100"];
}
