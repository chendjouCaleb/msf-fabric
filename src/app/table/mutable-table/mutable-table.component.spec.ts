import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MutableTableComponent } from './mutable-table.component';

describe('MutableTableComponent', () => {
  let component: MutableTableComponent;
  let fixture: ComponentFixture<MutableTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MutableTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MutableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
