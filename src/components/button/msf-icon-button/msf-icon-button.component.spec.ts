import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsfIconButton } from './icon-button';

describe('MsfIconButtonComponent', () => {
  let component: MsfIconButton;
  let fixture: ComponentFixture<MsfIconButton>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsfIconButton ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsfIconButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
