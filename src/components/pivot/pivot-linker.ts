import {Injectable} from "@angular/core";
import {ArgumentOutOfRangeException, List} from "@positon/collections";
import {MsfPivotLabel} from "./label/pivot-label";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";
import {MsfPivotContent} from "./content/pivot-content";
import {MsfPivotBody} from "./pivot-body/pivot-body";

@Injectable()
export class MsfPivotLinker {
  activeBorder: HTMLElement;
  activeLabel: MsfPivotLabel;

  labels = new List<MsfPivotLabel>();
  contents = new List<MsfPivotContent>();

  body: MsfPivotBody;

  addLabel(label: MsfPivotLabel) {
    AssertHelpers.isNotNull(label);
    this.labels.add(label);
  }

  remove(label: MsfPivotLabel) {
    AssertHelpers.isNotNull(label);
    this.labels.remove(label);
  }

  addContent(content: MsfPivotContent) {
    AssertHelpers.isNotNull(content);
    this.contents.add(content);
  }

  removeContent(content: MsfPivotContent) {
    AssertHelpers.isNotNull(content);
    this.contents.remove(content);
  }

  activate(label: MsfPivotLabel) {
    this.labels.forEach(l  => l.host.removeAttribute("active"));

    this.activeLabel = label;
    label.host.setAttribute("active", "true");

    let left = label.host.offsetLeft;
    let width = label.host.offsetWidth;

    this.activeBorder.style.left = left + 'px';
    this.activeBorder.style.width = width + 'px';

    this.moveActiveContent(this.activeContent);
  }

  moveActiveContent(content: MsfPivotContent) {
    let index = this.contents.indexOf(content);

    let width = this.body.bodyWidth;
    let left = width * index;

    this.body.layout.nativeElement.style.transform = `translateX(${-left}px)`
  }

  get activeContent(): MsfPivotContent {
    if(!this.activeLabel){
      return null;
    }

    return this.contents.get(this.labels.indexOf(this.activeLabel));
  }

  activeAt(index: number){
    if(index < 0 || index >= this.labels.size()){
      throw new ArgumentOutOfRangeException("The index is outside the limit of the pivot");
    }


    let label = this.labels.get(index);
    console.log(index)
    this.activate(label);
  }

  activeNext(){

    if(this.activeIndex == this.labels.size() -1){
      this.activeAt(0);
    }else{
      this.activeAt(this.activeIndex + 1);
    }
  }

  activePrev(){
    if(this.activeIndex == 0){
      this.activeAt(this.labels.size() - 1);
    }else{
      this.activeAt(this.activeIndex - 1);
    }
  }

  get activeIndex(): number {
    if(!this.activeLabel){
      return -1;
    }
    return this.labels.indexOf(this.activeLabel);
  }
}
