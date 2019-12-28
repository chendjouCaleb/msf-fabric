import {MsfButtonModule, MsfPivotModule} from 'src/components/public_api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PivotComponent } from './pivot/pivot.component';
import { Routes, RouterModule } from '@angular/router';
import {AppLayoutModule} from "../layout/app.layout.module";

const routes: Routes = [
    {path: "", component: PivotComponent }
];
@NgModule({
    imports: [ CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfButtonModule, MsfPivotModule ],
    declarations: [PivotComponent],
})
export class PivotModule {}
