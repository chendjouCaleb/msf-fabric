import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconListComponent } from './icon-list/icon-list.component';
import { Routes, RouterModule } from '@angular/router';
import {AppLayoutModule} from "../layout/app.layout.module";

const routes: Routes = [
  {path: "", component: IconListComponent }
];

@NgModule({
  declarations: [IconListComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), AppLayoutModule
  ]
})
export class IconModule { }
