export type ColorTheme = "standard" | "primary" | "warning" | "success" | "error" | null;

export type Size = "sm" | "lg" | "md" | "xl" | "xxl" | null;

export function applyThemeClass(element: HTMLElement, actualTheme: ColorTheme, newTheme: ColorTheme) {
  element.classList.remove("msf-theme-" + actualTheme);
  element.classList.add("msf-theme-" + newTheme);
}


export type MsfColor =
  "blue" |
  "black" |
  "blue" |
  "burgundy" |
  "coolGray" |
  "cyan" |
  "darkBlue" |
  "darkGreen" |
  "darkRed" |
  "gold" |
  "gray" |
  "gray40" |
  "green" |
  "lightBlue" |
  "lightGreen" |
  "lightPink" |
  "lightRed" |
  "magenta" |
  "orange" |
  "pink" |
  "purple" |
  "rust" |
  "teal" |
  "transparent" |
  "violet" |
  "warmGray";
