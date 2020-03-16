import {Component} from "@angular/core";
import {PersonaPresences} from "../../../components/persona/persona-options";
import {PersonaSize} from "../../../components/persona/persona-size";

@Component({
  templateUrl: "presence-persona.component.html",
  selector: "app-presence-persona"
})
export class PresencePersonaComponent {
    imageUrl = "/assets/images/persona.jpg";
    presences = PersonaPresences.filter(p => p != "none");
    sizes: PersonaSize[] = [ "size24", "size48", "size72", "size100"];
}
