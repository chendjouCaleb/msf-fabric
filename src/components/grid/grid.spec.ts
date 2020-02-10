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

      testComponent = fixture.componentInstance;

      gridDebugElement = fixture.debugElement.query(By.directive(MsfGrid));
      gridInstance = gridDebugElement.componentInstance;
      gridElement = gridDebugElement.nativeElement;

      gridItemDebugElements = fixture.debugElement.queryAll(By.directive(MsfGridItem));
      gridItemInstances = gridItemDebugElements.map(el => el.componentInstance);
      gridItemElements = gridItemDebugElements.map(el => el.nativeElement);

    }));


    it("grid create", () => {
      expect(gridInstance.width).toBe(100);
      expect(gridInstance.height).toBe(100);
      expect(gridInstance.xMargin).toBe(10);
      expect(gridInstance.yMargin).toBe(10);
      expect(gridInstance.itemsPerLine).toBeNull();
      expect(gridInstance.selectable).toBeFalsy();
      expect(gridInstance.selection.size()).toBe(0);
      expect(gridInstance.singleSelection).toBeFalsy();
      expect(gridInstance.selectionMode).toBeFalsy();

      expect(gridInstance.items.length).toBe(4);
      expect(gridItemInstances.length).toBe(4);



      gridItemInstances.forEach((item, index) => {
        expect(item._grid).toBe(gridInstance);
        expect(item.value).toBe(index + 1);
        expect(item._index).toBe(index);
        expect(item.selectable).toBeFalsy();
        expect(item._checkbox).toBeUndefined();
      });
    });
  });
});

@Component({
  template: `
      <MsfGrid>
          <MsfGridItem [value]="1">1</MsfGridItem>
          <MsfGridItem [value]="2">2</MsfGridItem>
          <MsfGridItem [value]="3">3</MsfGridItem>
          <MsfGridItem [value]="4">4</MsfGridItem>
      </MsfGrid>`
})
class DefaultGrid {

}
