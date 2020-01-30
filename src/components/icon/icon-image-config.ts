import {Size} from "../helpers/theme";
import {Dictionary, IDictionary} from "@positon/collections";

export const MSF_ICON_IMAGE_CONFIG = "iconImageConfig";

/**
 * Provides a configurations of all image icon in application.
 * @author Chendjou deGrace
 * @version 1
 * @since 28/12/2019
 */
export class MsfIconImageConfig {
  /**
   * Sets the default size of an icon image.
   */
  defaultSize: Size;

  /**
   * Mapping between source of image used in code and the real image source.
   */
  get mapping(): IDictionary<string, string> {
    return this._mapping;
  }

  private _mapping: IDictionary<string, string> = new Dictionary<string, string>();
}
