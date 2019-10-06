import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MsfTable } from '../msf-table';

@Component({
  selector: 'MsfTableHead',
  templateUrl: './msf-table-head.component.html',
  styles: []
})
export class MsfTableHeadComponent implements OnInit {
  selectable: boolean = false;
  selectedAll: boolean = false;

  @ViewChild("msfTableSelectAllCheckbox", { static: false})
  selectCheckbox: ElementRef<HTMLInputElement>

  constructor(private msfTable: MsfTable,private elementRef: ElementRef<HTMLElement>) {
    this.elementRef.nativeElement.classList.add("msf-TableHead");

    this.msfTable.onselectionchange.subscribe(() => {
      if(this.msfTable.isSelectedAll){
        this.selectedAll = true;
        this.selectCheckbox.nativeElement.checked = true;
      }else{
        this.selectedAll = false;
        this.selectCheckbox.nativeElement.checked = false;
      }
    });

    
   }

  ngOnInit() {
    this.selectable = this.msfTable.selectable;
  }

  selectAll(){
    if(this.selectable){
      this.selectedAll = true;
      this.msfTable.selectAll();
    }
  }

  unselectAll() {
    if(this.selectable){
      this.selectedAll = false;
      this.msfTable.unselectAll();
    }
  }
  onclick(e){
    if(e.target.checked){
      this.selectAll();
    }else{
      this.unselectAll();
    }
  }

}
