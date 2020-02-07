import {Component, ElementRef, Input} from "@angular/core";
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
  @Input()
  rounded: boolean = true;



  @Input()
  /** Decides the size of the control. */
  size: PersonnaSize;


  @Input()
  coinSize: number;


  @Input()
  presence: PersonnaPresence;

  @Input()
  showIcon: boolean;


  @Input()
  imageUrl: string;

  @Input()
  textInitial: string;

  @Input()
  color: MsfColor;


  @Input()
  unknown: boolean;


  @Input()
  showPresence: boolean;


}
