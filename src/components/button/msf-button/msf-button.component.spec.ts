import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsfButtonComponent } from './msf-button.component';

describe('MsfButtonComponent', () => {
  let component: MsfButtonComponent;
  let fixture: ComponentFixture<MsfButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsfButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsfButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log("bonjour")
    expect(component).toBeTruthy();
  });
});
