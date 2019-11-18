import {TestBed} from "@angular/core/testing";
import {MsfDropdown} from "./dropdown.directive";

describe("dropdown directive", () => {
    let dropdown: MsfDropdown;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ MsfDropdown ]
        });
    });

    dropdown = TestBed.get(MsfDropdown);


    it("construct", () => {
        expect(dropdown).toBeTruthy();
    })
});