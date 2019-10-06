import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsfIconButtonComponent } from './msf-icon-button.component';

describe('MsfIconButtonComponent', () => {
  let component: MsfIconButtonComponent;
  let fixture: ComponentFixture<MsfIconButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsfIconButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsfIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
