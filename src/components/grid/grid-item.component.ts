import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {AbstractGridItem} from "../abstract-grid/abstract-grid-item";
import {MsfGridController} from "./grid-controller";
import {ElementRect} from "../helpers/position";

@Component({
  templateUrl: "grid-item.component.html",
  selector: "MsfGridItem, [MsfGridItem]"
})
export class MsfGridItemComponent extends AbstractGridItem implements OnInit, OnDestroy, OnChanges{
  constructor(private elementRef: ElementRef<HTMLElement>, public controller: MsfGridController) {
    super(controller);
    this.elementRef.nativeElement.classList.add("msf_GridItem");

  }

  ngOnInit(): void {


    setTimeout(() => {
      this.tempRect = this.rect;
      this.controller.add(this);
    }, 100)

  }

  ngAfterViewInit(): void {
    //console.log(this.rect)
  }

  @ViewChild("msfGridItemSelector", { static: false })
  selectorElement: ElementRef<HTMLInputElement>;


  index: number;
  tempRect: ElementRect;
  /**
   * Gets the index of the elementRef in the DOM list element of the direct parent.
   */
  get domIndex(): number {
    return Array.from(this.elementRef.nativeElement.parentNode.children)
      .indexOf(this.elementRef.nativeElement);
  }

  get rect(): ElementRect {
    return this.element.getBoundingClientRect();
  }

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngOnDestroy(): void {
    console.log("bye");
    this.controller.remove(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }


}
