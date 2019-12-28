import {AfterViewInit, Component, ElementRef, OnDestroy} from "@angular/core";
import {MsfPivotLinker} from "../pivot-linker";

@Component({
  templateUrl: "pivot-content.html",
  selector: "MsfPivotContent, [MsfPivotContent]",
  host: {'class': 'msf_PivotContent'}
})
export class MsfPivotContent implements AfterViewInit, OnDestroy{
  constructor(public linker: MsfPivotLinker, public elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.linker.addContent(this);
  }

  ngOnDestroy(): void {
    this.linker.removeContent(this);
  }

  get host(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
