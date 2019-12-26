import {IEnumerable} from "@positon/collections";

export interface ISelection<T> {
  select(item: T): boolean;

  unselect(item: T): boolean;

  clear(): T;

  toggleSelect(item: T);

  selection: IEnumerable<T>
}
