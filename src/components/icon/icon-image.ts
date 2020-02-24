import {Component, ElementRef, Inject, Input, Optional} from "@angular/core";

import {Dictionary, IDictionary} from "@positon/collections";
import {Size} from "../helpers/theme";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";
import {IconImageProps} from "./icon-props";
import {MSF_ICON_IMAGE_CONFIG, MsfIconImageConfig} from "./icon-image-config";


export const MSF_ICON_IMAGE_CLASSNAME = "msf-icon-image";

@Component({
  selector: "MsfIconImage, [MsfIconImage]",
  template: "<img [src]='src' [alt]='alt'>",
  host: {
    class: MSF_ICON_IMAGE_CLASSNAME
  }
})
export class MsfIconImage {
  private _sourceMapping: IDictionary<string, string> = new Dictionary<string, string>();

  @Input()
  alt: string;

  src: string;


  private _source: string;


  get source(): string {
    return this._source;
  }

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
   * The size of icon. You can use style property instead.
   */
  @Input()
  set size(value: Size) {
    this.elementRef.nativeElement.classList.remove("msf_Size-" + value);
    this.elementRef.nativeElement.classList.add("msf_Size-" + value);
    this._size = value;
  }



  @Input()
  set props(value: IconImageProps) {
    if(value.size){
      this.size = value.size;
    }

    if(value.source){
      this.source = value.source;
    }

    if(value.alt){
      this.alt = value.alt;
    }

  }



  constructor(@Inject(MSF_ICON_IMAGE_CONFIG) @Optional() public config: MsfIconImageConfig,
              private elementRef: ElementRef<HTMLElement>) {

    if (config != null) {
      this._sourceMapping = config.mapping;
      if (config.defaultSize) {
        this.size = config.defaultSize;
      }
    }
  }


  getImageSource(src: string) {
    AssertHelpers.isNotNull(src);

    if (!this._sourceMapping.containsKey(src)) {
      return src;
    }

    return this._sourceMapping.get(src);
  }

  get host(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  get imageHost(): HTMLImageElement {
    return this.host.querySelector("img");
  }
}
