import { Component, OnInit, ElementRef, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MsfTable } from '../msf-table';
import { ColorTheme } from 'dist/utils/theme';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(time) {
  await timeout(time);
}

@Component({
  selector: 'MsfTableRow',
  templateUrl: './msf-table-row.component.html',
  styles: []
})
export class MsfTableRowComponent implements OnInit, OnDestroy {

  @Input()
  Selected: boolean = false;

  @Input()
  Theme: ColorTheme = "standard";

  @Input()
  Value: any;

  selectable: boolean = false;

  index: number;


  @ViewChild("msfTableSelectCheckbox", { static: false })
  selectCheckbox: ElementRef<HTMLInputElement>

  constructor(private msfTable: MsfTable, public elementRef: ElementRef<HTMLElement>) {
    this.elementRef.nativeElement.classList.add("msf-TableRow");
    this.elementRef.nativeElement.style.opacity = "0";
  }

  ngOnDestroy() {
    this.msfTable.removeRow(this);
  }

  ngOnInit() {
    this.selectable = this.msfTable.selectable;
    this.msfTable.addRow(this);
    const height = this.elementRef.nativeElement.offsetHeight;
    this.elementRef.nativeElement.style.transform = `translateY(${height + "px"})`;

    setTimeout(() => {
      this.elementRef.nativeElement.style.opacity = "1";
      this.elementRef.nativeElement.style.transform = `translateY(${0})`;
    }, 500);

    if (this.Selected) {
      this.select();
    }
  }

  select() {
    if (this.selectable && !this.Selected) {
      this.Selected = true;
      this.msfTable.selectItem(this);
      this.selectCheckbox.nativeElement.checked = true;
    }
  }

  unselect() {
    if (this.selectable && this.Selected) {
      this.Selected = false;
      this.msfTable.unselectItem(this);
      this.selectCheckbox.nativeElement.checked = false;
    }
  }

  onclick(e) {
    if (e.target.checked) {
      this.select();
    } else {
      this.unselect();
    }
  }

  toggleSelect() {
    if (!this.Selected) {
      this.select();
    } else {
      this.unselect();
    }
  }

  get flowIndex(): number {
    return Array.from(this.elementRef.nativeElement.parentNode.children)
      .indexOf(this.elementRef.nativeElement) - 1;
  }

  get rect(): TableRowRect {
    return {
      width: this.elementRef.nativeElement.offsetWidth,
      height: this.elementRef.nativeElement.offsetHeight,
      top: this.elementRef.nativeElement.offsetTop,
      left: this.elementRef.nativeElement.offsetLeft
    }
  }

}

export interface TableRowRect {
  width: number;
  height: number;
  top: number;
  left: number;
}