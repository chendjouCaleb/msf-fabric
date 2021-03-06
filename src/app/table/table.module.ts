import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { Routes, RouterModule } from '@angular/router';
import { MutableTableComponent } from './mutable-table/mutable-table.component';
import {MsfButtonModule, MsfCheckboxModule, MsfGridModule, MsfTableModule} from '../../components/public_api';
import {AppLayoutModule} from "../layout/app.layout.module";

const routes: Routes = [
  {path: "", component: TableComponent }
];

@NgModule({
  declarations: [TableComponent, MutableTableComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule,
    MsfTableModule, MsfButtonModule, AppLayoutModule, MsfCheckboxModule, MsfGridModule
  ]
})
export class TableModule { }
