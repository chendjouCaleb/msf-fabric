
export type relativePosition = "before" | "alignBefore" | "alignAfter" | "after" | "properAlign" | "proper" | number;

export class Position {

  landmarkRect: () => ElementRect;
  elementRect: () => ElementRect;
  containerRect: () => ElementRect;

  left(): number {
    return this.landmarkRect().left - this.elementRect().width;
  }

  right(): number {
    return this.landmarkRect().left + this.landmarkRect().width;
  }

  alignLeft(): number {
    return this.landmarkRect().left;
  }

  alignRight(): number {
    return this.landmarkRect().left + this.landmarkRect().width - this.elementRect().width;
  }

  top(): number {
    return this.landmarkRect().top - this.elementRect().height;
  }

  bottom(): number {
    return this.landmarkRect().top + this.landmarkRect().height;
  }

  alignTop(): number {
    return this.landmarkRect().top;
  }

  alignBottom(): number {
    return this.landmarkRect().top + this.landmarkRect().height - this.elementRect().height;
  }

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

    if(position == "before"){
      return this.left();
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
