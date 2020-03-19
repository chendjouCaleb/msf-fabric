import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {IconImageProps, IconProps} from "../../icon/icon-props";
import {MsfPivot} from "../pivot/pivot";

@Component({
  templateUrl: "pivot-label.html",
  selector: "MsfPivotLabel, [MsfPivotLabel]",
  host: {'class': 'msf_PivotItemLabel', '[attr.tabindex]': '0'}
})
export class MsfPivotLabel  {
  public _index;
  @Input()
  icon: IconProps;

  @Input()
  iconImage: IconImageProps;

  @Input()
  secondaryIcon: IconProps;

  @Input()
  secondaryIconImage: IconImageProps;

  @Output()
  _click:EventEmitter<void> = new EventEmitter();


  constructor( private elementRef: ElementRef<HTMLElement>) {}

  @HostListener("click", ["$event"])
  active( ) {
    this._click.emit();
  }

  get host(): HTMLElement {
    return this.elementRef.nativeElement;
  }

}
