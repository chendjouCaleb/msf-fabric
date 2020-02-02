/** @docs-private */
import {ColorTheme} from "../theme";
import {Constructor} from "./constructor";
import {ElementRef} from "@angular/core";

export interface CanColor {
  /** Theme color palette for the component. */
  theme: ColorTheme;
}

/** @docs-private */
export type CanColorCtor = Constructor<CanColor>;

/** @docs-private */
export interface HasElementRef {
  _elementRef: ElementRef;
}


/** Mixin to augment a directive with a `color` property. */
export function mixinColor<T extends Constructor<HasElementRef>>(
  base: T, defaultColor?: ColorTheme): CanColorCtor & T {
  return class extends base {
    private _theme: ColorTheme;

    get theme(): ColorTheme { return this._theme; }
    set theme(value: ColorTheme) {
      const colorPalette = value || defaultColor;

      if (colorPalette !== this._theme) {
        if (this._theme) {
          this._elementRef.nativeElement.classList.remove(`msf-theme-${this._theme}`);
        }
        if (colorPalette) {
          this._elementRef.nativeElement.classList.add(`msf-theme-${colorPalette}`);
        }

        this._theme = colorPalette;
      }
    }

    constructor(...args: any[]) {
      super(...args);

      // Set the default color that can be specified from the mixin.
      this.theme = defaultColor;
    }
  };
}
