import {AfterViewInit, Component, ElementRef, ViewChild} from "@angular/core";
import {MsfPivotLinker} from "../pivot-linker";

@Component({
  templateUrl: "pivot-header.html",
  selector: "MsfPivotHeader, [MsfPivotHeader]",
  host: {'class': 'msf_PivotHeader'}
})
export class MsfPivotHeader implements AfterViewInit{

  constructor(private linker: MsfPivotLinker) {}

  @ViewChild("PivotActiveBorder", {static: false})
  activeBorder: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.linker.activeBorder = this.activeBorder.nativeElement;
  }

}
