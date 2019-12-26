
export type relativePosition = "before" | "alignBefore" | "alignAfter" | "after" | "properAlign" | "proper" | "center" | number;

/**
 * Used to compute the position of an element in relation to another element.
 */
export class Position {

  /**
   * The rect of the landmark element.
   */
  landmarkRect: () => ElementRect;

  /**
   * The rect of the element to position.
   */
  elementRect: () => ElementRect;

  /**
   * The rect of the container which contains landmark element an the element to position.
   */
  containerRect: () => ElementRect;


  /**
   * Gets position of the element at left of the landmark.
   * In this case, the right border of the element is lined up with the left border
   * of the landmark.
   */
  left(): number {
    return this.landmarkRect().left - this.elementRect().width;
  }


  /**
   * Gets position of the element at right of the landmark.
   * In this case, the left border of the element is lined up with the right border
   * of the landmark.
   */
  right(): number {
    return this.landmarkRect().left + this.landmarkRect().width;
  }

  /**
   * Gets position to lined up the center of element with the center of the
   * landmark element in x orientation.
   */
  xCenter(): number {
    return this.landmarkRect().left + this.landmarkRect().width/2 - this.elementRect().width / 2;
  }

  /**
   * Gets position of the element to align it at right border of the landmark.
   * In this case, the left border of the element is lined up with the left border
   * of the landmark.
   */
  alignLeft(): number {
    return this.landmarkRect().left;
  }


  /**
   * Gets position of the element to align it at left border of the landmark.
   * In this case, the right border of the element is lined up with the right border
   * of the landmark.
   */
  alignRight(): number {
    return this.landmarkRect().left + this.landmarkRect().width - this.elementRect().width;
  }


  /**
   * Gets the position to place the element at the top of the landmark.
   * In this case the border bottom of the element is lined up with the
   * border top of the landmark.
   */
  top(): number {
    return this.landmarkRect().top - this.elementRect().height;
  }


  /**
   * Gets the position to place the element at the bottom of the landmark.
   * In this case the border top of the element is lined up with the
   * border bottom of the landmark.
   */
  bottom(): number {
    return this.landmarkRect().top + this.landmarkRect().height;
  }

  /**
   * Gets position to lined up the center of element with the center of the
   * landmark element in y orientation.
   */
  yCenter(): number {
    return this.landmarkRect().top + this.landmarkRect().height/2 - this.elementRect().height / 2;
  }

  /**
   * Gets the position to lined up the element at the top of the landmark.
   * In this case the border top of the element is lined up with the
   * border bottom of the landmark.
   */
  alignTop(): number {
    return this.landmarkRect().top;
  }

  /**
   * Gets the position to lined up the element at the bottom of the landmark.
   * In this case the border bottom of the element is lined up with the
   * border top of the landmark.
   */
  alignBottom(): number {
    return this.landmarkRect().top + this.landmarkRect().height - this.elementRect().height;
  }


  /**
   * Gets the appropriate x position for the element.
   * If there are enough space at right, the element is positioned at right.
   * If there are not enough space at right, the element is positioned at left if left have enough place.
   * Else, the element is positioned at right.
   */
  properX(): number {
    let rightSpace = this.containerRect().width - (this.landmarkRect().left + this.landmarkRect().width);

    if (rightSpace >= this.elementRect().width) {
      return this.right();
    }

    let leftSpace = this.landmarkRect().left;
    if(leftSpace > rightSpace){
      return this.left();
    }
    return this.right();
  }


  /**
   * Gets the appropriate x aligned position for the element.
   * If there are enough space at right, the element is aligned to the right.
   * If there are not enough space at right, the element is aligned to the left if left have enough place.
   * Else, the element is aligned to the right.
   */
  properAlignX(): number {
    let rightSpace = this.containerRect().width - this.landmarkRect().left;
    if (rightSpace > this.elementRect().width) {
      return this.alignLeft();
    }
    let leftSpace = this.landmarkRect().left + this.landmarkRect().width;
    if(leftSpace > rightSpace){
      return this.alignRight();
    }
    return this.alignLeft();
  }


  /**
   * Gets the appropriate y position for the element.
   * If there are enough space at bottom, the element is positioned at bottom.
   * If there are not enough space at top, the element is positioned at top if top have enough place.
   * Else, the element is positioned at bottom.
   */
  properY(): number {
    let bottomSpace = this.containerRect().height - (this.landmarkRect().top + this.landmarkRect().height);

    if (bottomSpace >= this.elementRect().height) {
      return this.bottom();
    }

    let topSpace = this.landmarkRect().top;
    if(topSpace > bottomSpace){
      return this.top();
    }
    return this.bottom();
  }



  /**
   * Gets the appropriate y aligned position for the element.
   * If there are enough space at bottom, the element is aligned to the bottom.
   * If there are not enough space at top, the element is aligned to the top if top have enough place.
   * Else, the element is aligned to the bottom.
   */
  properAlignY(): number {
    let bottomSpace = this.containerRect().height - this.landmarkRect().top;
    if (bottomSpace > this.elementRect().height) {
      return this.alignTop();
    }
    let topSpace = this.landmarkRect().top + this.landmarkRect().height;
    if(topSpace > bottomSpace){
      return this.alignBottom();
    }
    return this.alignTop();
  }
  
  xFromPosition(position: relativePosition): number {
    if(position == null){
      return this.properAlignX();
    }
    if(position == "before"){
      return this.left();
    }
    if(position == "alignBefore"){
      return this.alignLeft();
    }
    if(position == "after"){
      return this.right();
    }
    if(position == "alignAfter"){
      return this.alignRight();
    }

    if(position == "center"){
      return this.xCenter();
    }
    if(position == "proper"){
      return this.properX();
    }
    if(position == "properAlign"){
      return this.properAlignX();
    }
    return this.alignLeft() + position;
  }



  yFromPosition(position: relativePosition): number {
    if(position == null){
      return this.properAlignY();
    }
    if(position == "before"){
      return this.top();
    }
    if(position == "alignBefore"){
      return this.alignTop();
    }
    if(position == "after"){
      return this.bottom();
    }

    if(position == "center"){
      return this.yCenter();
    }
    if(position == "alignAfter"){
      return this.alignBottom();
    }

    if(position == "proper"){
      return this.properY();
    }
    if(position == "properAlign"){
      return this.properAlignY();
    }
    return this.bottom() + position;
  }

}

export interface ElementRect {
  left?: number;
  top?: number;

  width?: number;
  height?: number;
}
