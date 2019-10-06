import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsfTableRowComponent } from './msf-table-row/msf-table-row.component';
import { MsfTableCellComponent } from './msf-table-cell/msf-table-cell.component';
import { MsfTableHeadComponent } from './msf-table-head/msf-table-head.component';
import { MsfTableComponent } from './msf-table/msf-table.component';
import { MsfTableHeadCellComponent } from './msf-table-head-cell/msf-table-head-cell.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [MsfTableRowComponent, MsfTableCellComponent, MsfTableHeadComponent, MsfTableComponent,
  MsfTableHeadCellComponent],
  exports: [ MsfTableCellComponent, MsfTableRowComponent, MsfTableHeadComponent, MsfTableComponent,
    MsfTableHeadCellComponent]
})
export class MsfTableModule { }
