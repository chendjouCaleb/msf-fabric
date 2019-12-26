import {ElementRect, Position} from "./position";

describe("test positioning element", () => {
  let landmarkRect: ElementRect;
  let elementRect: ElementRect;
  let containerRect: ElementRect;
  let position: Position;

  beforeEach(() => {
    landmarkRect = {
      left: 20,
      top: 30,
      width: 100,
      height: 40
    };

    elementRect = {
      width: 280,
      height: 400,
    };

    containerRect = {
      width: 800,
      height: 600,
    };
    position = new Position();
    position.landmarkRect = () => landmarkRect;
    position.elementRect = () => elementRect;
    position.containerRect = () => containerRect;
  });

  it("construct", () => {

  });

  test("get left should be the landmark.left - elementRect.width", () => {
    expect(position.left()).toBe(position.landmarkRect().left - position.elementRect().width);
  });

  test("get alignLeft should be the landmark.left", () => {
    expect(position.alignLeft()).toBe(position.landmarkRect().left);
  });

  test("get right should be the landmark.left + landmark.width", () => {
    expect(position.right()).toBe(position.landmarkRect().left + position.landmarkRect().width);
  });

  test("get xCenter should be the landmark.left + landmark.width/2 - element.width/2", () => {
    expect(position.xCenter())
      .toBe(position.landmarkRect().left + position.landmarkRect().width/2 - position.elementRect().width/2);
  });

  test("get alignRight should be the landmark.left + landmark.width - elementRect.width", () => {
    expect(position.alignRight()).toBe(position.landmarkRect().left + position.landmarkRect().width - position.elementRect().width);
  });

  test("get properX with sufficient space at right should be right", () => {
    containerRect.width = elementRect.width * 4;
    landmarkRect.left = elementRect.width + 2;

    expect(position.properX()).toBe(position.right());
  });

  test("get properX with min-space at right should be left", () => {
    containerRect.width = landmarkRect.left + landmarkRect.width;
    expect(position.properX()).toBe(position.left());
  });

  test("get properX with min-space at left should be right", () => {
    landmarkRect.left = 0;
    expect(position.properX()).toBe(position.right());
  });


  test("get properAlignX with sufficient space at right should align left", () => {
    containerRect.width = elementRect.width * 3;
    landmarkRect.left = elementRect.width;

    expect(position.properAlignX()).toBe(position.alignLeft());
  });

  it("get properAlignX with min-space at right should be alignRight", () => {
    containerRect.width = landmarkRect.left + landmarkRect.width;
    elementRect.width = containerRect.width;
    expect(position.properAlignX()).toBe(position.alignRight());
  });

  test("get properAlignX with min-space at left should be alignLeft", () => {
    landmarkRect.left = 0;
    elementRect.width = containerRect.width;
    expect(position.properAlignX()).toBe(position.alignLeft());
  });


  test("xPosition with x position should be landmark.left + X", () => {
    expect(position.xFromPosition(17)).toBe(position.landmarkRect().left + 17);
  });

  test("xPosition with before position should be the left", () => {
    expect(position.xFromPosition("before")).toBe(position.left());
  });

  test("get xPosition with alignBefore position should be the alignLeft", () => {
    expect(position.xFromPosition("alignBefore")).toBe(position.alignLeft());
  });

  test("get xPosition with after position should be right", () => {
    expect(position.xFromPosition("after")).toBe(position.right());
  });

  test("xPosition with alignAfter position should be alignRight", () => {
    expect(position.xFromPosition("alignAfter")).toBe(position.alignRight());
  });

  test("xPosition with properAlign with sufficient space at left space should align left", () => {
    containerRect.width = elementRect.width * 4;
    landmarkRect.left = elementRect.width;
    expect(position.xFromPosition("properAlign")).toBe(position.alignLeft());
  });

  test("xPosition with properAlign with min-space at right should be alignRight", () => {
    containerRect.width = landmarkRect.left + landmarkRect.width;
    expect(position.xFromPosition("properAlign")).toBe(position.alignRight());
  });

  test("xPosition with properAlign with min-space at left should be alignLeft", () => {
    landmarkRect.left = 0;
    expect(position.xFromPosition("properAlign")).toBe(position.alignLeft());
  });

  test("xPosition with proper with sufficient space at right should be right", () => {
    containerRect.width = elementRect.width * 4;
    landmarkRect.left = elementRect.width + 2;

    expect(position.xFromPosition("proper")).toBe(position.right());
  });

  test("xPosition with proper with min-space at right should be left", () => {
    containerRect.width = landmarkRect.left + landmarkRect.width;
    expect(position.xFromPosition("proper")).toBe(position.left());
  });

  test("xPosition with proper with min-space at left should be right", () => {
    landmarkRect.left = 0;
    expect(position.xFromPosition("proper")).toBe(position.right());
  });







  test("get top should be the landmark.top - elementRect.height", () => {
    expect(position.top()).toBe(position.landmarkRect().top - position.elementRect().height);
  });

  test("get alignTop should be the landmark.top", () => {
    expect(position.alignTop()).toBe(position.landmarkRect().top);
  });

  test("get yCenter should be the landmark.top + landmark.height/2 - element.height/2", () => {
    expect(position.yCenter())
      .toBe(position.landmarkRect().top + position.landmarkRect().height/2 - position.elementRect().height/2);
  });

  test("get bottom should be the landmark.top + landmark.height", () => {
    expect(position.bottom()).toBe(position.landmarkRect().top + position.landmarkRect().height);
  });

  test("get alignBottom should be the landmark.top + landmark.height - elementRect.height", () => {
    expect(position.alignBottom()).toBe(position.landmarkRect().top + position.landmarkRect().height - position.elementRect().height);
  });

  test("get properY with sufficient space at bottom should be bottom", () => {
    containerRect.height = elementRect.height * 4;
    landmarkRect.top = elementRect.height + 2;

    expect(position.properY()).toBe(position.bottom());
  });

  test("get properY with min-space at bottom should be top", () => {
    containerRect.height = landmarkRect.top + landmarkRect.height;
    expect(position.properY()).toBe(position.top());
  });

  test("get properY with min-space at top should be bottom", () => {
    landmarkRect.top = 0;
    expect(position.properY()).toBe(position.bottom());
  });

  test("get properAlignY with sufficient space at bottom should align top", () => {
    containerRect.height = elementRect.height * 3;
    landmarkRect.top = elementRect.height;

    expect(position.properAlignY()).toBe(position.alignTop());
  });

  it("get properAlignY with min-space at bottom should be alignBottom", () => {
    containerRect.height = landmarkRect.top + landmarkRect.height;
    elementRect.height = containerRect.height;
    expect(position.properAlignY()).toBe(position.alignBottom());
  });

  test("get properAlignY with min-space at top should be alignTop", () => {
    landmarkRect.top = 0;
    elementRect.height = containerRect.height;
    expect(position.properAlignY()).toBe(position.alignTop());
  });
});
