import {Component, ElementRef} from "@angular/core";
import {AbstractGrid} from "../abstract-grid/abstract-grid";
import {MsfGridController} from "./grid-controller";
import {MsfGridItemComponent} from "./grid-item.component";

@Component({
  selector: "MsfGrid, [MsfGrid]",
  templateUrl: "grid.component.html",
  providers: [ MsfGridController ]
})
export class MsfGridComponent extends AbstractGrid<MsfGridItemComponent>{
  constructor(private elementRef: ElementRef<HTMLElement>, public controller: MsfGridController) {
    super(controller);
    this.elementRef.nativeElement.classList.add("msf_Grid");
  }
}
