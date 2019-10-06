import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { MsfTable } from '../msf-table';
import { MsfTableRowComponent } from '../msf-table-row/msf-table-row.component';

@Component({
  selector: 'MsfTable',
  templateUrl: './msf-table.component.html',
  styles: [],
  providers: [ MsfTable ]
})
export class MsfTableComponent implements OnInit {
  @Input()
  Selectable: boolean = false;

  @Output()
  Onselectionchange = new EventEmitter<MsfTableRowComponent[]>();

  constructor(private msfTable: MsfTable, private elementRef: ElementRef<HTMLElement>) {
    this.elementRef.nativeElement.classList.add("msf-Table");
   }

  ngOnInit() {
    this.msfTable.selectable = this.Selectable;

    this.msfTable.onselectionchange.subscribe((e) => {
      this.Onselectionchange.emit(e);
    })
  }

}
