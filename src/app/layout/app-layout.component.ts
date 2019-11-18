import {Component, Input} from "@angular/core";
import {Title} from "@angular/platform-browser";

@Component({
    templateUrl: "app-layout.component.html",
    selector: "app-layout"
})
export class AppLayoutComponent {
    @Input()
    title: string;

    constructor(public appTitle: Title) {
        this.appTitle.setTitle(this.title);
    }
}