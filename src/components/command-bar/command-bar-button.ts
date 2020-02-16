import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Input,
  QueryList
} from "@angular/core";
import {CanColor, CanColorCtor, mixinColor} from "../helpers/behaviors/theme";
import {CanDisable, CanDisableCtor, mixinDisabled} from "../helpers/behaviors/disabled";
import {CanDepth, CanDepthCtor, mixinDepth} from "../helpers/behaviors/depth";
import {IconImageProps, IconProps} from "../icon/icon-props";
import {ColorTheme} from "../helpers/theme";


class MsfCommandBarButtonBase {
  constructor(public _elementRef: ElementRef) {}
}

const _MsfCommandBarButtonMixinBase:
  CanColorCtor & CanDisableCtor & CanDepthCtor & typeof MsfCommandBarButtonBase
  = mixinColor(mixinDisabled(mixinDepth(MsfCommandBarButtonBase)));


let uniqueId = 0;

@Component({
  templateUrl: "command-bar-button.html",
  selector: "MsfCommandBarButton",
  host: {
    'class': 'msf-command-bar-button',
    'aria-label': 'ariaLabel',

    "[attr.tabindex]": "disabled ? -1 : 0",
    "[attr.disabled]": "disabled",
    "[attr.aria-labelledby]": "ariaLabelledby",
    "[attr.aria-label]": "ariaLabel"
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: [ "theme", "depth", "disabled" ]
})

export class MsfCommandBarButton extends _MsfCommandBarButtonMixinBase implements CanDepth, CanDisable, CanColor{

  private _useIcon: boolean;

  private _useImageIcon: boolean;

  private _iconProps: IconProps;

  private _iconImageProps: IconImageProps;

  private _secondaryIconProps: IconProps;

  private _secondaryIconImageProps: IconImageProps;

  private _iconImageName: string;

  private _iconName: string;

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


  /**
   * Show only an icon for this item, not text. Does not apply if item is in the overflow.
   */
  @Input()
  iconOnly: boolean = false;


  @Input()
  get iconProps(): IconProps {
    return this._iconProps;
  }

  set iconProps(value: IconProps) {
    this._iconProps = value;
  }


  @Input()
  get iconImageProps(): IconImageProps {
    return this._iconImageProps;
  }

  set iconImageProps(value: IconImageProps) {
    this._iconImageProps = value;
  }


  @Input()
  get secondaryIconProps(): IconProps {
    return this._secondaryIconProps;
  }

  set secondaryIconProps(value: IconProps) {
    this._secondaryIconProps = value;
  }


  @Input()
  get secondaryIconImageProps(): IconImageProps {
    return this._secondaryIconImageProps;
  }

  set secondaryIconImageProps(value: IconImageProps) {
    this._secondaryIconImageProps = value;
  }

}



@Component({
  templateUrl: "command-bar-split-button.html",
  selector: "MsfCommandBarSplitButton",
  host: {
    'class': 'msf-command-bar-split-button'

  },
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MsfCommandBarSplitButton implements AfterContentInit{

  private _theme: ColorTheme;

  private _disabled: boolean = false;

  @ContentChildren(forwardRef(() => MsfCommandBarButton), {descendants: true})
  private _items: QueryList<MsfCommandBarButton>;


  ngAfterContentInit(): void {
    if(this._items.length !==2){
      throw new Error("A split command bar button must contains two single buttons.")
    }
  }


  get leftButton(): MsfCommandBarButton {
    return this._items.first;
  }

  get rightButton(): MsfCommandBarButton {
    return this._items.last;
  }


}
