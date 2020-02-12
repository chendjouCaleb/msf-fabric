import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  forwardRef, HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {ElementRect} from "../helpers/position";
import {AbstractGridItem} from "../abstract-grid/abstract-grid-item";
import {MsfGrid} from "./grid";
import {MsfCheckbox} from "../checkbox/checkbox";

let uniqueId = 0;

@Component({
  templateUrl: "grid-item.html",
  selector: "MsfGridItem, [MsfGridItem]",
  host: {
    "class": "msf-gridItem",
    "[class.msf-selected]": "selected"
  }
})
export class MsfGridItem implements OnInit, OnDestroy, OnChanges, AfterContentInit {
  private _uniqueId = `msf-gridItem-${uniqueId++}`;

  /** Whether the item is selected */
  private _selected: boolean;

  _x: number;
  _y: number;
  _sortOrder: number;

  _lastRect: ElementRect;

  _grid: MsfGrid;

  @Input()
  value: any;

  @Input()
  selectable: boolean = true;

  @ContentChild(forwardRef(() => MsfCheckbox), {static: false})
  _checkbox: MsfCheckbox;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    //console.log(this.rect)
  }

  @ViewChild("msfGridItemSelector", {static: false})
  selectorElement: ElementRef<HTMLInputElement>;


  _index: number;
  tempRect: ElementRect;

  @Input()
  get selected(): boolean {
    return this._selected;
  }

  set selected(value: boolean) {
    if (this.selectable) {
      this._selected = value;
    }

  }

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

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngAfterContentInit(): void {
    this._lastRect = this.rect;
  }

  @HostListener("click", ["$event"])
  _clickEvent(event: MouseEvent) {
    if(this._grid){
      this._grid._clickEvent(this, event);
    }
  }

}
