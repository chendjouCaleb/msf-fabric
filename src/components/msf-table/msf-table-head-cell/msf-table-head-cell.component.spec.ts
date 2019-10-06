import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsfTableHeadCellComponent } from './msf-table-head-cell.component';

describe('MsfTableHeadCellComponent', () => {
  let component: MsfTableHeadCellComponent;
  let fixture: ComponentFixture<MsfTableHeadCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsfTableHeadCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsfTableHeadCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
