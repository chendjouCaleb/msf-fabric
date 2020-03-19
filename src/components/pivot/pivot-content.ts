import {Component, ElementRef} from "@angular/core";

@Component({
  template: "<ng-content></ng-content>",
  selector: "MsfPivotContent, [MsfPivotContent]",
  host: {'class': 'msf_PivotContent'}
})
export class MsfPivotContent {

  /** Whether the pivot is currently active. */
  private _isSelected: boolean = false;


  /** The position of the pivot in the pivots group. */
  public _index: number;

  constructor(public elementRef: ElementRef<HTMLElement>) { }

  get host(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
