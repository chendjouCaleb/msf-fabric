import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfContextualMenuModule} from "../../components/public_api";
import {AppLayoutComponent} from "./app-layout.component";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [ CommonModule, RouterModule, MsfContextualMenuModule ],
    declarations: [ AppLayoutComponent ],
    exports: [ AppLayoutComponent ]
})
export class AppLayoutModule {

}