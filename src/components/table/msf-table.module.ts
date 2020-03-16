import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsfTableCell } from './table-cell';
import { MsfTableHead } from './table-head';
import {MsfTableHeadCell} from "./table-head-cell";
import {MsfTable, MsfTableRow} from "./table";

@NgModule({
  imports: [ CommonModule ],
  declarations: [MsfTableRow, MsfTableCell, MsfTableHead, MsfTable,
  MsfTableHeadCell],
  exports: [ MsfTableCell, MsfTableRow, MsfTableHead, MsfTable,
    MsfTableHeadCell]
})
export class MsfTableModule { }
