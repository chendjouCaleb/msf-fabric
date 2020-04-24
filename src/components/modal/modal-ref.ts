// Counter for unique dialog ids.
import {GlobalPositionStrategy, OverlayRef} from "@angular/cdk/overlay";
import {ModalPosition} from "./modal-position";

let uniqueId = 0;

export class MsfModalRef<T, R = any> {

  /** The instance of component opened into the dialog. */
  componentInstance: T;

  readonly id: string = `msf-modal-${uniqueId++}`;

  constructor(private _overlayRef: OverlayRef ) {}

  /**
   * Updates the modal's position.
   * @param position New modal position.
   */
  updatePosition(position?: ModalPosition): this {
    let strategy = this.positionStrategy;

    if(!position){
      strategy.centerHorizontally();
      strategy.centerVertically();
      this._overlayRef.updatePosition();
      return this;
    }

    if(position.left || position.right) {
      position.left ? strategy.left(position.left) : strategy.right(position.right);
    }

    if(position.top || position.bottom) {
      position.top ? strategy.top(position.top): strategy.bottom(position.bottom);
    }
    this._overlayRef.updatePosition();
    return this;
  }


  get positionStrategy(): GlobalPositionStrategy {
    return this._overlayRef.getConfig().positionStrategy as GlobalPositionStrategy;
  }
}
