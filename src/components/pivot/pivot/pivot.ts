import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  QueryList,
  TemplateRef
} from "@angular/core";
import {MsfPivotLabel} from "../label/pivot-label";
import {MsfPivotBody} from "../pivot-body";
import {Keyboard} from "../../helpers/keyboard";
import {MsfPivotHeader} from "../pivot-header";
import {MsfPivotContent} from "../pivot-content";
import {ArgumentOutOfRangeException} from "@positon/collections";

@Component({
  templateUrl: "pivot.html",
  selector: "MsfPivot"
})
export class MsfPivot implements AfterViewInit, AfterContentInit{

  private keyboardKeyEvent = [Keyboard.End, Keyboard.Home, Keyboard.ArrowRight, Keyboard.ArrowLeft];

  private _activeLabel: MsfPivotLabel;
  private _activeContent: MsfPivotContent;

  @Input()
  public defaultSelectedIndex: number = 0;




  @Output()
  public onchange:EventEmitter<MsfPivot> = new EventEmitter<MsfPivot>();

  @ContentChildren(forwardRef(() => TemplateRef))
  templates: QueryList<TemplateRef<any>>;

  @ContentChild(forwardRef(() => MsfPivotHeader))
  private _header: MsfPivotHeader;

  @ContentChild(forwardRef(() => MsfPivotBody))
  private _body: MsfPivotBody;


  /**
   * The index of the active pivot item.
   */
  public selectedItemIndex(): number{
    return this.activeIndex;
  }
  public get selectedItem(): MsfPivotLabel {
    return this._activeLabel;
  }

  constructor( ) {}

  @HostListener("keydown", ["$event"])
  public onkeydown(event: KeyboardEvent){

    if(this.keyboardKeyEvent.indexOf(event.key) < 0){
      return;
    }
    event.preventDefault();

    if(event.key == Keyboard.ArrowLeft) {
      this.selectPrev();
    }
    else if(event.key === Keyboard.ArrowRight){
      this.selectNext();
    }
    else if(event.key === Keyboard.Home){
      this.activateAt(0);
    }else if(event.key === Keyboard.End){
      this.activateAt(this.labels.length - 1);
    }

  }


  ngAfterViewInit(): void {
    this.activateAt(this.defaultSelectedIndex);
    this.labels.forEach(label => {
      label._click.subscribe(() => this.activate(label));
    });

    this._header._labels.changes.subscribe(( ) => {
      this.labels.forEach(label => {
        label._click.subscribe(() => this.activate(label));
      })
    });
  }

  ngAfterContentInit(): void { }

  selectNext(){
    if(this.activeIndex == this._header.labels.length -1){
      this.activateAt(0);
    }else{
      this.activateAt(this.activeIndex + 1);
    }
  }

  selectPrev() {
    if(this.activeIndex == 0){
      this.activateAt(this._header.labels.length - 1);
    }else{
      this.activateAt(this.activeIndex - 1);
    }
  }

  activate(label: MsfPivotLabel) {
    let index = this.labels.indexOf(label);
    this.activateAt(index);
  }

  activateAt(index: number) {
    if(index < 0 || index >= this.labels.length){
      throw new ArgumentOutOfRangeException("The index is outside the limit of the pivot");
    }


    let label = this.labels[index];

    this._header.labels.forEach(l  => l.host.removeAttribute("active"));

    this._activeLabel = label;
    label.host.setAttribute("active", "true");

    let left = label.host.offsetLeft;
    let width = label.host.offsetWidth;

    this._header.activeBorder.style.left = left + 'px';
    this._header.activeBorder.style.width = width + 'px';

    this._activeContent = this.contents[index];
    this.moveActiveContent(this._activeContent);
  }

  moveActiveContent(content: MsfPivotContent) {
    let index = this._body.contents.toArray().indexOf(content);
    console.log("Activate index: " + index);

    let width = this._body.bodyWidth;
    let left = width * index;

    this._body.layoutHost.style.transform = `translateX(${-left}px)`
  }


  get activeIndex(): number {
    if(!this._activeLabel){
      return -1;
    }
    return this._header.labels.toArray().indexOf(this._activeLabel);
  }

  get labels(): MsfPivotLabel[] {
    return this._header._labels.toArray();
  }

  get contents(): MsfPivotContent[] {
    return this._body._contents.toArray();
  }
}
