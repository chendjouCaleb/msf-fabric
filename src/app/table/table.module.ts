import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { Routes, RouterModule } from '@angular/router';
import { MsfTableModule } from '../../components/public_api';
import { MutableTableComponent } from './mutable-table/mutable-table.component';
import { MsfButtonModule } from '../../components/public_api';

const routes: Routes = [
  {path: "", component: TableComponent }
]

@NgModule({
  declarations: [TableComponent, MutableTableComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule,
    MsfTableModule, MsfButtonModule
  ]
})
export class TableModule { }
