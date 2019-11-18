import { MsfButtonModule } from 'src/components/public_api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { Routes, RouterModule } from '@angular/router';
import {AppLayoutModule} from "../layout/app.layout.module";

const routes: Routes = [
    {path: "", component: ButtonComponent }
];
@NgModule({
    imports: [ CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfButtonModule ],
    declarations: [ButtonComponent],
})
export class ButtonModule {}
