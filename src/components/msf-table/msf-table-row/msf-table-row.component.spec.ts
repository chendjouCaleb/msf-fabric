import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsfTableRowComponent } from './msf-table-row.component';

describe('MsfTableRowComponent', () => {
  let component: MsfTableRowComponent;
  let fixture: ComponentFixture<MsfTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsfTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsfTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
