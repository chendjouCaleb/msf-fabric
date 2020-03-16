import {MsfColor} from "../helpers/theme";
import {PersonaSize} from "./persona-size";

export interface IPersonaProps {
  initial?: string,
  text?: string;
  secondaryText?: string,
  tertiaryText?: string,
  optionalText?: string,
  color?: MsfColor,
  size?: PersonaSize,
  imageUrl?: string,
  imageAlt?: string
}
