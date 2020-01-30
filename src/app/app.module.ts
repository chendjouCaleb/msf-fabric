import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsfButtonModule } from 'src/components/button/msf-button.module';
import { ButtonModule } from './button/button.module';
import {IconRegistry} from "../components/icon/icon-registry";
import {MSF_DEFAULT_ICON_REGISTRY} from "../components/icon/msf-icon.module";
import {MSF_ICON_IMAGE_CONFIG, MsfIconImageConfig} from "../components/icon/public_api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


let iconImageConfig = new MsfIconImageConfig();


iconImageConfig.mapping.put("neural", "/assets/icon/neural.png");
iconImageConfig.mapping.put("document", "/assets/icon/document.png");
iconImageConfig.mapping.put("cpu", "/assets/icon/cpu.png");
iconImageConfig.mapping.put("smartphone", "/assets/icon/smartphone.png");
iconImageConfig.mapping.put("folder", "/assets/icon/folder.png");
iconImageConfig.mapping.put("save", "/assets/icon/save.png");
iconImageConfig.mapping.put("settings", "/assets/icon/settings.png");

@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule, BrowserAnimationsModule, AppRoutingModule, MsfButtonModule, ButtonModule ],
  providers: [{provide: IconRegistry, useValue: MSF_DEFAULT_ICON_REGISTRY},
    {provide: MSF_ICON_IMAGE_CONFIG, useValue: iconImageConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
