import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsfTableCellComponent } from './msf-table-cell.component';

describe('MsfTableCellComponent', () => {
  let component: MsfTableCellComponent;
  let fixture: ComponentFixture<MsfTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsfTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsfTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
