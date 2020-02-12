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
      expect(gridInstance.selectionMode).toBeFalsy();

      expect(gridInstance.items.length).toBe(10);
      expect(gridItemInstances.length).toBe(10);
      expect(gridInstance.sortedItems.size()).toBe(10);


      gridItemInstances.forEach((item, index) => {
        expect(item._grid).toBe(gridInstance);
        expect(item.value).toBe(index + 1);
        expect(item._index).toBe(index);
        expect(item.selectable).toBeFalsy();
        expect(item._checkbox).toBeUndefined();
      });
    });


    it("set width and height should be reflected on items", () => {
      gridInstance.width = 50;
      gridInstance.height = 50;

      expect(gridInstance.width).toBe(50);
      expect(gridInstance.height).toBe(50);

      gridItemElements.forEach(item => {
        expect(item.style.width).toBe("50px");
        expect(item.style.height).toBe("50px");
      });
    });


    it("set xMargin and yMargin should be reflected on items", () => {
      gridInstance.xMargin = 7;
      gridInstance.yMargin = 6;

      expect(gridInstance.xMargin).toBe(7);
      expect(gridInstance.yMargin).toBe(6);

      gridItemElements.forEach(item => {
        expect(item.style.marginLeft).toBe("7px");
        expect(item.style.marginRight).toBe("7px");

        expect(item.style.marginTop).toBe("6px");
        expect(item.style.marginBottom).toBe("6px");
      });
    });

    it("select item element should add selected state and msf-selected className", () => {
      let item = gridItemInstances[0];
      gridInstance.selectable = true;

      gridInstance.select(item);

      fixture.detectChanges();

      checkItemSelectionState(item);

    });


    it("unselect item element should remove selected state and msf-selected className", () => {
      let item = gridItemInstances[0];
      gridInstance.selectable = true;
      gridInstance.select(item);
      fixture.detectChanges();

      gridInstance.unselect(item);
      fixture.detectChanges();

      expect(item.selected).toBeFalsy();
      expect(item.element.classList.contains("msf-selected")).toBeFalsy();
      expect(gridInstance.selection.size()).toBe(0);

    });

    it("select item when selectable state is false should not select item", () => {
      let item = gridItemInstances[0];

      gridInstance.select(item);

      fixture.detectChanges();

      expect(item.selected).toBeFalsy();
    });

    it("select a non selectable item should not select item", () => {
      let item = gridItemInstances[0];
      item.selectable = false;

      gridInstance.select(item);
      fixture.detectChanges();

      expect(item.selected).toBeFalsy();
      expect(item.element.classList.contains("msf-selected")).toBeFalsy();
      expect(gridInstance.selection.size()).toBe(0);
    });


    it("selectAll() should select all grid item", () => {
      gridInstance.selectable = true;
      gridInstance.selectAll();
      fixture.detectChanges();
      expect(gridInstance.selection.size()).toBe(gridInstance.length);
      gridItemInstances.forEach((item, index) => {
        expect(item.selected).toBeTruthy();

        expect(gridInstance.selection.get(index)).toBe(item);
      });
    });


    it("selectRange() should select all grid item inside the specified range", () => {
      let start = 3;
      let end = 8;
      let count = end - start + 1;

      gridInstance.selectable = true;

      gridInstance.selectRange(start, end);
      fixture.detectChanges();

      gridInstance.sortedItems.getRange(start, count).forEach((item, index) => {
        expect(item.selected).toBeTruthy();
        expect(gridInstance.selection.get(index)).toBe(item);
      });

      expect(gridInstance.selection.size()).toBe(end - start + 1);

    });


    it("Invert selection should select all unselected item and unselect selected items", () => {
      gridInstance.selectable = true;

      let start = 3;
      let end = 8;
      let count = end - start + 1;

      gridInstance.selectRange(start, end);
      fixture.detectChanges();

      gridInstance.invertSelection();
      fixture.detectChanges();

      gridInstance.sortedItems.getRange(0, start).forEach((item, index) => {

        expect(item.selected).toBeTruthy();
        expect(gridInstance.selection.get(index)).toBe(item);
      });

      gridItemInstances.slice(start, end).forEach((item) => {
        expect(item.selected).toBeFalsy();
      });

      gridInstance.sortedItems.getRange(end + 1).forEach((item, index) => {
        expect(item.selected).toBeTruthy();
        expect(gridInstance.selection.get(index + start)).toBe(item);
      });


      expect(gridInstance.selection.size()).toBe(gridItemInstances.length - (end - start + 1));
    });


    it('click on item should select it', () => {
      let item = gridItemInstances[2];
      gridItemElements[2].click();

      fixture.detectChanges();

      expect(item.selected).toBeTruthy();
    });


    it('click on item should unselect all items and select the target items', () => {
      gridInstance.selectable = true;
      gridInstance.selectAll();

      gridItemElements[3].click();

      fixture.detectChanges();

      let nonSelectedItems = gridInstance.sortedItems.getRange();
      nonSelectedItems.remove(gridItemInstances[3]);
      expect(nonSelectedItems.trueForAll(item => !item.selected)).toBeTruthy();
      expect(gridItemInstances[3].selected).toBeTruthy();
    });


    it("click on item with ctrl key will not unselect selected item", () => {
      gridInstance.selectable = true;

      gridInstance.select(gridItemInstances[0]);
      gridInstance.select(gridItemInstances[3]);

      let clickEvent = new MouseEvent("click", {ctrlKey: true});
      gridItemElements[4].dispatchEvent(clickEvent);
      fixture.detectChanges();

      expect(gridInstance.selection.size()).toBe(3);

      expect(gridItemInstances[0].selected).toBeTruthy();
      expect(gridItemInstances[3].selected).toBeTruthy();
      expect(gridItemInstances[4].selected).toBeTruthy();
    });



    it("click on item with ctrl key will not unselect selected items and unselect the target item if is selected", () => {
      gridInstance.selectable = true;

      gridInstance.select(gridItemInstances[0]);
      gridInstance.select(gridItemInstances[3]);
      gridInstance.select(gridItemInstances[4]);

      let clickEvent = new MouseEvent("click", {ctrlKey: true});
      gridItemElements[4].dispatchEvent(clickEvent);
      fixture.detectChanges();

      expect(gridInstance.selection.size()).toBe(2);

      expect(gridItemInstances[0].selected).toBeTruthy();
      expect(gridItemInstances[3].selected).toBeTruthy();
      expect(gridItemInstances[4].selected).toBeFalsy();
    });


    it("click with shift key will select all item between the nearest selected item and the target item", () => {
      gridInstance.selectable = true;

      gridInstance.select(gridItemInstances[0]);


      let clickEvent = new MouseEvent("click", {shiftKey: true});
      gridItemElements[4].dispatchEvent(clickEvent);
      fixture.detectChanges();

      expect(gridInstance.sortedItems.slice(0, 4).trueForAll(item => item.selected)).toBeTruthy();
      expect(gridInstance.sortedItems.slice(5).trueForAll(item => item.selected)).toBeFalsy();

    });


    function checkItemSelectionState(item: MsfGridItem) {
      expect(item.selected).toBeTruthy();
      expect(item.element.classList.contains("msf-selected")).toBeTruthy();
      expect(gridInstance.selection.size()).toBe(1);
      expect(gridInstance.selection.get(0)).toBe(item);
    }


    it("select item without activate selection should do nothing", () => {
      gridInstance.select(gridItemInstances[0]);

      expect(gridItemInstances[0].selected).toBeFalsy();
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
          <MsfGridItem [value]="5">5</MsfGridItem>
          <MsfGridItem [value]="6">6</MsfGridItem>
          <MsfGridItem [value]="7">7</MsfGridItem>
          <MsfGridItem [value]="8">8</MsfGridItem>
          <MsfGridItem [value]="9">9</MsfGridItem>
          <MsfGridItem [value]="10">10</MsfGridItem>
      </MsfGrid>`
})
class DefaultGrid {

}
