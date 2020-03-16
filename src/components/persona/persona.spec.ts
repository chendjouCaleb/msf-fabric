import {Component} from "@angular/core";
import {PersonaSize} from "./persona-size";

describe('Personna', () => {

});

@Component({
  template: `
    <MsfPersona [size]="size">
        <MsfPersonaFigure></MsfPersonaFigure>
    </MsfPersona>
  `
})
class TestComponent {
  size: PersonaSize = "size56"
}
