import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ComponentToRender} from "../dialog/dialog.component";
import {MsfModal} from "../../components/modal";
import {ModalView} from "./modal-view";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent implements OnInit, AfterViewInit {

  @ViewChild("templateDialogView", { read: TemplateRef})
  templateDialogContent: TemplateRef<any>;

  constructor(private _modal: MsfModal) { }

  ngOnInit() {

  }

  componentModal() {
    const modalRef = this._modal.open(ModalView);
    modalRef.componentInstance.data = 'abc'
  }

  templateDialog() {
    const modalRef = this._modal.open(this.templateDialogContent, {hasBackdrop: true});

  }

  ngAfterViewInit(): void {
    console.log(this.templateDialogContent)
  }
}
