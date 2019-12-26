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

let mapping = new Dictionary<string, string>();

mapping.put("neural", "/assets/icon/neural.png");
mapping.put("document", "/assets/icon/document.png");
mapping.put("cpu", "/assets/icon/cpu.png");
mapping.put("smartphone", "/assets/icon/smartphone.png");


@NgModule({
  declarations: [IconListComponent, IconComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfIconModule
  ],
  providers: [
    {provide: IconRegistry, useValue: MSF_DEFAULT_ICON_REGISTRY},
    {provide: MSF_ICON_IMAGE_MAPPING, useValue: mapping}
    ]
})
export class IconModule {
}
