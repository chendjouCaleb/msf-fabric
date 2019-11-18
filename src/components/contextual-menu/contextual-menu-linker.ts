import {MsfContextualMenuItemComponent} from "./contextual-menu-item.component";
import {MsfContextualMenuComponent} from "./contextual-menu.component";
import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs";

@Injectable()
export class ContextualMenuLinker {
  items: MsfContextualMenuItemComponent[] = [];
  menu: MsfContextualMenuComponent;
  maxItemLabelWidth = 0;
  onMaxLabelWidthChange = new ReplaySubject();
  iconStateChange = new ReplaySubject();

  hasIcon: boolean = false;
  hasSecondaryIcon: boolean = false;
  hasSecondaryText: boolean = false;


  addItem(item: MsfContextualMenuItemComponent){
    this.items.push(item);
    if(this.maxItemLabelWidth < item.labelWidth){
      this.maxItemLabelWidth = item.labelWidth;
      this.onMaxLabelWidthChange.next();
      console.log(item.labelElement.nativeElement.innerHTML)
    }
    if(item.Icon && !this.hasIcon){
      this.hasIcon = true;
    }
    if(item.SecondaryIcon && !this.hasSecondaryIcon){
      this.hasSecondaryIcon = true;
    }
    if(item.SecondaryText && !this.hasSecondaryText){
      this.hasSecondaryText = true;
    }
    this.detectItemChange();
  }

  detectItemChange() {
    this.items.forEach(i => i.detector.detectChanges());
  }
}
