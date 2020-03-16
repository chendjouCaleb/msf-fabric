import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {AppLayoutModule} from "../layout/app.layout.module";
import {
  MsfIconModule,
  MsfButtonModule,
  MsfCheckboxModule,
  MsfRadioModule,
  MsfPersonaModule
} from "../../components/public_api";
import {PersonaComponent} from "./persona.component";
import {ColorPersonaComponent} from "./color/color-persona.component";
import {InitialPersonaComponent} from "./initial/initial-persona.component";
import {PresencePersonaComponent} from "./presence/presence-persona.component";
import {SmallPersonaComponent} from "./small/small-persona.component";
import {UnknownPersonaComponent} from "./unknown/unknown-persona.component";
import {VariousPersonaComponent} from "./various/various-persona.component";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {path: "", component: PersonaComponent}
];


@NgModule({
  declarations: [PersonaComponent, ColorPersonaComponent, InitialPersonaComponent, PresencePersonaComponent,
  SmallPersonaComponent, UnknownPersonaComponent, VariousPersonaComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), AppLayoutModule, MsfIconModule,
    MsfButtonModule, MsfCheckboxModule, MsfRadioModule, MsfPersonaModule, FormsModule
  ],
  providers: []
})
export class PersonaModule {
}
