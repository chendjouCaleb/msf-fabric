import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsfCommandButtonComponent } from './msf-command-button.component';

describe('MsfCommandButtonComponent', () => {
  let component: MsfCommandButtonComponent;
  let fixture: ComponentFixture<MsfCommandButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsfCommandButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsfCommandButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
