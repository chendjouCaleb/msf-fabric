import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

@Component({
  selector: 'MsfMenuItemGroup',
  template: `
      <div class="msf-menuItemGroup-title" *ngIf="title">{{title}}</div>
      <ng-content></ng-content>
  `,
  host: {
    'class': 'msf-menuItemGroup',
    '[class.msf-menuItemGroup-divider]':'divider'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MsfMenuItemGroup {
  @Input()
  title: string;

  @Input()
  divider: boolean = true;
}
