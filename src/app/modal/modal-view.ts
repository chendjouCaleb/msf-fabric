import {Component, Input} from "@angular/core";
import {MsfModalRef} from "../../components/modal";

@Component({
  templateUrl: 'modal-view.html',
  selector: 'modal-view'
})
export class ModalView {
  @Input()
  data: any;

  constructor(modalRef: MsfModalRef<ModalView>) {}
}
