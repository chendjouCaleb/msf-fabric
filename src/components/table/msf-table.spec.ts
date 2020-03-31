import {Component, DebugElement} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {MsfCheckboxModule} from "../checkbox/checkbox.module";
import {By} from "@angular/platform-browser";
import {ELEMENT_DATA} from "../../element";
import {MsfTableModule} from "./msf-table.module";
import {MsfTable, MsfTableRow} from "./table";


describe("Simple test", () => {


  let fixture: ComponentFixture<TestComponent>;
  let tableDebugElement: DebugElement;
  let tableRowDebugElements: DebugElement[];
  let tableElement: HTMLElement;
  let tableRowElements: HTMLElement[];

  let tableInstance: MsfTable;
  let tableRowInstances: MsfTableRow[];

  let testComponent: TestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MsfCheckboxModule, MsfTableModule],
      declarations: [TestComponent]
    });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    resetVars();
  }));

  function resetVars() {
    testComponent = fixture.componentInstance;

    tableDebugElement = fixture.debugElement.query(By.directive(MsfTable));
    tableInstance = tableDebugElement.componentInstance;
    tableElement = tableDebugElement.nativeElement;

    tableRowDebugElements = fixture.debugElement.queryAll(By.directive(MsfTableRow));
    tableRowInstances = tableRowDebugElements.map(el => el.componentInstance);
    tableRowElements = tableRowDebugElements.map(el => el.nativeElement);
  }

  it("table create", () => {

    expect(tableInstance.selectable).toBeFalsy();
    expect(tableInstance.selection.size()).toBe(0);
    expect(tableInstance.selectionMode).toBeFalsy();

    expect(tableInstance.queryList.length).toBe(5);
    expect(tableInstance.items.size()).toBe(5);
    expect(tableRowInstances.length).toBe(5);
    expect(tableInstance.sortedItems.size()).toBe(5);
    expect(tableInstance.hiddenItems.size()).toBe(0);

    tableRowInstances.forEach((item, index) => {
      expect(item.table).toBe(tableInstance);
      expect(item.value).toBe(ELEMENT_DATA[index]);
      expect(item.index).toBe(index);
      expect(item._sortOrder).toBe(index);
      expect(item.selectable).toBeTruthy();
      expect(item._checkbox).toBeUndefined();
    });
  });


  it("Add item to table after initialisation", () => {
    testComponent.values = ELEMENT_DATA.slice();
    fixture.detectChanges();

    expect(tableInstance.queryList.length).toBe(10);
    expect(tableInstance.items.size()).toBe(10);
    expect(tableInstance.sortedItems.size()).toBe(10);
    expect(tableInstance.hiddenItems.size()).toBe(0);

    tableRowInstances.forEach((item, index) => {
      expect(item.table).toBe(tableInstance);
      expect(item.value).toBe(ELEMENT_DATA[index]);
      expect(item.index).toBe(index);
      expect(item.selectable).toBeTruthy();
      expect(item._checkbox).toBeUndefined();
    });
  });

    it("Remove item from table", () => {
      //Remove the 3th element.
      testComponent.values = ELEMENT_DATA.slice(0, 3).concat(ELEMENT_DATA.slice(4, 5));
      fixture.detectChanges();
      tableRowDebugElements = fixture.debugElement.queryAll(By.directive(MsfTableRow));
      tableRowInstances = tableRowDebugElements.map(el => el.componentInstance);


      expect(tableInstance.queryList.length).toBe(4);
      expect(tableInstance.items.size()).toBe(4);
      expect(tableInstance.sortedItems.size()).toBe(4);
      expect(tableRowInstances.length).toBe(4);
      expect(tableInstance.hiddenItems.size()).toBe(0);
    });



  it('ItemGrid should have grid selectedClassNames', () => {
    tableInstance.selectedClassNames = 'abc-className';

    expect(tableRowInstances.every(item => item.selectedClassNames === 'abc-className')).toBeTruthy();
  });
});

  @Component({
    template: `
        <MsfTable>
            <MsfTableHead>
                <MsfTableHeadCell>#</MsfTableHeadCell>
                <MsfTableHeadCell>Position</MsfTableHeadCell>
                <MsfTableHeadCell>Name</MsfTableHeadCell>
                <MsfTableHeadCell>Weight</MsfTableHeadCell>
                <MsfTableHeadCell>Symbol</MsfTableHeadCell>
            </MsfTableHead>

            <MsfTableRow *ngFor="let item of values" #row [value]="item">
                <MsfTableCell>{{row.index + 1}}</MsfTableCell>
                <MsfTableCell>{{item.position}}</MsfTableCell>
                <MsfTableCell>{{item.name}}</MsfTableCell>
                <MsfTableCell>{{item.weight}}</MsfTableCell>
                <MsfTableCell>{{item.symbol}}</MsfTableCell>
            </MsfTableRow>
        </MsfTable>`
  })
  class TestComponent {
    values = ELEMENT_DATA.slice(0, 5);
  }

