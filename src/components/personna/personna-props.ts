import {MsfColor} from "../helpers/theme";
import {PersonnaSize} from "./personna-size";

export interface IPersonnaProps {
  initial?: string,
  text?: string;
  secondaryText?: string,
  tertiaryText?: string,
  optionalText?: string,
  color?: MsfColor,
  size?: PersonnaSize,
  imageUrl?: string,
  imageAlt?: string
}
