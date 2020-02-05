import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MsfRadioInput} from "./radio";
import {RadioItemsMap} from "./radio-items-map";
import {MsfRadioModule} from "./radio.module";

describe('RadioComponent', () => {
    let fixture1: ComponentFixture<MsfRadioInput>;
    let fixture2: ComponentFixture<MsfRadioInput>;

    let component1: MsfRadioInput;
    let component2: MsfRadioInput;

    let inputName = "input name";

    let groups: RadioItemsMap;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MsfRadioModule]
      });

      fixture1 = TestBed.createComponent(MsfRadioInput);
      fixture2 = TestBed.createComponent(MsfRadioInput);

      component1 = fixture1.componentInstance;
      component2 = fixture2.componentInstance;


      groups = TestBed.get(RadioItemsMap);

      fixture1.componentInstance.name = inputName;
      fixture2.componentInstance.name = inputName;

      fixture1.detectChanges();
      fixture2.detectChanges();
    });

    it("is defined", () => {


      let group = groups.get(inputName);
      expect(group).toBeDefined();
      expect(group.length).toBe(2);
      expect(group.contains(component1));
      expect(group.contains(component2));
    });

    it("disabled", () => {
      let group = groups.get(inputName);
      group.disabled = true;

      detectChange();

      expect(component1.inputElement.disabled).toBeTruthy();
      expect(component1.disabled).toBeTruthy();
      expect(component1.element.className).toBe(`msf-radio msf-disabled`);

      expect(component2.inputElement.disabled).toBeTruthy();
      expect(component2.disabled).toBeTruthy();
      expect(component2.element.className).toBe(`msf-radio msf-disabled`);
    });

  it("change theme", () => {
    let group = groups.get(inputName);
    group.theme = "error";

    detectChange();

    expect(component1.element.className).toBe(`msf-radio msf-theme-error`);
    expect(component1.theme).toBe("error");

    expect(component2.element.className).toBe(`msf-radio msf-theme-error`);
    expect(component2.theme).toBe("error");
  });

    function detectChange() {
      fixture1.detectChanges();
      fixture2.detectChanges();
    }
  }
);
