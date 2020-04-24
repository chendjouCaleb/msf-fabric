import {Component, Input} from "@angular/core";

@Component({
  templateUrl: 'modal-view.html',
  selector: 'modal-view'
})
export class ModalView {
  @Input()
  data: any;
}
