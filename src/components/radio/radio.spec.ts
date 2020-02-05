import {MsfRadioInput} from "./radio";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MsfRadioModule} from "./radio.module";
import {RadioItemsMap} from "./radio-items-map";


describe('RadioComponent', function () {
  let fixture: ComponentFixture<MsfRadioInput>;
  let component: MsfRadioInput;
  let nameGroup: RadioItemsMap;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MsfRadioModule ]
    });

    fixture = TestBed.createComponent(MsfRadioInput);

    component = fixture.componentInstance;
    fixture.detectChanges();
    nameGroup = TestBed.get(RadioItemsMap);
  });


  it("Is defined", () => {
    fixture.detectChanges();
      expect(component).toBeDefined();
      expect(component.element.className).toBe('msf-radio');
      expect(component.inputElement.tagName).toBe('INPUT');
      expect(component.inputElement.getAttribute("type")).toBe("radio");

      expect(nameGroup.items.size()).toBe(1);
      expect(nameGroup.get("msf-radio-1").get(0)).toBe(component);
  });

  it("Set simple property", () => {
    component.id = "10";
    component.ariaDescribedby = "aria described by";
    component.ariaLabel = "aria label";
    component.ariaLabelledby = "aria labelled by";
    component.inputId = "input 1";

    fixture.detectChanges();

    expect(component.id).toBe("10");
    expect(component.ariaDescribedby).toBe("aria described by");
    expect(component.ariaLabel).toBe("aria label");
    expect(component.ariaLabelledby).toBe("aria labelled by");
    expect(component.inputId).toBe("input 1");

    expect(component.element.getAttribute("id")).toBe(component.id);
    expect(component.element.getAttribute("aria-labelledby")).toBe(component.ariaLabelledby);
    expect(component.element.getAttribute("aria-label")).toBe(component.ariaLabel);
    expect(component.element.getAttribute("aria-describedby")).toBe(component.ariaDescribedby);


    expect(component.inputElement.getAttribute("id")).toBe(component.inputId);
    expect(component.inputElement.getAttribute("aria-labelledby")).toBe(component.ariaLabelledby);
    expect(component.inputElement.getAttribute("aria-label")).toBe(component.ariaLabel);
    expect(component.inputElement.getAttribute("aria-describedby")).toBe(component.ariaDescribedby);
  });

  it("change theme", () => {
    component.theme = "error";
    fixture.detectChanges();
    expect(component.element.className).toBe(`msf-radio msf-theme-error`);
    expect(component.theme).toBe("error");

    component.theme = "primary";
    fixture.detectChanges();
    expect(component.element.className).toBe(`msf-radio msf-theme-primary`);
  });

  it("disable", () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(component.element.className).toBe(`msf-radio msf-disabled`);
    expect(component.inputElement.disabled).toBeTruthy();
    expect(component.disabled).toBeTruthy();
  });


  it("change name", () => {
    let oldName = component.name;

    component.name = "input name";

    fixture.detectChanges();

    expect(component.name).toBe("input name");
    expect(component.inputElement.getAttribute("name")).toBe("input name");



    //Checks if the input have change a group.
    expect(nameGroup.items.containsKey("input name")).toBeTruthy();
    expect(nameGroup.items.get(oldName).length).toBe(0);
    expect(nameGroup.items.get("input name").get(0)).toBe(component);
    expect(nameGroup.items.get("input name")).toBe(component.group);
  });

  it("value", () => {
    let value = "abc";

    component.value = value;
    fixture.detectChanges();

    expect(component.value).toBe(value);
    expect(component.inputElement.value).toBe(value);
  });

  it("change value of selected item", () => {

    component.value = "abc";
    component.checked = true;

    let value = "123";
    component.value = value;
    fixture.detectChanges();

    expect(component.value).toBe(value);
    expect(component.group.value).toBe(value);


  });

  it("check", () => {
    let value = "abc";

    component.name = "input name";
    component.value = value;

    component.checked = true;

    fixture.detectChanges();

    expect(component.checked).toBe(true);
    expect(component.inputElement.checked).toBe(true);

    expect(component.element.className).toBe("msf-radio msf-checked");

    expect(nameGroup.get("input name").selected).toBe(component);
    expect(nameGroup.get("input name").value).toBe(component.value);


  })
});
