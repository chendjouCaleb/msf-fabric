import {
  AfterContentInit, AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Input,
  QueryList,
  ViewChild
} from "@angular/core";
import {MsfPivotContent} from "./pivot-content";

@Component({
  template: `
    <div class="msf_PivotBodyLayout" #PivotBodyLayout>
      <ng-content></ng-content>
    </div>`,
  selector: "MsfPivotBody, [MsfPivotBody]",
  host: {'class': 'msf_PivotBody'}
})
export class MsfPivotBody implements AfterContentInit, AfterViewInit {
  @Input()
  label: string;

  @ContentChildren(forwardRef(() => MsfPivotContent))
  _contents: QueryList<MsfPivotContent>;

  @ViewChild("PivotBodyLayout")
  public layout: ElementRef<HTMLElement>;

  bodyWidth: number;

  constructor( public elementRef: ElementRef<HTMLElement>) { }

  get host(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngAfterContentInit(): void {
    console.log("content init");

  }


  get contents(): QueryList<MsfPivotContent> {
    return this._contents;
  }

  get layoutHost(): HTMLElement {
    return this.layout.nativeElement;
  }

  get layoutWidth(): number {
    return this.host.offsetWidth * this.contents.length;
  }

  ngAfterViewInit(): void {
    this.bodyWidth = this.host.offsetWidth;
    this.layout.nativeElement.style.width = (this.bodyWidth * this.contents.length) + 'px';
    this.host.style.width = this.bodyWidth + 'px';
  }

}
