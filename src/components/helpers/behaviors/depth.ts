/** @docs-private */

import {Constructor} from "./constructor";
import {ElementRef } from "@angular/core";
import {DepthSize} from "../depth";
import {HasElementRef} from "./element-ref";




export interface CanDepth {
  /** Theme color palette for the component. */

  depth: DepthSize;
}

/** @docs-private */
export type CanDepthCtor = Constructor<CanDepth>;




/** Mixin to augment a directive with a `depth` property. */
export function mixinDepth<T extends Constructor<HasElementRef>>(
  base: T, defaultDepth?: DepthSize): CanDepthCtor & T {
  return class extends base {
    private _depth: DepthSize;


    get depth(): DepthSize { return this._depth; }
    set depth(value: DepthSize) {
      const newDepth = value || defaultDepth;

      if (newDepth !== this._depth) {
        if (this._depth) {
          this._elementRef.nativeElement.classList.remove(`ms-depth-${this._depth}`);
        }
        if (newDepth) {
          this._elementRef.nativeElement.classList.add(`ms-depth-${newDepth}`);
        }

        this._depth = newDepth;
      }
    }

    constructor(...args: any[]) {
      super(...args);

      // Set the default color that can be specified from the mixin.
      this.depth = defaultDepth;
    }
  };
}
