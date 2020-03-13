import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsfTableCell } from './table-cell';
import { MsfTableHead } from './table-head';
import {MsfTableComponent, MsfTableRow} from './msf-table.component';
import {MsfTableHeadCell} from "./table-head-cell";

@NgModule({
  imports: [ CommonModule ],
  declarations: [MsfTableRow, MsfTableCell, MsfTableHead, MsfTableComponent,
  MsfTableHeadCell],
  exports: [ MsfTableCell, MsfTableRow, MsfTableHead, MsfTableComponent,
    MsfTableHeadCell]
})
export class MsfTableModule { }
