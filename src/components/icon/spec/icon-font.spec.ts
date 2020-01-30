import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MSF_ICON_FONT_CLASSNAME, MsfIconFont} from "../icon-font.component";
import {MSF_DEFAULT_ICON_REGISTRY, MsfIconModule} from "../msf-icon.module";
import {IconProvider} from "../icon-provider";


let msaProvider = new IconProvider();
msaProvider.className = "msa";
msaProvider.classPrefix = "msa-";


MSF_DEFAULT_ICON_REGISTRY.put("msaFont", msaProvider);
let msProvider = MSF_DEFAULT_ICON_REGISTRY.get("MsIcon");


describe("IconFontComponent", () => {
  let fixture: ComponentFixture<MsfIconFont>;
  let component: MsfIconFont;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MsfIconModule]
    });

    fixture = TestBed.createComponent(MsfIconFont);
    component = fixture.componentInstance;
  });

  it("is defined", () => {
    expect(component).toBeDefined();
    expect(component.host.className).toBe(MSF_ICON_FONT_CLASSNAME + " ms-Icon");
    expect(component.provider).toBe(msProvider);
  });

  it("change provider", () => {
    component.providerName = "msaFont";
    fixture.detectChanges();

    expect(component.provider).toBe(msaProvider);
    expect(component.providerName).toBe("msaFont");
    expect(component.host.className).toBe(`${MSF_ICON_FONT_CLASSNAME} msa`);
  });

  it("change provider when component have a icon name", () => {
    component.iconName = "Add";
    fixture.detectChanges();
    expect(component.host.className).toBe(`${MSF_ICON_FONT_CLASSNAME} ms-Icon ms-Icon--Add`);

    component.providerName = "msaFont";
    fixture.detectChanges();
    expect(component.host.className).toBe(`${MSF_ICON_FONT_CLASSNAME} msa msa-Add`);
  });

  it("change icon name", () => {
    component.iconName = "Add";
    fixture.detectChanges();
    expect(component.host.className).toBe(`${MSF_ICON_FONT_CLASSNAME} ms-Icon ms-Icon--Add`);

  });

  it("change icon name with name used in provider mapping", () => {
    msaProvider.mapping.put("plus", "Add");

    component.iconName = "plus";
    fixture.detectChanges();
    expect(component.host.className).toBe(`${MSF_ICON_FONT_CLASSNAME} ms-Icon ms-Icon--Add`);
  });

  it("Change color theme", () => {
    component.iconName = "Add";
    component.theme = "primary";
    fixture.detectChanges();
    expect(component.host.className).toBe(`${MSF_ICON_FONT_CLASSNAME} ms-Icon ms-Icon--Add msf_Theme-primary`);
  });

  it("Change size", () => {
    component.iconName = "Add";
    component.size = "xl";
    fixture.detectChanges();
    expect(component.host.className).toBe(`${MSF_ICON_FONT_CLASSNAME} ms-Icon ms-Icon--Add msf_Size-xl`);
  });

  it("Set props", () => {
    component.props = {
      provider: "msaFont", name: 'edit', theme: "error", size: "md"
    };
    fixture.detectChanges();
    expect(component.host.className)
      .toBe(`${MSF_ICON_FONT_CLASSNAME} msa msa-edit msf_Size-md msf_Theme-error`);
  });

  it("Set property with only the name", () => {
    component.props = { name: 'Edit' };
    fixture.detectChanges();
    expect(component.host.className).toBe(`${MSF_ICON_FONT_CLASSNAME} ms-Icon ms-Icon--Edit`);
  });

  it("Set property with only the name when component has other properties", () => {
    component.size = "md";
    fixture.detectChanges();
    component.props = { name: 'Edit' };
    fixture.detectChanges();
    expect(component.host.className).toBe(`${MSF_ICON_FONT_CLASSNAME} ms-Icon msf_Size-md ms-Icon--Edit`);
  });
});
