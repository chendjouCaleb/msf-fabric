import {Position} from "../helpers/position";

export type CalloutConfig<T> = {
  origin: HTMLElement,
  content: T,
  data?: T,

  /**
   * The width of the beak.
   */
  beakWidth: number;

  /**
   * If true then the beak is visible. If false it will not be shown.
   */
  isBeakVisible: boolean;

  /**
   * The gap between the Callout and the target
   */
  gapSpace: number;


  position: Position;
  className: string | string[],

}
