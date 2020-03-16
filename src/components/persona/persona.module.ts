import {NgModule} from "@angular/core";
import {MsfIconModule} from "../icon/public_api";
import {MsfPersona} from "./persona";
import {MsfPersonaText} from "./persona-text";
import {MsfPersonaFigure} from "./persona-figure";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [ CommonModule, MsfIconModule ],
  declarations: [ MsfPersona, MsfPersonaText, MsfPersonaFigure ],
  exports: [ MsfPersona, MsfPersonaText, MsfPersonaFigure ]
})
export class MsfPersonaModule{

}
