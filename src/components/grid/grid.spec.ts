import {Component, DebugElement} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {MsfGrid, MsfGridItem, MsfGridModule} from "./public_api";
import {MsfCheckboxModule} from "../checkbox/checkbox.module";
import {By} from "@angular/platform-browser";


describe("MsfGrid", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MsfCheckboxModule, MsfGridModule],
      declarations: [DefaultGrid]
    });
    TestBed.compileComponents();
  }));


  describe("Simple test", () => {
    let fixture: ComponentFixture<DefaultGrid>;
    let gridDebugElement: DebugElement;
    let gridItemDebugElements: DebugElement[];
    let gridElement: HTMLElement;
    let gridItemElements: HTMLElement[];

    let gridInstance: MsfGrid;
    let gridItemInstances: MsfGridItem[];

    let testComponent: DefaultGrid;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(DefaultGrid);
      fixture.detectChanges();

      resetVars();

    }));

    function resetVars() {
      testComponent = fixture.componentInstance;

      gridDebugElement = fixture.debugElement.query(By.directive(MsfGrid));
      gridInstance = gridDebugElement.componentInstance;
      gridElement = gridDebugElement.nativeElement;

      gridItemDebugElements = fixture.debugElement.queryAll(By.directive(MsfGridItem));
      gridItemInstances = gridItemDebugElements.map(el => el.componentInstance);
      gridItemElements = gridItemDebugElements.map(el => el.nativeElement);
    }

    it("grid create", () => {

      expect(gridInstance.itemHeight).toBe(100);
      expect(gridInstance.xMargin).toBe(10);
      expect(gridInstance.yMargin).toBe(10);
      expect(gridInstance.itemsPerLine).toBeNull();
      expect(gridInstance.selectable).toBeFalsy();
      expect(gridInstance.selection.size()).toBe(0);
      expect(gridInstance.selectionMode).toBeFalsy();

      expect(gridInstance.items.length).toBe(10);
      expect(gridItemInstances.length).toBe(10);
      expect(gridInstance.sortedItems.size()).toBe(10);

      gridItemInstances.forEach((item, index) => {
        expect(item.grid).toBe(gridInstance);
        expect(item.value).toBe(index);
        expect(item._index).toBe(index);
        expect(item.selectable).toBeTruthy();
        expect(item._checkbox).toBeUndefined();
      });
    });

    it('ItemGrid should have grid selectedClassNames', () => {
      gridInstance.selectedClassNames = 'abc-className';

      expect(gridItemInstances.every(item => item.selectedClassNames === 'abc-className')).toBeTruthy();
    });


    it("set height should be reflected on items", () => {
      gridInstance.itemHeight = 50;

      expect(gridInstance.itemHeight).toBe(50);

      gridItemElements.forEach(item => {
        expect(item.style.height).toBe("50px");
      });
    });


    it("set xMargin and yMargin should be reflected on items", () => {
      gridInstance.xMargin = 7;
      gridInstance.yMargin = 6;

      expect(gridInstance.xMargin).toBe(7);
      expect(gridInstance.yMargin).toBe(6);
      expect(gridElement.style.gridColumnGap).toBe("7");
      expect(gridElement.style.gridRowGap).toBe("6");
    });

    it("Set itemPerLine should a correct template", () => {
      gridInstance.itemsPerLine = 4;
      fixture.detectChanges();
      expect(gridElement.style.gridTemplateColumns).toBe("1fr 1fr 1fr 1fr");
    });
  });
});

@Component({
  template: `
      <MsfGrid>
          <MsfGridItem *ngFor="let value of values" [value]=value>{{value}}</MsfGridItem>
      </MsfGrid>`
})
class DefaultGrid {
  values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
}

