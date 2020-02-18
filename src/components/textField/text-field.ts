import {AfterContentInit, Component, ContentChild, Input} from "@angular/core";
import {IconImageProps, IconProps} from "../icon/icon-props";
import {ColorTheme} from "../helpers/theme";
import {MsfInput} from "./input/msf-input";
import {MsfInputLabel} from "./input-label";

export type TextFieldStyle = "outline" | "default";

let nextUniqueId = 0;

@Component({
  templateUrl: "text-field.html",
  selector: "MsfTexField",
  host: {
    "class": "msf-text-field"
  }
})
export class MsfTextField implements AfterContentInit{

  /**
   * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
   * take precedence so this may be omitted.
   */
  @Input( )
  ariaLabel: string = '';

  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
   */
  @Input( )
  ariaLabelledby: string | null = null;

  private _uniqueId: string = `msf-text-field-${++nextUniqueId}`;



  /** Whether the checkbox is required. */
  private _required: boolean;

  /**
   * Whether the checkbox is disabled.
   */
  private _disabled: boolean = false;



  /**
   * Prefix displayed before the text field contents. This is not included in the value.
   * Ensure a descriptive label is present to assist screen readers, as the value does not include the prefix.
   */
  @Input()
  prefix: string;

  /**
   * Suffix displayed after the text field contents. This is not included in the value.
   * Ensure a descriptive label is present to assist screen readers, as the value does not include the suffix.
   */
  @Input()
  suffix: string;





  /**
   * Props for an optional icon, displayed in the far right end of the text field.
   */
  @Input()
  prefixIconProps: IconProps;

  /**
   * Props for an optional icon image, displayed in the far right end of the text field.
   */
  prefixIconImageProps: IconImageProps;

  /**
   * Props for an optional icon, displayed in the far right end of the text field.
   */
  @Input()
  suffixIconProps: IconProps;

  /**
   * Props for an optional icon image, displayed in the far right end of the text field.
   */
  suffixIconImageProps: IconImageProps;


  /**
   * The function which checks if char is allowed.
   * This function is called when user press key not during a validation.
   */
  allowedCharMatch: (x: string) => boolean = null;

  /**
   * The max size of the field.
   */
  maxSize: number | null = null;



  /**
   * The classname of the prefix text or prefix icon.
   */
  prefixClassname: string;


  /**
   * The classname of the suffix text or suffix icon.
   */
  suffixClassname: string;


  required: boolean;

  tabindex: number = 0;


  @ContentChild(MsfInput, {static: false})
  private _nativeInput: MsfInput;


  ngAfterContentInit(): void {
    if(!this._nativeInput){
      throw new Error(`A text field must contains a html input with MsfInput directive.`)
    }

    this._nativeInput.id = this._uniqueId;

  }

}
