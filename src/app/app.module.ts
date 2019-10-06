import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsfButtonModule } from 'src/components/button/msf-button.module';
import { ButtonModule } from './button/button.module';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule, AppRoutingModule, MsfButtonModule, ButtonModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
