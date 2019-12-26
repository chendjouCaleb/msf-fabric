import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit} from "@angular/core";
import {ColorTheme, Size} from "../helpers/theme";
import {IconRegistry} from "./icon-registry";
import {IconProvider} from "./icon-provider";
import {NullArgumentException} from "@positon/collections";

@Component({
  selector: "MsfIcon, [MsfIcon]",
  templateUrl: "msf-icon-font.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MsfIconFont implements OnInit {
  private _theme: ColorTheme;

  get theme(): ColorTheme {
    return this._theme;
  }

  @Input()
  set theme(value: ColorTheme) {
    this.host.classList.remove("msf_Theme-" + this._theme);
    this._theme = value;

    this.host.classList.add("msf_Theme-" + value);
  }

  private _iconName: string;


  get iconName(): string {
    return this._iconName;
  }

  @Input()
  set iconName(value: string) {
    if (!value) {
      throw new Error("Cannot use empty or null string as icon name");
    }


    this.host.classList.remove(this._provider.classPrefix + this.getRealIconName(value));

    this._iconName = value;

    this.host.classList.add(this._provider.classPrefix + this.getRealIconName(this.iconName));
  }

  getRealIconName(name: string) {
    const value = this._provider.mapping.get(name);

    if(value){
      return value;
    }

    return name;
  }

   private _size: Size;


  get size(): Size {
    return this._size;
  }

  /**
   * The font-size of icon. You can use style property instead.
   */
  @Input()
  set size(value: Size) {
    this.host.classList.remove("msf_Size-" + value);
    this.host.classList.add("msf_Size-" + value);
    this._size = value;
  }

  private _providerName: string;
  get providerName(): string {
    return this._providerName;
  }


  @Input()
  set providerName(value: string) {
    if (!value) {
      throw new NullArgumentException("Cannot get a iconProvider with null or empty string name");
    }

    this.host.classList.remove(this._provider.className);
    this.host.classList.remove(this._provider.classPrefix + this.getRealIconName(this.iconName));

    this._provider = this.registry.get(value);

    this.host.classList.add(this._provider.className);
    this.host.classList.add(this._provider.classPrefix + this.getRealIconName(this.iconName));
  }


  constructor(private registry: IconRegistry, private elementRef: ElementRef<HTMLElement>) {
    this._provider = this.registry.get(this.registry.defaultProviderName);
    this.host.classList.add(this._provider.className);

  }

  private _provider: IconProvider;

  ngOnInit(): void {

  }

  get host(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
