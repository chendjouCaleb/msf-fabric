import {Input} from "@angular/core";
import {IconImageProps, IconProps} from "../icon/icon-props";
import {ColorTheme} from "../helpers/theme";

export type TextFieldStyle = "outline" | "default"

export class TextField {

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

  private _uniqueId: string = "msf_Checkbox-${++nextUniqueId}";

  /** Returns the unique id for the visual hidden input. */
  private _inputId: string;


  /** Whether the checkbox is required. */
  private _required: boolean;

  /**
   * Whether the checkbox is disabled.
   */
  private _disabled: boolean = false;

  /**
   * Whether or not the text field is borderless.
   */
  private _borderless: boolean;

  /**
   * Only used by MaskedTextField: The masking string that defines the mask's behavior.
   * A backslash will escape any character.
   * Special format characters are: '9': [0-9] 'a': [a-zA-Z] '*': [a-zA-Z0-9]
   */
  private _mask: string;

  /**
   * Only used by MaskedTextField: The character to show in place of unfilled characters of the mask.
   */
  private _maskChar: string = '_';


  /**
   * Only used by MaskedTextField: An object defining the format characters and corresponding regexp values.
   * Default format characters: { '9': /[0-9]/, 'a': /[a-zA-Z]/, '*': /[a-zA-Z0-9]/ }
   */
  private _maskFormat: string;


  /**
   * Prefix displayed before the text field contents. This is not included in the value.
   * Ensure a descriptive label is present to assist screen readers, as the value does not include the prefix.
   */
  private prefix: string;

  /**
   * Suffix displayed after the text field contents. This is not included in the value.
   * Ensure a descriptive label is present to assist screen readers, as the value does not include the suffix.
   */
  private suffix: string;

  /**
   * If true, the text field is readonly.
   */
  private readOnly: boolean;

  /**
   * The color theme of the component.
   */
  private _theme: ColorTheme;


  /**
   * Current value of the text field. Only provide this if the text field is a
   * controlled component where you are maintaining its current state;
   * otherwise, use the defaultValue property.
   */
  private _value: string;





  /**
   * Props for an optional icon, displayed in the far right end of the text field.
   */
  prefixIconProps: IconProps;

  /**
   * Props for an optional icon image, displayed in the far right end of the text field.
   */
  prefixIconImageProps: IconImageProps;

  /**
   * Props for an optional icon, displayed in the far right end of the text field.
   */
  suffixIconProps: IconProps;

  /**
   * Props for an optional icon image, displayed in the far right end of the text field.
   */
  suffixIconImageProps: IconImageProps;


  /**
   * Whether the input field should have autocomplete enabled.
   * This tells the browser to display options based on earlier typed values.
   * Common values are 'on' and 'off'.
   */
  autoComplete:string;

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
   * The classname of the native input element.
   */
  inputClassname: string;


  /**
   * The classname of the prefix text or prefix icon.
   */
  prefixClassname: string;


  /**
   * The classname of the suffix text or suffix icon.
   */
  suffixClassname: string;


  placeholder: string;

  autofocus: boolean;

  required: boolean;

  tabindex: number = 0;

  inputType: string;

}
