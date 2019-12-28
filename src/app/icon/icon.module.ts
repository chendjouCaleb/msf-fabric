import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconListComponent} from './icon-list/icon-list.component';
import {Routes, RouterModule} from '@angular/router';
import {AppLayoutModule} from "../layout/app.layout.module";
import {
  IconRegistry,
  MSF_DEFAULT_ICON_REGISTRY,
  MSF_ICON_IMAGE_MAPPING,
  MsfIconModule
} from "../../components/icon/public_api";
import {IconComponent} from "./icon.component";
import {Dictionary} from "@positon/collections";

const routes: Routes = [
  {path: "iconList", component: IconListComponent},
  {path: "", component: IconComponent}
];




@NgModule({
  declarations: [IconListComponent, IconComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfIconModule
  ],
  providers: [

    ]
})
export class IconModule {
}
