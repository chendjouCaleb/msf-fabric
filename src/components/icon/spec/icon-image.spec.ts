import {ComponentFixture, TestBed} from "@angular/core/testing";
import { MsfIconModule } from "../msf-icon.module";
import {MsfIconImageConfig} from "../icon-image-config";
import {MSF_ICON_IMAGE_CLASSNAME, MsfIconImage} from "../icon-image";



let config = new MsfIconImageConfig();


describe("IconFontComponent", () => {
  let fixture: ComponentFixture<MsfIconImage>;
  let component: MsfIconImage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MsfIconModule]
    });

    fixture = TestBed.createComponent(MsfIconImage);
    component = fixture.componentInstance;
  });

  it("is defined", () => {
    expect(component).toBeDefined();
    expect(component.host.className).toBe(MSF_ICON_IMAGE_CLASSNAME);
    expect(component.config).toBeNull();
  });



  it("Set basic property", () => {
    component.source = "source.png";
    component.alt = "alternative text";
    fixture.detectChanges();
    expect(component.imageHost.getAttribute("src")).toBe("source.png");
    expect(component.imageHost.getAttribute("alt")).toBe("alternative text");
  });


  it("Change size", () => {
    component.source = "source.png";
    component.size = "xl";
    fixture.detectChanges();
    expect(component.host.className).toBe(`${MSF_ICON_IMAGE_CLASSNAME} msf_Size-xl`);
  });

  it("Set props", () => {
    component.props = {
      source: 'source.png', alt: "text", size: "md"
    };
    fixture.detectChanges();

    expect(component.imageHost.getAttribute("src")).toBe("source.png");
    expect(component.imageHost.getAttribute("alt")).toBe("text");
    expect(component.host.className)
      .toBe(`${MSF_ICON_IMAGE_CLASSNAME} msf_Size-md`);
  });

  it("Set property with only the source", () => {
    component.props = { source: 'source.png' };
    fixture.detectChanges();

    expect(component.imageHost.getAttribute("src")).toBe("source.png");
    expect(component.host.className).toBe(`${MSF_ICON_IMAGE_CLASSNAME}`);
  });
});
