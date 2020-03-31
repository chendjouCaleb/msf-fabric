import {List} from "@positon/collections";
import {MsfAbstractGridItem} from "./abstract-grid";

export class GridFilter {
  fn: (item: MsfAbstractGridItem) => boolean;

  /**
   * Items hidden by this filter.
   */
  items = new List<MsfAbstractGridItem>();

  async reset():Promise<any> {

  }

  async update(): Promise<any> {

  }
}
