import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {IconImageProps, IconProps} from "../../icon/icon-props";


@Component({
  templateUrl: "pivot-label.html",
  selector: "MsfPivotLabel, [MsfPivotLabel]",
  host: {'class': 'msf_PivotItemLabel', '[attr.tabindex]': '0'}
})
export class MsfPivotLabel  {
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

  @HostListener("click" )
  active( ) {
    this._click.emit();
  }

  get host(): HTMLElement {
    return this.elementRef.nativeElement;
  }

}
