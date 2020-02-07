import {Component, ElementRef} from "@angular/core";
import {CanColorCtor, mixinColor} from "../helpers/behaviors/theme";
import {PersonnaSize} from "./personna-size";
import {PersonnaPresence} from "./personna-options";
import {MsfColor} from "../helpers/theme";

class MsfPersonnaFigureBase {
  constructor(public _elementRef: ElementRef) {}
}

const _MsfPersonnaFigureMixinBase:
  CanColorCtor & typeof MsfPersonnaFigureBase = mixinColor(MsfPersonnaFigureBase );



@Component({
  templateUrl: "personna-figure.html",
  selector: "MsfPersonnaFigure",
  host: {
    "class" : "msf-personna-figure"
  }
})
export class MsfPersonnaFigure {
  rounded: boolean;



  /** Decides the size of the control. */
  size: PersonnaSize;

  coinSize: number;

  presence: PersonnaPresence;

  showIcon: boolean;

  imageUrl: string;

  textInitial: string;

  color: MsfColor;

  unknown: boolean;

  showPresence: boolean;


}
