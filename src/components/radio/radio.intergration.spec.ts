import {Component, DebugElement, ViewChild} from "@angular/core";
import {MsfRadioChange, MsfRadioInput} from "./radio";
import {FormControl, FormsModule, NgModel, ReactiveFormsModule} from "@angular/forms";
import {async, ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {MsfRadioModule} from "./radio.module";
import {MsfRadioGroup} from "./radio-group";
import {By} from "@angular/platform-browser";
import {ColorTheme} from "../helpers/theme";
import {dispatchFakeEvent} from "../helpers/testing/dispatch-event";


describe("MsfRadio", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MsfRadioModule, FormsModule, ReactiveFormsModule],
      declarations: [
        DisableableRadioButton,
        FocusableRadioButton,
        RadiosInsideRadioGroup,
        RadioGroupWithNgModel,
        RadioGroupWithFormControl,
        StandaloneRadioButtons,
        InterleavedRadioGroup,
        TranscludingWrapper,
        RadioButtonWithPredefinedTabindex
      ]
    });
    TestBed.compileComponents();
  }));


  describe("Inside of a group", () => {
    let fixture: ComponentFixture<RadiosInsideRadioGroup>;
    let groupDebugElement: DebugElement;
    let radioDebugElements: DebugElement[];
    let radioNativeElements: HTMLElement[];

    let radioInputElements: HTMLInputElement[];
    let radioLabelElements: HTMLLabelElement[];
    let groupInstance: MsfRadioGroup;
    let radioInstances: MsfRadioInput[];
    let testComponent: RadiosInsideRadioGroup;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(RadiosInsideRadioGroup);
      fixture.detectChanges();

      testComponent = fixture.componentInstance;
      groupDebugElement = fixture.debugElement.query(By.directive(MsfRadioGroup));
      groupInstance = groupDebugElement.componentInstance;

      radioDebugElements = fixture.debugElement.queryAll(By.directive(MsfRadioInput));
      radioNativeElements = radioDebugElements.map(item => item.nativeElement);
      radioInstances = radioDebugElements.map(item => item.componentInstance);
      radioInputElements = radioDebugElements
        .map(debugEl => debugEl.query(By.css('input')).nativeElement);

      radioLabelElements = groupDebugElement.queryAll(By.css("label")).map(i => i.nativeElement);

    }));

    it("should html label based on a Id", () => {
      for (const radio of radioInstances) {
        expect(radio.label).toBe(document.querySelector(`label[for='${radio.id}']`))
      }
    });

    it("should set individual radio names based on the group name", () => {
      fixture.detectChanges();
      expect(groupInstance.name).toBeTruthy();


      for (const radio of radioInstances) {
        expect(radio.name).toBe(groupInstance.name);
      }
    });


    it("should coerce the disabled binding on the radio group", () => {
      groupInstance.disabled = true;
      fixture.detectChanges();

      radioLabelElements[0].click();
      fixture.detectChanges();

      expect(radioInstances[0].checked).toBe(false);
      expect(groupInstance.disabled).toBe(true);
    });

    it('should disable click interaction when the group is disabled', () => {
      testComponent.isGroupDisabled = true;
      fixture.detectChanges();

      radioNativeElements[0].click();
      fixture.detectChanges();

      expect(radioInstances[0].checked).toBe(false);
    });


    it('should disable each individual radio when the group is disabled', () => {
      testComponent.isGroupDisabled = true;
      fixture.detectChanges();

      for (const radio of radioInstances) {
        expect(radio.disabled).toBe(true);
      }
    });


    it('should update the group value when one of the radios changes', () => {
      expect(groupInstance.value).toBeFalsy();

      radioInstances[0].checked = true;
      fixture.detectChanges();

      expect(groupInstance.value).toBe('fire');
      expect(groupInstance.selected).toBe(radioInstances[0]);
    });


    it('should update the group and radios when one of the radios is clicked', () => {
      expect(groupInstance.value).toBeFalsy();

      radioLabelElements[0].click();
      fixture.detectChanges();

      expect(groupInstance.value).toBe('fire');
      expect(groupInstance.selected).toBe(radioInstances[0]);
      expect(radioInstances[0].checked).toBe(true);
      expect(radioInstances[1].checked).toBe(false);

      radioLabelElements[1].click();
      fixture.detectChanges();

      expect(groupInstance.value).toBe('water');
      expect(groupInstance.selected).toBe(radioInstances[1]);
      expect(radioInstances[0].checked).toBe(false);
      expect(radioInstances[1].checked).toBe(true);
    });


    it('should check a radio upon interaction with the underlying radio button', () => {
      radioNativeElements[0].click();
      fixture.detectChanges();

      expect(radioInstances[0].checked).toBe(true);
      expect(groupInstance.value).toBe('fire');
      expect(groupInstance.selected).toBe(radioInstances[0]);
    });



    it("should emit a change event from radio buttons", () => {
      expect(radioInstances[0].checked).toBe(false);

      const spies = radioInstances
        .map((radio, index) => jasmine.createSpy(`onChangeSpy ${index} for ${radio.name}`));

      spies.forEach((spy, index) => radioInstances[index].change.subscribe(spy));

      radioLabelElements[0].click();
      fixture.detectChanges();

      expect(spies[0]).toHaveBeenCalled();

      radioLabelElements[1].click();
      fixture.detectChanges();

      // To match the native radio button behavior, the change event shouldn't
      // be triggered when the radio got unselected.
      expect(spies[0]).toHaveBeenCalledTimes(1);
      expect(spies[1]).toHaveBeenCalledTimes(1);
    });


    it(`should not emit a change event from the radio group when change group value
        programmatically`, () => {
      expect(groupInstance.value).toBeFalsy();

      const changeSpy = jasmine.createSpy('radio-group change listener');
      groupInstance.change.subscribe(changeSpy);

      radioLabelElements[0].click();
      fixture.detectChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);

      groupInstance.value = 'water';
      fixture.detectChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
    });


    it('should update the group and radios when updating the group value', () => {
      expect(groupInstance.value).toBeFalsy();

      testComponent.groupValue = 'fire';
      fixture.detectChanges();

      expect(groupInstance.value).toBe('fire');
      expect(groupInstance.selected).toBe(radioInstances[0]);
      expect(radioInstances[0].checked).toBe(true);
      expect(radioInstances[1].checked).toBe(false);

      testComponent.groupValue = 'water';
      fixture.detectChanges();

      expect(groupInstance.value).toBe('water');
      expect(groupInstance.selected).toBe(radioInstances[1]);
      expect(radioInstances[0].checked).toBe(false);
      expect(radioInstances[1].checked).toBe(true);
    });

    it('should deselect all of the radios when the group value is cleared', () => {
      radioInstances[0].checked = true;

      expect(groupInstance.value).toBeTruthy();

      groupInstance.value = null;

      expect(radioInstances.every(radio => !radio.checked)).toBe(true);
    });



    it(`should update the group's selected radio to null when unchecking that radio
        programmatically`, () => {
      const changeSpy = jasmine.createSpy('radio-group change listener');
      groupInstance.change.subscribe(changeSpy);
      radioInstances[0].checked = true;

      fixture.detectChanges();

      expect(changeSpy).not.toHaveBeenCalled();
      expect(groupInstance.value).toBeTruthy();

      radioInstances[0].checked = false;

      fixture.detectChanges();

      expect(changeSpy).not.toHaveBeenCalled();
      expect(groupInstance.value).toBeFalsy();
      expect(radioInstances.every(radio => !radio.checked)).toBe(true);
      expect(groupInstance.selected).toBeNull();
    });

    it('should not fire a change event from the group when a radio checked state changes', () => {
      const changeSpy = jasmine.createSpy('radio-group change listener');
      groupInstance.change.subscribe(changeSpy);
      radioInstances[0].checked = true;

      fixture.detectChanges();

      expect(changeSpy).not.toHaveBeenCalled();
      expect(groupInstance.value).toBeTruthy();
      expect(groupInstance.value).toBe('fire');

      radioInstances[1].checked = true;

      fixture.detectChanges();

      expect(groupInstance.value).toBe('water');
      expect(changeSpy).not.toHaveBeenCalled();
    });

    it(`should update checked status if changed value to radio group's value`, () => {
      const changeSpy = jasmine.createSpy('radio-group change listener');
      groupInstance.change.subscribe(changeSpy);
      groupInstance.value = 'apple';

      expect(changeSpy).not.toHaveBeenCalled();
      expect(groupInstance.value).toBe(null);
      expect(groupInstance.selected).toBeFalsy( );
      expect(radioInstances[0].checked).toBeFalsy( );
      expect(radioInstances[1].checked).toBeFalsy( );
      expect(radioInstances[2].checked).toBeFalsy( );

      radioInstances[0].value = 'apple';

      fixture.detectChanges();

      expect(groupInstance.selected).toBe(null);
      expect(radioInstances[0].checked).toBeFalsy( );
      expect(radioInstances[1].checked).toBeFalsy( );
      expect(radioInstances[2].checked).toBeFalsy( );
    });


    it('should be able to inherit the color from the radio group', () => {
      groupInstance.theme = "warning";
      fixture.detectChanges();

      expect(radioNativeElements.every(radioEl => radioEl.classList.contains('msf-theme-warning'))).toBe(true);
    });

  });

  describe('group with ngModel', () => {
    let fixture: ComponentFixture<RadioGroupWithNgModel>;
    let groupDebugElement: DebugElement;
    let radioDebugElements: DebugElement[];
    let innerRadios: DebugElement[];
    let radioLabelElements: HTMLLabelElement[];
    let radioElements: HTMLElement[];
    let groupInstance: MsfRadioGroup;
    let radioInstances: MsfRadioInput[];
    let testComponent: RadioGroupWithNgModel;
    let groupNgModel: NgModel;

    beforeEach(() => {
      fixture = TestBed.createComponent(RadioGroupWithNgModel);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;

      groupDebugElement = fixture.debugElement.query(By.directive(MsfRadioGroup));
      groupInstance = groupDebugElement.injector.get<MsfRadioGroup>(MsfRadioGroup);
      groupNgModel = groupDebugElement.injector.get<NgModel>(NgModel);

      radioDebugElements = fixture.debugElement.queryAll(By.directive(MsfRadioInput));
      radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);
      radioElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
      innerRadios = fixture.debugElement.queryAll(By.css('input[type="radio"]'));

      radioLabelElements = radioInstances
        .map(debugEl => document.querySelector(`label[for='${debugEl.id}']`));
    });

    it('should set individual radio names based on the group name', () => {
      expect(groupInstance.name).toBeTruthy();
      for (const radio of radioInstances) {
        expect(radio.name).toBe(groupInstance.name);
      }

      groupInstance.name = 'new name';

      for (const radio of radioInstances) {
        expect(radio.name).toBe(groupInstance.name);
      }
    });

    it('should update the name of radio DOM elements if the name of the group changes', () => {
      const nodes: HTMLInputElement[] = innerRadios.map(radio => radio.nativeElement);


      expect(nodes.every(radio => radio.getAttribute('name') === groupInstance.name))
        .toBe(true);

      fixture.componentInstance.groupName = 'changed-name';
      fixture.detectChanges();
      expect(groupInstance.name).toBe('changed-name');
      expect(nodes.every(radio => radio.getAttribute('name') === groupInstance.name))
        .toBe(true);
    });

    it('should check the corresponding radio button on group value change', () => {
      expect(groupInstance.value).toBeFalsy();
      for (const radio of radioInstances) {
        expect(radio.checked).toBeFalsy();
      }

      groupInstance.value = 'vanilla';
      for (const radio of radioInstances) {
        expect(radio.checked).toBe(groupInstance.value === radio.value);
      }
      expect(groupInstance.selected!.value).toBe(groupInstance.value);
    });

    it('should have the correct control state initially and after interaction', () => {
      // The control should start off valid, pristine, and untouched.
      expect(groupNgModel.valid).toBe(true);

      expect(groupNgModel.touched).toBe(false);
      expect(groupNgModel.pristine).toBe(true);

      // After changing the value programmatically, the control should stay pristine
      // but remain untouched.
      radioInstances[1].checked = true;
      fixture.detectChanges();

      expect(groupNgModel.valid).toBe(true);
      expect(groupNgModel.pristine).toBe(true);
      expect(groupNgModel.touched).toBe(false);

      // After a user interaction occurs (such as a click), the control should become dirty and
      // now also be touched.
      radioElements[2].click();
      fixture.detectChanges();

      expect(groupNgModel.valid).toBe(true);
      expect(groupNgModel.pristine).toBe(false);
      expect(groupNgModel.touched).toBe(false);

      // Blur the input element in order to verify that the ng-touched state has been set to true.
      // The touched state should be only set to true after the form control has been blurred.
      dispatchFakeEvent(radioElements[2] , 'blur');

      expect(groupNgModel.valid).toBe(true);
      expect(groupNgModel.pristine).toBe(false);
      expect(groupNgModel.touched).toBe(true);
    });

    it('should write to the radio button based on ngModel', fakeAsync(() => {
      testComponent.modelValue = 'chocolate';

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(innerRadios[1].nativeElement.checked).toBe(true);
      expect(radioInstances[1].checked).toBe(true);
    }));


    describe('group with FormControl', () => {
      let fixture: ComponentFixture<RadioGroupWithFormControl>;
      let groupDebugElement: DebugElement;
      let groupInstance: MsfRadioGroup;
      let testComponent: RadioGroupWithFormControl;

      beforeEach(() => {
        fixture = TestBed.createComponent(RadioGroupWithFormControl);
        fixture.detectChanges();

        testComponent = fixture.debugElement.componentInstance;
        groupDebugElement = fixture.debugElement.query(By.directive(MsfRadioGroup));
        groupInstance = groupDebugElement.injector.get<MsfRadioGroup>(MsfRadioGroup);
      });

      it('should toggle the disabled state', () => {
        expect(groupInstance.disabled).toBeFalsy();

        testComponent.formControl.disable();
        fixture.detectChanges();

        expect(groupInstance.disabled).toBeTruthy();

        testComponent.formControl.enable();
        fixture.detectChanges();

        expect(groupInstance.disabled).toBeFalsy();
      });


      describe('disableable', () => {
        let fixture: ComponentFixture<DisableableRadioButton>;
        let radioInstance: MsfRadioInput;
        let radioNativeElement: HTMLInputElement;
        let testComponent: DisableableRadioButton;

        beforeEach(() => {
          fixture = TestBed.createComponent(DisableableRadioButton);
          fixture.detectChanges();

          testComponent = fixture.debugElement.componentInstance;
          const radioDebugElement = fixture.debugElement.query(By.directive(MsfRadioInput));
          radioInstance = radioDebugElement.injector.get<MsfRadioInput>(MsfRadioInput);
          radioNativeElement = radioDebugElement.nativeElement;
        });

        it('should toggle the disabled state', () => {
          expect(radioInstance.disabled).toBeFalsy();
          expect(radioNativeElement.disabled).toBeFalsy();

          testComponent.disabled = true;
          fixture.detectChanges();

          expect(radioInstance.disabled).toBeTruthy();
          expect(radioNativeElement.classList.contains("msf-disabled")).toBeTruthy();

          testComponent.disabled = false;
          fixture.detectChanges();
          expect(radioInstance.disabled).toBeFalsy();
          expect(radioNativeElement.classList.contains("msf-disabled")).toBeFalsy();
        });
      });
    });
  });

  describe('as standalone', () => {
    let fixture: ComponentFixture<StandaloneRadioButtons>;
    let radioDebugElements: DebugElement[];
    let seasonRadioInstances: MsfRadioInput[];
    let weatherRadioInstances: MsfRadioInput[];
    let fruitRadioInstances: MsfRadioInput[];
    let fruitRadioNativeInputs: HTMLElement[];
    let fruitRadioNativeElements: HTMLElement[];
    let testComponent: StandaloneRadioButtons;

    beforeEach(() => {
      fixture = TestBed.createComponent(StandaloneRadioButtons);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;

      radioDebugElements = fixture.debugElement.queryAll(By.directive(MsfRadioInput));
      seasonRadioInstances = radioDebugElements
        .filter(debugEl => debugEl.componentInstance.name == 'season')
        .map(debugEl => debugEl.componentInstance);
      weatherRadioInstances = radioDebugElements
        .filter(debugEl => debugEl.componentInstance.name == 'weather')
        .map(debugEl => debugEl.componentInstance);
      fruitRadioInstances = radioDebugElements
        .filter(debugEl => debugEl.componentInstance.name == 'fruit')
        .map(debugEl => debugEl.componentInstance);

      fruitRadioNativeElements = radioDebugElements
        .filter(debugEl => debugEl.componentInstance.name == 'fruit')
        .map(debugEl => debugEl.nativeElement);

      fruitRadioNativeInputs = [];
      for (const element of fruitRadioNativeElements) {
        fruitRadioNativeInputs.push(<HTMLElement> element.querySelector('input'));
      }
    });

    it('should uniquely select radios by a name', () => {
      seasonRadioInstances[0].checked = true;
      weatherRadioInstances[1].checked = true;

      fixture.detectChanges();
      expect(seasonRadioInstances[0].checked).toBe(true);
      expect(seasonRadioInstances[1].checked).toBe(false);
      expect(seasonRadioInstances[2].checked).toBe(false);
      expect(weatherRadioInstances[0].checked).toBe(false);
      expect(weatherRadioInstances[1].checked).toBe(true);
      expect(weatherRadioInstances[2].checked).toBe(false);

      seasonRadioInstances[1].checked = true;
      fixture.detectChanges();
      expect(seasonRadioInstances[0].checked).toBe(false);
      expect(seasonRadioInstances[1].checked).toBe(true);
      expect(seasonRadioInstances[2].checked).toBe(false);
      expect(weatherRadioInstances[0].checked).toBe(false);
      expect(weatherRadioInstances[1].checked).toBe(true);
      expect(weatherRadioInstances[2].checked).toBe(false);

      weatherRadioInstances[2].checked = true;
      expect(seasonRadioInstances[0].checked).toBe(false);
      expect(seasonRadioInstances[1].checked).toBe(true);
      expect(seasonRadioInstances[2].checked).toBe(false);
      expect(weatherRadioInstances[0].checked).toBe(false);
      expect(weatherRadioInstances[1].checked).toBe(false);
      expect(weatherRadioInstances[2].checked).toBe(true);
    });


    it('should add aria-label attribute to the underlying input element if defined', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-label')).toBe('Banana');
    });

    it('should not add aria-label attribute if not defined', () => {
      expect(fruitRadioNativeInputs[1].hasAttribute('aria-label')).toBeFalsy();
    });

    it('should change aria-label attribute if property is changed at runtime', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-label')).toBe('Banana');

      testComponent.ariaLabel = 'Pineapple';
      fixture.detectChanges();

      expect(fruitRadioNativeInputs[0].getAttribute('aria-label')).toBe('Pineapple');
    });

    it('should add aria-labelledby attribute to the underlying input element if defined', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-labelledby')).toBe('xyz');
    });

    it('should not add aria-labelledby attribute if not defined', () => {
      expect(fruitRadioNativeInputs[1].hasAttribute('aria-labelledby')).toBeFalsy();
    });

    it('should change aria-labelledby attribute if property is changed at runtime', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-labelledby')).toBe('xyz');

      testComponent.ariaLabelledby = 'uvw';
      fixture.detectChanges();

      expect(fruitRadioNativeInputs[0].getAttribute('aria-labelledby')).toBe('uvw');
    });

    it('should add aria-describedby attribute to the underlying input element if defined', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-describedby')).toBe('abc');
    });

    it('should not add aria-describedby attribute if not defined', () => {
      expect(fruitRadioNativeInputs[1].hasAttribute('aria-describedby')).toBeFalsy();
    });

    it('should change aria-describedby attribute if property is changed at runtime', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-describedby')).toBe('abc');

      testComponent.ariaDescribedby = 'uvw';
      fixture.detectChanges();

      expect(fruitRadioNativeInputs[0].getAttribute('aria-describedby')).toBe('uvw');
    });

    it('should focus on underlying input element when focus() is called', () => {
      for (let i = 0; i < fruitRadioInstances.length; i++) {
        expect(document.activeElement).not.toBe(fruitRadioNativeInputs[i]);
        fruitRadioNativeElements[i].focus();
        fixture.detectChanges();

        expect(document.activeElement).toBe(fruitRadioNativeElements[i]);
      }
    });
  });

});


@Component({
  template: `
      <MsfRadioGroup [disabled]="isGroupDisabled"
                     [required]="isGroupRequired"
                     [value]="groupValue"
                     name="test-name">
          <label for="fire">
              <MsfRadio id="fire" value="fire" [disabled]="isFirstDisabled"></MsfRadio>
              Fire</label>

          <label for="water">
              <MsfRadio id="water" value="water"></MsfRadio>
              water</label>
          <label for="leaf">leaf
              <MsfRadio id="leaf" value="leaf"></MsfRadio>
          </label>

      </MsfRadioGroup>
  `
})
class RadiosInsideRadioGroup {

  isFirstDisabled: boolean = false;
  isGroupDisabled: boolean = false;
  isGroupRequired: boolean = false;
  groupValue: string | null = null;

  theme: ColorTheme | null;
}


@Component({
  template: `
      <MsfRadio name="season" value="spring"></MsfRadio>
      <MsfRadio name="season" value="summer"></MsfRadio>
      <MsfRadio name="season" value="autum"></MsfRadio>

      <MsfRadio name="weather" value="warm"></MsfRadio>
      <MsfRadio name="weather" value="hot"></MsfRadio>
      <MsfRadio name="weather" value="cool"></MsfRadio>

      <span id="xyz">Baby Banana</span>
      <span id="abc">A smaller banana</span>
      <MsfRadio name="fruit"
                value="banana"
                [ariaLabel]="ariaLabel"
                [ariaLabelledby]="ariaLabelledby"
                [ariaDescribedby]="ariaDescribedby">
      </MsfRadio>
      <MsfRadio name="fruit" value="raspberry"></MsfRadio>
      <MsfRadio id="nameless" value="no-name"></MsfRadio>
  `
})
class StandaloneRadioButtons {
  ariaLabel: string = 'Banana';
  ariaLabelledby: string = 'xyz';
  ariaDescribedby: string = 'abc';
}


@Component({
  template: `
      <MsfRadioGroup [name]="groupName" [(ngModel)]="modelValue" (change)="lastEvent = $event">
          <label *ngFor="let option of options"  [attr.for]="option.label">
          <MsfRadio [value]="option.value" [id]="option.label">
              {{option.label}}
          </MsfRadio>
          </label>
      </MsfRadioGroup>
  `
})
class RadioGroupWithNgModel {
  modelValue: string;
  groupName = 'radio-group';
  options = [
    {label: 'Vanilla', value: 'vanilla'},
    {label: 'Chocolate', value: 'chocolate'},
    {label: 'Strawberry', value: 'strawberry'},
  ];
  lastEvent: MsfRadioChange;
}

@Component({
  template: `
      <MsfRadio>One</MsfRadio>`
})
class DisableableRadioButton {
  @ViewChild(MsfRadioInput) matRadioButton: MsfRadioInput;

  set disabled(value: boolean) {
    this.matRadioButton.disabled = value;
  }
}

@Component({
  template: `
      <MsfRadioGroup [formControl]="formControl">
          <MsfRadio value="1">One</MsfRadio>
      </MsfRadioGroup>
  `
})
class RadioGroupWithFormControl {
  formControl = new FormControl();
}

@Component({
  template: `
      <MsfRadio [tabIndex]="tabIndex"></MsfRadio>`
})
class FocusableRadioButton {
  tabIndex: number;
}

@Component({
  template: `
      <MsfRadioGroup name="group" [(ngModel)]="modelValue">
          <transcluding-wrapper *ngFor="let option of options">
              <MsfRadio [value]="option.value">{{option.label}}</MsfRadio>
          </transcluding-wrapper>
      </MsfRadioGroup>
  `
})
class InterleavedRadioGroup {
  modelValue = 'strawberry';
  options = [
    {label: 'Vanilla', value: 'vanilla'},
    {label: 'Chocolate', value: 'chocolate'},
    {label: 'Strawberry', value: 'strawberry'},
  ];
}

@Component({
  selector: 'transcluding-wrapper',
  template: `
      <div>
          <ng-content></ng-content>
      </div>
  `
})
class TranscludingWrapper {
}


@Component({
  template: `
      <MsfRadio tabindex="0"></MsfRadio>`
})
class RadioButtonWithPredefinedTabindex {
}

@Component({
  template: `
      <MsfRadio></MsfRadio>`
})
class DefaultRadioButton {
}

@Component({
  template: `
      <MsfRadio theme=error"></MsfRadio>`
})
class RadioButtonWithThemeBinding {
}
