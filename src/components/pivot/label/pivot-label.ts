import {AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit} from "@angular/core";
import {MsfPivotLinker} from "../pivot-linker";
import {IconImageProps, IconProps} from "../../icon/icon-props";

@Component({
  templateUrl: "pivot-label.html",
  selector: "MsfPivotLabel, [MsfPivotLabel]",
  host: {'class': 'msf_PivotItemLabel', '[attr.tabindex]': '0'}
})
export class MsfPivotLabel implements OnInit, OnDestroy, AfterViewInit{
  @Input()
  icon: IconProps;

  @Input()
  iconImage: IconImageProps;

  @Input()
  secondaryIcon: IconProps;

  @Input()
  secondaryIconImage: IconImageProps;


  constructor(public linker: MsfPivotLinker, private elementRef: ElementRef<HTMLElement>) {}

  @HostListener("click", ["$event"])
  active(event: MouseEvent) {
    this.linker.activate(this);
  }

  get host(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.linker.addLabel(this);
  }

  get index(): number {
    return this.linker.labels.indexOf(this);
  }

  get isActive(): boolean {
    return this.linker.activeLabel == this;
  }

  ngOnDestroy(): void {
    this.linker.remove(this);
  }

  ngAfterViewInit(): void {
    console.log("Pivot label initialised")
  }
}
