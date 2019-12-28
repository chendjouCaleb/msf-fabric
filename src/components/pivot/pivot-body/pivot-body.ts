import {Component, ElementRef, EventEmitter, Input, ViewChild} from "@angular/core";
import {RouterLink} from "@angular/router";
import {ColorTheme} from "../../helpers/theme";
import {MsfPivotLabel} from "../label/pivot-label";
import {MsfPivotLinker} from "../pivot-linker";

@Component({
  templateUrl: "pivot-body.html",
  selector: "MsfPivotBody, [MsfPivotBody]",
  host: {'class': 'msf_PivotBody'}
})
export class MsfPivotBody {

  /**
   * Aria label for the pivot.
   */
  @Input()
  ariaLabel: string;


  /**
   * Reference to the element that the pivot is labelled by.
   * Will be cleared if aria-label is set at the same time.
   */
  @Input()
  ariaLabelledBy: string;


  /**
   * Whether the component is disabled.
   */
  @Input()
  disabled: boolean;



  @Input()
  theme: ColorTheme;

  @Input()
  routerLink: RouterLink;

  @Input()
  label: string;

  /**
   * Event to fire when the pivot is activate by the user.
   */
  onselect: EventEmitter<MsfPivotLabel> = new EventEmitter<MsfPivotLabel>();

  /**
   * Whether the pivot is currently active.
   */
  private _isSelected: boolean = false;


  /**
   * The position of the pivot in the pivots group.
   */
  private _index: number;

  select() {

  }

  @ViewChild("PivotBodyLayout", {static: false})
  public layout: ElementRef<HTMLElement>;

  bodyWidth: number;
  get layoutWidth(): number {
    return this.host.offsetWidth * this.linker.contents.size();
  }
  constructor(public linker: MsfPivotLinker, public elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {

    this.bodyWidth = this.host.offsetWidth;
    this.layout.nativeElement.style.width = (this.bodyWidth* this.linker.contents.size()) + 'px';
    this.host.style.width = this.bodyWidth  + 'px';
    this.linker.body = this;
  }

  ngOnDestroy(): void {
    this.linker.removeContent(this);
  }

  get host(): HTMLElement {
    return this.elementRef.nativeElement;
  }

}
