import {Component, Input} from "@angular/core";

@Component({
  selector: 'MsfSelectPlaceholder',
  template: '<ng-content></ng-content>'
})
export class MsfSelectPlaceholder {
  value: any = {a: '123'}
}
