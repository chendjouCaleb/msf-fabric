import { MsfButtonModule } from 'src/components/public_api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path: "", component: ButtonComponent }
]
@NgModule({
    imports: [ CommonModule, RouterModule.forChild(routes), MsfButtonModule ],
    declarations: [ButtonComponent],
})
export class ButtonModule {}