import {ColorTheme, Size} from "../helpers/theme";

export interface IconProps {
  name: string;
  size?: Size;
  theme?: ColorTheme;
  provider?: string
}

export interface IconImageProps {
  alt?: string;
  source: string;
  size?: Size;
}
