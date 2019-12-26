import {AbstractGridController} from "../abstract-grid/abstract-grid-controller";
import {ICollection, IEnumerable, IEnumerator, IList} from "@positon/collections";
import {MsfGridComponent} from "./grid.component";
import {MsfGridItemComponent} from "./grid-item.component";
import { Selection} from "../selection/selection";
import {transform} from "@babel/core";

export class MsfGridController extends AbstractGridController<MsfGridItemComponent>{
  grid: MsfGridComponent;
  items: IList<MsfGridItemComponent>;
  selection: Selection<MsfGridItemComponent>;

  add(item: MsfGridItemComponent): boolean {
    item.index = item.domIndex;
    this.items.insert(item.index, item);
    for(let i = item.index + 1; i < this.items.size(); i++){
      this.items.get(i).index++;
    }
    this.move();
    return true;
  }

  remove(item: MsfGridItemComponent): boolean {

    console.log(this.items.get(item.index + 1).tempRect);
    console.log(this.items.get(item.index + 1).value);
    let index = item.index;
    this.items.remove(item);
    console.log(this.items.get(item.index).rect);
    console.log(this.items.get(item.index).value);
    this.move();
    return false;
  }

  move() {
    for(let item of this){

      let deltaX = item.tempRect.left - item.rect.left;
      let deltaY = item.tempRect.top - item.rect.top;


      console.log(`${item.value.name} : ${item.tempRect.top} - ${item.rect.top}`)
      item.tempRect = item.rect;

      item.element.animate([{
        transform : `translate(${deltaX}px, ${deltaY}px)`
      }, {
        transform: "none"
      }], { duration: 300, fill: 'both'});
      item.element.style.transform = `translate(${deltaX}px, ${deltaY}px)`


    }
  }

  clear(): void {
  }

  clone(): ICollection<MsfGridItemComponent> {
    return undefined;
  }

  enumerator(): IEnumerator<MsfGridItemComponent> {
    return undefined;
  }

  equals(collection: ICollection<MsfGridItemComponent>, compareFn?: (a: MsfGridItemComponent, b: MsfGridItemComponent) => boolean): boolean {
    return false;
  }

  findAll(filter: (item: MsfGridItemComponent) => boolean): IEnumerable<MsfGridItemComponent> {
    return undefined;
  }


  insert(index: number, item: MsfGridItemComponent): void {
  }




  removeAt(index: number): void {
  }

  size(): number {
    return 0;
  }


  sort(compareFn?: (a: MsfGridItemComponent, b: MsfGridItemComponent) => number): any {
  }

}
