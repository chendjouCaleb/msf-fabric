

export type ColorTheme = "standard" | "primary" | "warning"| "success" | "error" | null;

export type Size = "sm" | "lg" | "md" | "xl" | "xxl" | null;

export function applyThemeClass(element: HTMLElement, actualTheme: ColorTheme, newTheme: ColorTheme) {
  element.classList.remove("msf-theme-" + actualTheme);
  element.classList.add("msf-theme-" + newTheme);
}

