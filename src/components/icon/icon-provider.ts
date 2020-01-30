import {Dictionary} from "@positon/collections";

/**
 * Used to provide the description of an icon provider
 * like Material Design Icon.
 *
 * To use this provider, the icon system must have
 * a general css class to add to the target HTMLElement.
 *
 * @author Chendjou deGrace
 * @since 28/12/2019
 * @version 1
 */
export class IconProvider {

  /**
   * The general css class to add to the target element
   * to support the system icon.
   * Ex: For Material Icon, the className is mdi,
   * for fontAwesome is fa.
   */
  className: string;

  /**
   * The prefix put put before the className of an iconName.
   * The final className of thee target element is classPrefix{iconName}.
   * Therefore, make sure that the '-' is after the prefix if your systems requires it.
   * For Material Icon, the prefix is mdi-
   * For FontAwesome, the prefix is fa-
   * For Fabric Icon, the prefix msIcon--
   */
  classPrefix: string;

  /**
   * Provide a mapping between the real icon name and the name
   * that your want to use in your code.
   * This mapping is useful when you change the provider,
   * and you don't want to change a icon names.
   *
   */
  mapping: Dictionary<string, string> = new Dictionary<string, string>();
}
