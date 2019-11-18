import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsfTableComponent } from './msf-table.component';

describe('MsfTableComponent', () => {
  let component: MsfTableComponent;
  let fixture: ComponentFixture<MsfTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsfTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsfTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component)

  });


});
