import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsfButton } from './button';
import {Component, DebugElement} from "@angular/core";
import {MsfButtonModule} from "../msf-button.module";
import {By} from "@angular/platform-browser";
import {ColorTheme} from "../../helpers/theme";

describe('MsfButtonComponent', () => {
  let component: TestApp;
  let fixture: ComponentFixture<TestApp>;

  let buttonDebugElement: DebugElement;
  let buttonInstance: MsfButton;
  let buttonElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MsfButtonModule ],
      declarations: [ TestApp ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestApp);
    component = fixture.componentInstance;
    fixture.detectChanges();

    buttonDebugElement = fixture.debugElement.query(By.css("#simple-button"));
    buttonInstance = buttonDebugElement.componentInstance;
    buttonElement = buttonDebugElement.nativeElement;
  }));


  it('should create', () => {
    component.theme = "primary";
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(buttonElement.classList.contains("msf-button")).toBeTruthy();
    expect(buttonElement.classList.contains("msf-theme-primary")).toBeTruthy();
  });
});


@Component({
  selector: "test-app",
  template: `
    <MsfButton id="simple-button" [theme]="theme">Simple button</MsfButton>
  `
})
export class TestApp {
  theme:ColorTheme = null;
}
