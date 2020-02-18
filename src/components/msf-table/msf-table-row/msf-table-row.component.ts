import { Component, OnInit, ElementRef, Input, ViewChild, OnDestroy } from '@angular/core';
import { MsfTable } from '../msf-table';
import { ColorTheme } from '../../helpers/theme';

@Component({
  selector: 'MsfTableRow',
  templateUrl: './msf-table-row.component.html',
  styles: []
})
export class MsfTableRowComponent implements OnInit, OnDestroy {

  @Input()
  selected: boolean = false;

  @Input()
  theme: ColorTheme = "standard";

  @Input()
  value: any;

  selectable: boolean = false;

  index: number;


  @ViewChild("msfTableSelectCheckbox")
  selectCheckbox: ElementRef<HTMLInputElement>;

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

    if (this.selected) {
      this.select();
    }
  }

  select() {
    if (this.selectable && !this.selected) {
      this.selected = true;
      this.msfTable.selectItem(this);
      this.selectCheckbox.nativeElement.checked = true;
    }
  }

  unselect() {
    if (this.selectable && this.selected) {
      this.selected = false;
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
    if (!this.selected) {
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
