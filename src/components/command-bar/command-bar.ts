import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

@Component({
  templateUrl: "command-bar.html",
  selector: "MsfCommandBar, [MsfCommandBar]",
  host: {
    "class" : "msf-command-bar",
    "[attr.aria-labelledby]": "ariaLabelledby",
    "[attr.aria-label]": "ariaLabel"
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MsfCommandBar {

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
}
