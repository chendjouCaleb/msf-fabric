import {ElementRef, Input} from "@angular/core";

export class MsfBaseComponent {

  @Input("disabled")
  Disabled: boolean = false;

  /**
   * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
   * take precedence so this may be omitted.
   */
  @Input("arial-label")
  AriaLabel: string = "";

  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
   */
  @Input('aria-labelledby') ariaLabelledby: string | null = null;



  constructor(protected _element: ElementRef<HTMLElement>) {}


  get host(): HTMLElement {
    return this._element.nativeElement;
  }
}
