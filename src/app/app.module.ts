import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsfButtonModule } from 'src/components/button/msf-button.module';
import { ButtonModule } from './button/button.module';
import {IconRegistry} from "../components/icon/icon-registry";
import {MSF_DEFAULT_ICON_REGISTRY} from "../components/icon/msf-icon.module";
import {MSF_ICON_IMAGE_MAPPING} from "../components/icon/msf-icon-image";
import {Dictionary} from "@positon/collections";

let mapping = new Dictionary<string, string>();

mapping.put("neural", "/assets/icon/neural.png");
mapping.put("document", "/assets/icon/document.png");
mapping.put("cpu", "/assets/icon/cpu.png");
mapping.put("smartphone", "/assets/icon/smartphone.png");
mapping.put("folder", "/assets/icon/folder.png");
mapping.put("save", "/assets/icon/save.png");
mapping.put("settings", "/assets/icon/settings.png");

@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule, AppRoutingModule, MsfButtonModule, ButtonModule ],
  providers: [{provide: IconRegistry, useValue: MSF_DEFAULT_ICON_REGISTRY},
    {provide: MSF_ICON_IMAGE_MAPPING, useValue: mapping}],
  bootstrap: [AppComponent]
})
export class AppModule { }
