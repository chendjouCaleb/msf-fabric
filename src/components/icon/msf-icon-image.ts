import {Component, ElementRef, Inject, Input, Optional} from "@angular/core";

import {IDictionary} from "@positon/collections";
import {Size} from "../helpers/theme";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";
import {IconRegistry} from "./icon-registry";

export const MSF_ICON_IMAGE_MAPPING = "iconImageMapping";

@Component({
  selector: "MsfIconImage, [MsfIconImage]",
  templateUrl: "msf-icon-image.html"
})
export class MsfIconImage {
  @Input()
  alt: string;

  src: string;


  private _source: string;


  get source(): string { return this._source; }

  @Input()
  set source(value: string) {
    this._source = value;
    this.src = this.getImageSource(value);
  }

  private _size: Size;


  get size(): Size {
    return this._size;
  }

  /**
   * The font-size of icon. You can use style property instead.
   */
  @Input()
  set size(value: Size) {
    this.elementRef.nativeElement.classList.remove("msf_Size-" + value);
    this.elementRef.nativeElement.classList.add("msf_Size-" + value);
    this._size = value;
  }
  constructor(@Inject(MSF_ICON_IMAGE_MAPPING) @Optional() private mapping: IDictionary<string, string>,
     private elementRef: ElementRef<HTMLElement>) {
    this.size = "md";

  }


  getImageSource(src: string) {
    AssertHelpers.isNotNull(src);
    if(!this.mapping || !this.mapping.containsKey(src)){
      return src;
    }

    return this.mapping.get(src);
  }
}
