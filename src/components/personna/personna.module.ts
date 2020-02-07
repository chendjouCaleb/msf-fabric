import {NgModule} from "@angular/core";
import {MsfIconModule} from "../icon/public_api";
import {MsfPersonna} from "./personna";
import {MsfPersonnaText} from "./personna-text";
import {MsfPersonnaFigure} from "./personna-figure";

@NgModule({
  imports: [ MsfIconModule ],
  declarations: [ MsfPersonna, MsfPersonnaText, MsfPersonnaFigure ],
  exports: [ MsfPersonna, MsfPersonnaText, MsfPersonnaFigure ]
})
export class MsfPersonnaModule{

}
