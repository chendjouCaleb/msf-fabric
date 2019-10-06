import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsfTableHeadComponent } from './msf-table-head.component';

describe('MsfTableHeadComponent', () => {
  let component: MsfTableHeadComponent;
  let fixture: ComponentFixture<MsfTableHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsfTableHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsfTableHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
