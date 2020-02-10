// import {AbstractGridController} from "../abstract-grid/abstract-grid-controller";
// import {ICollection, IEnumerable, IEnumerator, IList} from "@positon/collections";
// import {MsfGridComponent} from "./grid";
// import {MsfGridItem} from "./grid-item";
// import { Selection} from "../selection/selection";
// import {transform} from "@babel/core";
//
// export class MsfGridController {
//   grid: MsfGridComponent;
//   items: IList<MsfGridItem>;
//   selection: Selection<MsfGridItem>;
//
//   add(item: MsfGridItem): boolean {
//     item.index = item.domIndex;
//     this.items.insert(item.index, item);
//     for(let i = item.index + 1; i < this.items.size(); i++){
//       this.items.get(i).index++;
//     }
//     this.move();
//     return true;
//   }
//
//   remove(item: MsfGridItem): boolean {
//
//     console.log(this.items.get(item.index + 1).tempRect);
//     console.log(this.items.get(item.index + 1).value);
//     let index = item.index;
//     this.items.remove(item);
//     console.log(this.items.get(item.index).rect);
//     console.log(this.items.get(item.index).value);
//     this.move();
//     return false;
//   }
//
//   move() {
//     for(let item of this){
//
//       let deltaX = item.tempRect.left - item.rect.left;
//       let deltaY = item.tempRect.top - item.rect.top;
//
//
//       console.log(`${item.value.name} : ${item.tempRect.top} - ${item.rect.top}`)
//       item.tempRect = item.rect;
//
//       item.element.animate([{
//         transform : `translate(${deltaX}px, ${deltaY}px)`
//       }, {
//         transform: "none"
//       }], { duration: 300, fill: 'both'});
//       item.element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
//
//
//     }
//   }
//
//   clear(): void {
//   }
//
//   clone(): ICollection<MsfGridItem> {
//     return undefined;
//   }
//
//   enumerator(): IEnumerator<MsfGridItem> {
//     return undefined;
//   }
//
//   equals(collection: ICollection<MsfGridItem>, compareFn?: (a: MsfGridItem, b: MsfGridItem) => boolean): boolean {
//     return false;
//   }
//
//   findAll(filter: (item: MsfGridItem) => boolean): IEnumerable<MsfGridItem> {
//     return undefined;
//   }
//
//
//   insert(index: number, item: MsfGridItem): void {
//   }
//
//
//
//
//   removeAt(index: number): void {
//   }
//
//   size(): number {
//     return 0;
//   }
//
//
//   sort(compareFn?: (a: MsfGridItem, b: MsfGridItem) => number): any {
//   }
//
// }
