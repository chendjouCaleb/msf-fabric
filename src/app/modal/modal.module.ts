import {MsfButtonModule, MsfPivotModule} from 'src/components/public_api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import {AppLayoutModule} from "../layout/app.layout.module";
import {ModalComponent} from "./modal.component";
import {MsfModalModule} from "../../components/modal";
import {ModalView} from "./modal-view";

const routes: Routes = [
    {path: "", component: ModalComponent }
];
@NgModule({
    imports: [ CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfButtonModule, MsfModalModule ],
    declarations: [ModalComponent, ModalView ],
})
export class ModalModule {}
