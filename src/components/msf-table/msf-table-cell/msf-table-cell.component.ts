import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'MsfTableCell',
  templateUrl: './msf-table-cell.component.html',
  styles: []
})
export class MsfTableCellComponent implements OnInit {

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.elementRef.nativeElement.classList.add("msf-TableCell");
   }

  ngOnInit() {
  }

}
