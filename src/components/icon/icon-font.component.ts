import {ChangeDetectionStrategy, Component, ElementRef, Input } from "@angular/core";
import {ColorTheme, Size} from "../helpers/theme";
import {IconRegistry} from "./icon-registry";
import {IconProvider} from "./icon-provider";
import {NullArgumentException} from "@positon/collections";
import {IconProps} from "./icon-props";


export const MSF_ICON_FONT_CLASSNAME = "msf-IconFont";

@Component({
  selector: "MsfIcon, [MsfIcon]",
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': MSF_ICON_FONT_CLASSNAME}
})
export class MsfIconFont {
  private _provider: IconProvider;

  /**
   * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
   * take precedence so this may be omitted.
   */
  @Input()
  ariaLabel: string = '';

  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
   */
  @Input()
  ariaLabelledby: string | null = null;


  /**
   * The color theme of the icon.
   */
  @Input()
  get theme(): ColorTheme {
    return this._theme;
  }

  set theme(value: ColorTheme) {
    this.host.classList.remove("msf_Theme-" + this._theme);
    this._theme = value;
    this.host.classList.add("msf_Theme-" + value);
  }

  private _theme: ColorTheme;


  /**
   * The name of the icon to display.
   */
  @Input()
  get iconName(): string {
    return this._iconName;
  }

  set iconName(value: string) {
    if (!value) {
      throw new Error("Cannot use empty or null string as icon name");
    }
    this.setIconName(value);
  }

  private setIconName(value: string) {
    if (!value) {
      return;
    }

    this.host.classList.remove(this._provider.classPrefix + this.getRealIconName(value));
    this._iconName = value;
    this.host.classList.add(this._provider.classPrefix + this.getRealIconName(this.iconName));
  }

  private _iconName: string;

  /**
   * The font-size of icon. You can use style property instead.
   */
  @Input()
  get size(): Size { return this._size; }

  set size(value: Size) {
    this.host.classList.remove("msf_Size-" + value);
    this.host.classList.add("msf_Size-" + value);
    this._size = value;
  }
  private _size: Size;

  @Input()
  get providerName(): string {
    return this._providerName;
  }

  set providerName(value: string) {
    if (!value) {
      throw new NullArgumentException("Cannot get a iconProvider with null or empty string name");
    }

    const provider = this.registry.get(value);
    if (provider == null) {
      throw new Error(`There is no iconProvider with name ${value}`)
    }

    this.host.classList.remove(this._provider.className);
    if (this.iconName) {
      this.host.classList.remove(this._provider.classPrefix + this.getRealIconName(this.iconName));
    }

    this._provider = provider;
    this._providerName = value;
    this.host.classList.add(this._provider.className);

    if (this.iconName) {
      this.host.classList.add(this._provider.classPrefix + this.getRealIconName(this.iconName));
    }
  }
  private _providerName: string;


  constructor(private registry: IconRegistry, private elementRef: ElementRef<HTMLElement>) {
    this._provider = this.registry.get(this.registry.defaultProviderName);
    this.host.classList.add(this._provider.className);
  }


  @Input()
  set props(value: IconProps) {
    if (value.provider) {
      this.providerName = value.provider;
    }

    this.setIconName(value.name);

    if (value.size) {
      this.size = value.size;
    }

    if (value.theme) {
      this.theme = value.theme;
    }
  }


  get host(): HTMLElement {
    return this.elementRef.nativeElement;
  }


  /**
   * The icon provider used by this instance.
   */
  get provider(): IconProvider {
    return this._provider;
  }

  getRealIconName(name: string) {
    const value = this._provider.mapping.get(name);
    if (value) {
      return value;
    }
    return name;
  }
}
