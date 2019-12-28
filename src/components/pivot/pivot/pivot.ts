import {AfterViewInit, Component, EventEmitter, HostListener, Input, Output} from "@angular/core";

import {MsfPivotLinker} from "../pivot-linker";
import {MsfPivotLabel} from "../label/pivot-label";
import {MsfPivotBody} from "../pivot-body/pivot-body";
import {Keyboard} from "../../helpers/keyboard";

@Component({
  templateUrl: "pivot.html",
  selector: "MsfPivot",
  providers: [ MsfPivotLinker ]
})
export class MsfPivot implements AfterViewInit{

  private keyboardKeyEvent = [Keyboard.End, Keyboard.Home, Keyboard.ArrowRight, Keyboard.ArrowLeft];

  @Input()
  public defaultSelectedIndex: number = 0;




  @Output()
  public onchange:EventEmitter<MsfPivot> = new EventEmitter<MsfPivot>();


  /**
   * The index of the active pivot item.
   */
  public selectedItemIndex(): number{
    return this.linker.activeIndex;
  }
  public get selectedItem(): MsfPivotLabel {
    return this.linker.activeLabel;
  }

  constructor(private linker: MsfPivotLinker) {}

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
      this.activateAt(this.linker.labels.size() - 1);
    }

  }

  ngAfterViewInit(): void {
    console.log("Pivot initialised");
    this.linker.activeAt(this.defaultSelectedIndex);
  }

  selectNext(){
    this.linker.activeNext();
  }

  selectPrev() {
    this.linker.activePrev();
  }

  activateAt(index: number) {
    this.linker.activeAt(index);
  }
}
