import {Component, ContentChildren, ElementRef, forwardRef, QueryList, ViewChild} from "@angular/core";
import {MsfPivotLabel} from "./label/pivot-label";

@Component({
  template: `
      <ng-content></ng-content>
      <span class="msf_PivotActiveBorder" #PivotActiveBorder></span>`,
  selector: "MsfPivotHeader, [MsfPivotHeader]",
  host: {'class': 'msf-pivot-header'}
})
export class MsfPivotHeader {

  constructor( ) { }

  @ContentChildren(forwardRef(() => MsfPivotLabel))
  _labels: QueryList<MsfPivotLabel>;

  @ViewChild("PivotActiveBorder")
  _activeBorder: ElementRef<HTMLElement>;


  get labels(): QueryList<MsfPivotLabel> {
    return this._labels;
  }

  get activeBorder(): HTMLElement {
    return this._activeBorder.nativeElement;
  }
}
